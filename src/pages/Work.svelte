<script lang="ts">
  import { onDestroy, onMount, tick } from "svelte";
  import initBitpetWasm, { BitPetWasm } from "../lib/bitpet-wasm/bitpet.js";
  import DefaultLayout from "./common/layout/DefaultLayout.svelte";

  type Stage = "Egg" | "Baby" | "Stage 1" | "Stage 2" | "Final";
  type View = "status" | "report" | "streak";
  type EventLog = {
    at: string;
    text: string;
  };
  type BitPetSave = {
    version: 1;
    name: string;
    stage: Stage;
    level: number;
    experience: number;
    hunger: number;
    mood: number;
    energy: number;
    eggCreatedAt: number;
    hatchesAt: number;
    lastUpdatedAt: number;
    dailyKey: string;
    feedCount: number;
    playCount: number;
    adventureCount: number;
    expGainedToday: number;
    moodDeltaToday: number;
    loginDates: string[];
    events: EventLog[];
    expeditionEndsAt: number | null;
  };

  const storageKey = "uehara.bitpet.browser.save";
  const bitpetGithubUrl = "https://github.com/nosukeuehara/bitpet";
  const expeditionMs = 90 * 1000;
  const maxDailyActions = 3;
  const expToLevel = 30;
  const babyPets = [
    {
      name: "Mochi",
      ascii: [" /\\_/\\", "( o.o )", " > ^ <"],
    },
    {
      name: "Pip",
      ascii: ["  /\\", " (..) ", " /||\\"],
    },
    {
      name: "Nemu",
      ascii: [" zZ", "( -.-)", " /|_|"],
    },
    {
      name: "Koko",
      ascii: [" /^ ^\\", "( 0 0 )", "  \\_/"],
    },
  ];
  const backgroundPets = [
    {
      art: [" /\\_/\\", "( o.o )", " > ^ <"],
      className: "bitpet-work__bg-pet--mochi",
    },
    {
      art: ["  /\\", " (..) ", " /||\\"],
      className: "bitpet-work__bg-pet--pip",
    },
    {
      art: [" zZ", "( -.-)", " /|_|"],
      className: "bitpet-work__bg-pet--nemu",
    },
    {
      art: [" /^ ^\\", "( 0 0 )", "  \\_/"],
      className: "bitpet-work__bg-pet--koko",
    },
    {
      art: [" /\\___/\\", "(  o o  )", " /  ^  \\", "(_/___\\_)"],
      className: "bitpet-work__bg-pet--final",
    },
  ];

  let save: BitPetSave = createNewSave();
  let view: View = "status";
  let message = "";
  let commandInput = "";
  let history: string[] = [
    "BitPet browser shell",
    "Type `help` to see commands.",
  ];
  let commandHistory: string[] = [];
  let commandHistoryIndex = -1;
  let commandDraft = "";
  let historyRef: HTMLPreElement;
  let commandInputRef: HTMLInputElement;
  let petWasm: BitPetWasm | undefined;
  let isBitpetReady = false;
  let now = Date.now();
  let timer: number | undefined;

  $: isEgg = save.stage === "Egg";
  $: isOut = save.expeditionEndsAt !== null && now < save.expeditionEndsAt;
  $: hatchRemaining = Math.max(0, save.hatchesAt - now);
  $: expeditionRemaining = save.expeditionEndsAt
    ? Math.max(0, save.expeditionEndsAt - now)
    : 0;
  $: ascii = getAscii();
  $: stageLabel = isOut ? "Out now..." : save.stage;

  onMount(() => {
    void initializeBitpet();

    timer = window.setInterval(() => {
      now = Date.now();

      if (petWasm) {
        updateFromWasm("status");
      }
    }, 1000);

    window.addEventListener("beforeunload", persist);
  });

  onDestroy(() => {
    if (timer) {
      window.clearInterval(timer);
    }

    if (typeof window !== "undefined") {
      window.removeEventListener("beforeunload", persist);
    }
  });

  async function initializeBitpet() {
    try {
      await initBitpetWasm();
      petWasm = createWasmPet();
      updateFromWasm("status");
      isBitpetReady = true;
    } catch (error) {
      appendHistory("bitpet init", [
        "Failed to load bitpet wasm.",
        String(error),
      ]);
    }
  }

  function createWasmPet() {
    const currentNow = nowSeconds();
    const saved = loadSaveJson();

    if (saved) {
      try {
        return BitPetWasm.from_save_json_with_local_day_offset(
          saved,
          currentNow,
          localDayOffsetSeconds()
        );
      } catch {
        window.localStorage.removeItem(storageKey);
      }
    }

    const hatchedNow = currentNow - 3700n;
    const next = BitPetWasm.new_game_with_local_day_offset(
      hatchedNow,
      localDayOffsetSeconds()
    );
    next.status_with_local_day_offset(currentNow, localDayOffsetSeconds());
    return next;
  }

  function createNewSave(): BitPetSave {
    const createdAt = Date.now();
    const dailyKey = getDayKey(createdAt);
    const starterPet = getStarterPet();

    return {
      version: 1,
      name: starterPet.name,
      stage: "Baby",
      level: 1,
      experience: 0,
      hunger: 72,
      mood: 72,
      energy: 72,
      eggCreatedAt: createdAt,
      hatchesAt: createdAt,
      lastUpdatedAt: createdAt,
      dailyKey,
      feedCount: 0,
      playCount: 0,
      adventureCount: 0,
      expGainedToday: 0,
      moodDeltaToday: 0,
      loginDates: [dailyKey],
      events: [
        { at: formatTime(createdAt), text: `${starterPet.name} is ready` },
      ],
      expeditionEndsAt: null,
    };
  }

  function ensurePlayableSave(current: BitPetSave): BitPetSave {
    if (current.stage !== "Egg") {
      return current;
    }

    const currentNow = Date.now();

    return {
      ...current,
      stage: "Baby",
      hatchesAt: currentNow,
      lastUpdatedAt: currentNow,
      events: addEvent(
        current.events,
        "Egg skipped for browser play",
        currentNow
      ),
    };
  }

  function loadSaveJson() {
    try {
      return window.localStorage.getItem(storageKey);
    } catch {
      return null;
    }
  }

  function persist() {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(
      storageKey,
      petWasm ? petWasm.save_json() : JSON.stringify(save)
    );
  }

  function updateFromWasm(action: "status" | "feed" | "play" | "go" | "report" | "streak") {
    if (!petWasm) {
      return "";
    }

    const currentNow = nowSeconds();
    const offset = localDayOffsetSeconds();
    const saveJson =
      action === "feed"
        ? petWasm.feed_with_local_day_offset(currentNow, offset)
        : action === "play"
          ? petWasm.play_with_local_day_offset(currentNow, offset)
          : action === "go"
            ? petWasm.go_with_local_day_offset(currentNow, offset)
            : action === "streak"
              ? petWasm.streak_with_local_day_offset(currentNow, offset)
              : action === "report"
                ? petWasm.report(currentNow)
                : petWasm.status_with_local_day_offset(currentNow, offset);

    save = fromWasmSaveJson(saveJson);
    persist();
    return saveJson;
  }

  function fromWasmSaveJson(saveJson: string): BitPetSave {
    const wasmSave = JSON.parse(saveJson);
    const pet = wasmSave.pet ?? {};
    const report = wasmSave.daily_report ?? {};
    const dailyActions = wasmSave.daily_actions ?? {};
    const hatching = wasmSave.hatching;
    const expedition = wasmSave.expedition;

    return {
      version: 1,
      name: pet.name ?? "Mochi",
      stage: normalizeStage(pet.stage),
      level: Number(pet.level ?? 1),
      experience: Number(pet.experience ?? 0),
      hunger: Number(pet.hunger ?? 72),
      mood: Number(pet.mood ?? 72),
      energy: Number(pet.energy ?? 72),
      eggCreatedAt: toMilliseconds(hatching?.egg_created_at ?? wasmSave.last_updated_at),
      hatchesAt: toMilliseconds(hatching?.hatches_at ?? wasmSave.last_updated_at),
      lastUpdatedAt: toMilliseconds(wasmSave.last_updated_at),
      dailyKey: String(dailyActions.day ?? getDayKey(Date.now())),
      feedCount: Number(report.feed_count ?? dailyActions.feed_count ?? 0),
      playCount: Number(report.play_count ?? dailyActions.play_count ?? 0),
      adventureCount: Number(report.adventure_count ?? 0),
      expGainedToday: Number(report.experience_gained ?? 0),
      moodDeltaToday: Number(report.mood_delta ?? 0),
      loginDates: Array.from({ length: Number(wasmSave.login?.streak ?? 1) }, (_, index) =>
        String(index)
      ),
      events: (report.events ?? []).map((event: { timestamp: number; kind: string }) => ({
        at: formatTime(toMilliseconds(event.timestamp)),
        text: event.kind,
      })),
      expeditionEndsAt: expedition?.ends_at ? toMilliseconds(expedition.ends_at) : null,
    };
  }

  function normalizeStage(value: string | undefined): Stage {
    if (
      value === "Egg" ||
      value === "Baby" ||
      value === "Stage 1" ||
      value === "Stage 2" ||
      value === "Final"
    ) {
      return value;
    }

    return "Baby";
  }

  function nowSeconds() {
    return BigInt(Math.floor(Date.now() / 1000));
  }

  function localDayOffsetSeconds() {
    return -new Date().getTimezoneOffset() * 60;
  }

  function toMilliseconds(value: number | undefined) {
    const timestamp = Number(value ?? Date.now());
    return timestamp < 1000000000000 ? timestamp * 1000 : timestamp;
  }

  function applyTime(current: BitPetSave): BitPetSave {
    const currentNow = Date.now();
    let next = resetDailyIfNeeded(current, currentNow);
    const elapsedHours = Math.max(
      0,
      (currentNow - next.lastUpdatedAt) / 3600000
    );

    if (next.stage === "Egg" && currentNow >= next.hatchesAt) {
      next = {
        ...next,
        stage: "Baby",
        events: addEvent(next.events, `Egg hatched into ${next.name}`, currentNow),
      };
      message = `Egg hatched. ${next.name} is here.`;
    }

    if (next.expeditionEndsAt && currentNow >= next.expeditionEndsAt) {
      next = gainExperience(
        {
          ...next,
          expeditionEndsAt: null,
          energy: clamp(next.energy + 18),
          mood: clamp(next.mood + 10),
          moodDeltaToday: next.moodDeltaToday + 10,
          events: addEvent(
            next.events,
            `${next.name} came back from exploring`,
            currentNow
          ),
        },
        12,
        currentNow
      );
      message = `${next.name} came back with a little experience.`;
    }

    if (elapsedHours > 0) {
      next = {
        ...next,
        hunger: clamp(next.hunger - elapsedHours * 2.2),
        mood: clamp(next.mood - elapsedHours * 1.4),
        energy: clamp(next.energy + elapsedHours * 4),
        lastUpdatedAt: currentNow,
      };
    }

    return next;
  }

  function resetDailyIfNeeded(current: BitPetSave, currentNow: number) {
    const key = getDayKey(currentNow);

    if (current.dailyKey === key) {
      return current;
    }

    return {
      ...current,
      dailyKey: key,
      feedCount: 0,
      playCount: 0,
      adventureCount: 0,
      expGainedToday: 0,
      moodDeltaToday: 0,
      events: addEvent(current.events, "New local day started", currentNow),
    };
  }

  function recordLogin(current: BitPetSave) {
    const key = getDayKey(Date.now());

    if (current.loginDates.includes(key)) {
      return current;
    }

    return {
      ...current,
      loginDates: [...current.loginDates, key].slice(-30),
      events: addEvent(current.events, "Checked in", Date.now()),
    };
  }

  function feed() {
    if (!canCare("feed")) return;

    const beforeMood = save.mood;
    save = applyEvolution({
      ...save,
      hunger: clamp(save.hunger + 22),
      mood: clamp(save.mood + 8),
      feedCount: save.feedCount + 1,
      moodDeltaToday: save.moodDeltaToday + clamp(save.mood + 8) - beforeMood,
      events: addEvent(save.events, `Fed ${save.name}`, Date.now()),
    });
    message = `${save.name} ate happily.`;
    persist();
  }

  function play() {
    if (!canCare("play")) return;

    if (save.energy < 12) {
      message = `${save.name} is too sleepy to play.`;
      return;
    }

    const beforeMood = save.mood;
    save = applyEvolution(
      gainExperience(
        {
          ...save,
          mood: clamp(save.mood + 16),
          energy: clamp(save.energy - 14),
          playCount: save.playCount + 1,
          moodDeltaToday:
            save.moodDeltaToday + clamp(save.mood + 16) - beforeMood,
          events: addEvent(save.events, `Played with ${save.name}`, Date.now()),
        },
        8,
        Date.now()
      )
    );
    message = `${save.name} played for a while.`;
    persist();
  }

  function goExplore() {
    if (isEgg) {
      message = "Egg cannot go outside yet.";
      return;
    }

    if (isOut) {
      message = `${save.name} is already out.`;
      return;
    }

    if (save.stage === "Baby") {
      message = `${save.name} can explore from Stage 1.`;
      return;
    }

    save = {
      ...save,
      expeditionEndsAt: Date.now() + expeditionMs,
      adventureCount: save.adventureCount + 1,
      events: addEvent(save.events, `${save.name} went exploring`, Date.now()),
    };
    message = `${save.name} went exploring.`;
    persist();
  }

  function canCare(action: "feed" | "play") {
    if (isEgg) {
      message = "Egg is still hatching.";
      return false;
    }

    if (isOut) {
      message = `${save.name} is out exploring.`;
      return false;
    }

    const count = action === "feed" ? save.feedCount : save.playCount;

    if (count >= maxDailyActions) {
      message = `${action} is limited to ${maxDailyActions} times per day.`;
      return false;
    }

    return true;
  }

  function gainExperience(current: BitPetSave, amount: number, at: number) {
    const total = current.experience + amount;
    const levelGain = Math.floor(total / expToLevel);
    const level = current.level + levelGain;
    const experience = total % expToLevel;

    return {
      ...current,
      level,
      experience,
      expGainedToday: current.expGainedToday + amount,
      events:
        levelGain > 0
          ? addEvent(current.events, `${current.name} leveled up`, at)
          : current.events,
    };
  }

  function applyEvolution(current: BitPetSave) {
    const nextStage =
      current.level >= 8
        ? "Final"
        : current.level >= 5
          ? "Stage 2"
          : current.level >= 3
            ? "Stage 1"
            : current.stage;

    if (nextStage === current.stage) {
      return current;
    }

    return {
      ...current,
      stage: nextStage,
      events: addEvent(
        current.events,
        `${current.name} evolved to ${nextStage}`,
        Date.now()
      ),
    };
  }

  function resetGame() {
    petWasm = BitPetWasm.new_game_with_local_day_offset(
      nowSeconds() - 3700n,
      localDayOffsetSeconds()
    );
    updateFromWasm("status");
    message = `${save.name} is ready.`;
    view = "status";
    persist();
  }

  function runCommand() {
    const rawCommand = commandInput.trim();

    if (!rawCommand) {
      return;
    }

    rememberCommand(rawCommand);
    commandInput = "";
    now = Date.now();
    const command =
      rawCommand.replace(/^bitpet(?:\s+|$)/, "").trim() || "status";

    if (command === "clear") {
      history = [];
      void scrollHistoryToBottom();
      return;
    }

    const beforeMessage = message;
    message = "";

    if (!isBitpetReady || !petWasm) {
      appendHistory(rawCommand, ["bitpet wasm is still loading."]);
      return;
    }

    try {
      switch (command) {
        case "status":
          updateFromWasm("status");
          view = "status";
          break;
        case "feed":
          updateFromWasm("feed");
          view = "status";
          message = `${save.name} ate happily.`;
          break;
        case "play":
          updateFromWasm("play");
          view = "status";
          message = `You played with ${save.name}.`;
          break;
        case "go":
          updateFromWasm("go");
          view = "status";
          message = `${save.name} went exploring.`;
          break;
        case "report":
          updateFromWasm("report");
          view = "report";
          break;
        case "streak":
          updateFromWasm("streak");
          view = "streak";
          break;
        case "reset":
          resetGame();
          view = "status";
          break;
        case "help":
        case "--help":
        case "-h":
          appendHistory(rawCommand, [
            "Commands",
            "  bitpet / bitpet status",
            "  bitpet feed",
            "  bitpet play",
            "  bitpet go",
            "  bitpet report",
            "  bitpet streak",
            "  bitpet reset",
            "  clear",
          ]);
          return;
        default:
          appendHistory(rawCommand, [
            `Unknown command: ${rawCommand}`,
            "Run `help` for available commands.",
          ]);
          return;
      }
    } catch (error) {
      updateFromWasm("status");
      appendHistory(rawCommand, String(error).split("\n"));
      return;
    }

    appendHistory(rawCommand, [
      ...(message && message !== beforeMessage ? [message, ""] : []),
      ...renderViewLines(view, save, now),
    ]);
  }

  function appendHistory(command: string, lines: string[]) {
    history = [...history, `$ ${command}`, ...lines, ""].slice(-80);
    void scrollHistoryToBottom();
  }

  function rememberCommand(command: string) {
    commandHistory = [...commandHistory, command].slice(-50);
    commandHistoryIndex = -1;
    commandDraft = "";
  }

  function handlePromptKeydown(event: KeyboardEvent) {
    if (event.key === "ArrowUp") {
      if (commandHistory.length === 0) {
        return;
      }

      event.preventDefault();

      if (commandHistoryIndex === -1) {
        commandDraft = commandInput;
        commandHistoryIndex = commandHistory.length - 1;
      } else {
        commandHistoryIndex = Math.max(0, commandHistoryIndex - 1);
      }

      commandInput = commandHistory[commandHistoryIndex];
      void moveInputCaretToEnd();
      return;
    }

    if (event.key === "ArrowDown") {
      if (commandHistoryIndex === -1) {
        return;
      }

      event.preventDefault();

      if (commandHistoryIndex < commandHistory.length - 1) {
        commandHistoryIndex += 1;
        commandInput = commandHistory[commandHistoryIndex];
      } else {
        commandHistoryIndex = -1;
        commandInput = commandDraft;
        commandDraft = "";
      }

      void moveInputCaretToEnd();
    }
  }

  async function moveInputCaretToEnd() {
    await tick();

    if (!commandInputRef) {
      return;
    }

    const end = commandInput.length;
    commandInputRef.setSelectionRange(end, end);
  }

  async function scrollHistoryToBottom() {
    await tick();

    if (!historyRef) {
      return;
    }

    historyRef.scrollTop = historyRef.scrollHeight;
  }

  function renderViewLines(
    currentView: View,
    currentSave: BitPetSave,
    currentNow: number
  ) {
    const currentIsEgg = currentSave.stage === "Egg";
    const currentIsOut =
      currentSave.expeditionEndsAt !== null &&
      currentNow < currentSave.expeditionEndsAt;
    const currentHatchRemaining = Math.max(
      0,
      currentSave.hatchesAt - currentNow
    );
    const currentExpeditionRemaining = currentSave.expeditionEndsAt
      ? Math.max(0, currentSave.expeditionEndsAt - currentNow)
      : 0;
    const currentAscii = getAsciiFor(currentSave, currentIsOut);

    if (currentView === "report") {
      return [
        "BitPet Daily Report",
        `Feed        ${currentSave.feedCount}`,
        `Play        ${currentSave.playCount}`,
        `Adventure   ${currentSave.adventureCount}`,
        "",
        `EXP gained  ${currentSave.expGainedToday}`,
        `Mood        ${currentSave.moodDeltaToday >= 0 ? "+" : ""}${currentSave.moodDeltaToday}`,
        "",
        "Events",
        ...currentSave.events.map((event) => `${event.at} ${event.text}`),
      ];
    }

    if (currentView === "streak") {
      return ["Login streak", "", `${currentSave.loginDates.length} day(s)`];
    }

    if (currentIsEgg) {
      return [
        ...currentAscii,
        "",
        "Egg",
        "",
        `Hatching in ${formatDuration(currentHatchRemaining)}`,
      ];
    }

    if (currentIsOut) {
      return [
        ...currentAscii,
        "",
        "Out now...",
        `Back at ${currentSave.expeditionEndsAt ? formatTime(currentSave.expeditionEndsAt) : "-"}`,
        "",
        `Returns in ${formatDuration(currentExpeditionRemaining)}`,
      ];
    }

    return [
      ...currentAscii,
      "",
      currentSave.name,
      currentSave.stage,
      `Lv. ${currentSave.level}`,
      "",
      `Mood     : ${currentSave.mood}%`,
      `Hunger   : ${currentSave.hunger}%`,
      `Energy   : ${currentSave.energy}%`,
      `EXP      : ${currentSave.experience}/${expToLevel}`,
    ];
  }

  function getAscii() {
    return getAsciiFor(save, isOut);
  }

  function getAsciiFor(currentSave: BitPetSave, currentIsOut: boolean) {
    if (currentIsOut) {
      return [
        "+------+",
        "|  __  |",
        "| |  | |",
        "| |__| |",
        "|  __  |",
        "| |  | |",
        "+------+",
      ];
    }

    if (currentSave.stage === "Egg") {
      return ["   __", " /    \\", " \\____/"];
    }

    if (currentSave.stage === "Final") {
      return [" /\\___/\\", "(  o o  )", " /  ^  \\", "(_/___\\_)"];
    }

    if (currentSave.stage === "Stage 2") {
      return [" /\\_/\\", "( •.• )", "/|___|\\", "  / \\ "];
    }

    if (currentSave.stage === "Stage 1") {
      return [" /\\_/\\", "( o.o )", " > ^ <"];
    }

    return (
      babyPets.find((pet) => pet.name === currentSave.name)?.ascii ??
      babyPets[0].ascii
    );
  }

  function getStarterPet() {
    return babyPets[Math.floor(Math.random() * babyPets.length)] ?? babyPets[0];
  }

  function clamp(value: number) {
    return Math.max(0, Math.min(100, Math.round(value)));
  }

  function getDayKey(value: number) {
    const date = new Date(value);
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  }

  function formatTime(value: number) {
    return new Intl.DateTimeFormat("ja-JP", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(value);
  }

  function formatDuration(value: number) {
    const totalSeconds = Math.ceil(value / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`;
  }

  function addEvent(events: EventLog[], text: string, at: number) {
    return [...events, { at: formatTime(at), text }].slice(-6);
  }
</script>

<DefaultLayout>
  <section class="bitpet-work">
    <div class="bitpet-work__background" aria-hidden="true">
      {#each backgroundPets as pet}
        <pre class={`bitpet-work__bg-pet ${pet.className}`}>{pet.art.join(
            "\n"
          )}</pre>
      {/each}
    </div>

    <div class="bitpet-work__shell">
      <div class="bitpet-work__header">
        <p class="bitpet-work__eyebrow">./bitpet</p>
        <h1 class="bitpet-work__title">bitpet</h1>
        <p class="bitpet-work__lead">
          ターミナルで育てる小さなペットを<br />
          ブラウザでも少しだけ遊べるようにしたページです。
        </p>
        <a
          class="bitpet-work__github-link"
          href={bitpetGithubUrl}
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>
      </div>

      <div class="bitpet-work__mobile-about">
        <pre class="bitpet-work__mobile-pet">{getAsciiFor(save, false).join("\n")}</pre>
        <div class="bitpet-work__mobile-copy">
          <p>
            bitpetは、ターミナルの中で小さなペットを育てるCLIアプリです。
            ごはんをあげたり、遊んだり、出かけたりしながら少しずつ成長します。
          </p>
          <p>
            コマンド入力で遊ぶ体験はPC向けに調整しています。
            画面の広い環境で開くと、このページ上でそのまま試せます。
          </p>
        </div>
        <div class="bitpet-work__mobile-commands">
          <p>$ bitpet status</p>
          <p>$ bitpet feed</p>
          <p>$ bitpet play</p>
          <p>$ bitpet go</p>
        </div>
      </div>

      <div class="bitpet-work__terminal" aria-live="polite">
        <div class="bitpet-work__terminal-bar">
          <span></span><span></span><span></span>
          <p>bitpet shell</p>
        </div>

        <div class="bitpet-work__commands">
          <pre
            class="bitpet-work__history"
            bind:this={historyRef}>{history.join("\n")}</pre>
          <form
            class="bitpet-work__prompt"
            onsubmit={(event) => {
              event.preventDefault();
              runCommand();
            }}
          >
            <span>$</span>
            <input
              bind:this={commandInputRef}
              bind:value={commandInput}
              aria-label="bitpet command"
              autocomplete="off"
              onkeydown={handlePromptKeydown}
              spellcheck="false"
              placeholder="bitpet help"
            />
          </form>
        </div>
      </div>
    </div>
  </section>
</DefaultLayout>

<style>
  .bitpet-work {
    background:
      linear-gradient(rgba(57, 34, 24, 0.04) 1px, transparent 1px),
      var(--peach-fuzz);
    background-size: 100% 6px;
    color: var(--dark);
    isolation: isolate;
    min-height: 100vh;
    padding: 128px 20px 72px;
    position: relative;
    overflow: hidden;
  }

  .bitpet-work__background {
    inset: 0;
    pointer-events: none;
    position: absolute;
    z-index: 0;
  }

  .bitpet-work__bg-pet {
    animation: bitpet-bg-drift 16s ease-in-out infinite alternate;
    color: rgba(57, 34, 24, 0.16);
    font-family:
      ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    font-size: clamp(2.2rem, 7vw, 6rem);
    font-weight: 700;
    line-height: 1.04;
    margin: 0;
    position: absolute;
    text-shadow: 12px 12px 0 rgba(255, 255, 255, 0.08);
    transform: rotate(-8deg);
    white-space: pre;
  }

  .bitpet-work__bg-pet--mochi {
    left: 52vw;
    top: 16vh;
  }

  .bitpet-work__bg-pet--pip {
    animation-delay: -5s;
    font-size: clamp(2rem, 5vw, 4.8rem);
    right: -1vw;
    top: 13vh;
    transform: rotate(9deg);
  }

  .bitpet-work__bg-pet--nemu {
    animation-delay: -9s;
    bottom: 6vh;
    left: -2vw;
    transform: rotate(5deg);
  }

  .bitpet-work__bg-pet--koko {
    animation-delay: -2s;
    bottom: 22vh;
    font-size: clamp(2.1rem, 6vw, 5.2rem);
    right: -9vw;
    transform: rotate(-12deg);
  }

  .bitpet-work__bg-pet--final {
    animation-delay: -12s;
    color: rgba(57, 34, 24, 0.1);
    font-size: clamp(2rem, 4.7vw, 4.4rem);
    left: 5vw;
    top: 38vh;
    transform: translate(-50%, -50%) rotate(3deg);
  }

  .bitpet-work__shell {
    margin: 0 auto;
    max-width: 920px;
    position: relative;
    z-index: 1;
  }

  .bitpet-work__header {
    margin-bottom: 32px;
  }

  .bitpet-work__eyebrow,
  .bitpet-work__lead,
  .bitpet-work__github-link,
  .bitpet-work__terminal,
  .bitpet-work__prompt input {
    font-family: var(--font-en);
  }

  .bitpet-work__eyebrow {
    font-size: var(--font-size-sm);
    margin: 0 0 8px;
  }

  .bitpet-work__title {
    font-size: clamp(3rem, 12vw, 7rem);
    line-height: 0.92;
    margin: 0;
  }

  .bitpet-work__lead {
    font-size: var(--font-size-md);
    line-height: 1.8;
    margin: 18px 0 0;
    max-width: 620px;
  }

  .bitpet-work__github-link {
    align-items: center;
    color: var(--dark);
    display: inline-flex;
    font-size: var(--font-size-sm);
    gap: 8px;
    margin-top: 22px;
    text-decoration: none;
  }

  .bitpet-work__github-link::before {
    background: currentColor;
    content: "";
    display: block;
    height: 2px;
    width: 28px;
  }

  .bitpet-work__github-link:hover {
    opacity: 0.68;
  }

  .bitpet-work__mobile-about {
    display: none;
  }

  .bitpet-work__terminal {
    background: #1f1714;
    border: 2px solid #1f1714;
    border-radius: 8px;
    color: #f3eadc;
    overflow: hidden;
    box-shadow:
      10px 10px 0 rgba(57, 34, 24, 0.18),
      inset 0 0 0 1px rgba(243, 234, 220, 0.08);
  }

  .bitpet-work__terminal-bar {
    align-items: center;
    background: #3a2a24;
    border-bottom: 1px solid rgba(243, 234, 220, 0.16);
    display: flex;
    gap: 8px;
    min-height: 42px;
    padding: 0 14px;
  }

  .bitpet-work__terminal-bar span {
    background: #f3eadc;
    border-radius: 999px;
    display: block;
    height: 9px;
    width: 9px;
  }

  .bitpet-work__terminal-bar p {
    font-size: var(--font-size-sm);
    margin: 0 0 0 8px;
    opacity: 0.8;
  }

  .bitpet-work__commands {
    background:
      radial-gradient(
        circle at 20% 0%,
        rgba(110, 194, 194, 0.08),
        transparent 34%
      ),
      #17110f;
    min-height: 520px;
    padding: 18px;
  }

  .bitpet-work__history {
    font-family:
      ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    font-size: var(--font-size-sm);
    line-height: 1.55;
    white-space: pre-wrap;
  }

  .bitpet-work__history {
    color: rgba(243, 234, 220, 0.92);
    margin: 0 0 12px;
    max-height: 520px;
    overflow: auto;
  }

  .bitpet-work__prompt {
    align-items: center;
    display: grid;
    gap: 8px;
    grid-template-columns: auto 1fr;
    padding: 0;
  }

  .bitpet-work__prompt span {
    color: #6ec2c2;
    font-family:
      ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    font-size: var(--font-size-sm);
  }

  .bitpet-work__prompt input {
    background: transparent;
    border: 0;
    caret-color: #6ec2c2;
    color: #f3eadc;
    font-size: var(--font-size-sm);
    min-width: 0;
    outline: none;
    padding: 0;
  }

  .bitpet-work__prompt input::placeholder {
    color: rgba(243, 234, 220, 0.38);
  }

  @media (min-width: 768px) {
    .bitpet-work {
      padding: 180px 24px 96px;
    }
  }

  @media (max-width: 767px) {
    .bitpet-work {
      min-height: 100svh;
      padding: 112px 20px 64px;
    }

    .bitpet-work__header {
      margin-bottom: 30px;
    }

    .bitpet-work__lead {
      display: none;
    }

    .bitpet-work__terminal {
      display: none;
    }

    .bitpet-work__mobile-about {
      display: grid;
      gap: 24px;
    }

    .bitpet-work__mobile-pet {
      color: rgba(57, 34, 24, 0.78);
      font-family:
        ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      font-size: clamp(2.7rem, 13vw, 4.4rem);
      font-weight: 700;
      line-height: 1.05;
      margin: 4px 0 0;
      text-shadow: 8px 8px 0 rgba(255, 255, 255, 0.16);
      white-space: pre;
    }

    .bitpet-work__mobile-copy {
      display: grid;
      gap: 16px;
    }

    .bitpet-work__mobile-copy p {
      font-size: 1.5rem;
      line-height: 2;
      margin: 0;
    }

    .bitpet-work__mobile-commands {
      border-left: 2px solid rgba(57, 34, 24, 0.3);
      color: rgba(57, 34, 24, 0.74);
      display: grid;
      font-family:
        ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      gap: 10px;
      padding-left: 16px;
    }

    .bitpet-work__mobile-commands p {
      font-size: 1.35rem;
      line-height: 1.4;
      margin: 0;
    }

    .bitpet-work__bg-pet {
      color: rgba(57, 34, 24, 0.12);
      font-size: clamp(2rem, 14vw, 4.6rem);
    }

    .bitpet-work__bg-pet--pip,
    .bitpet-work__bg-pet--final {
      display: none;
    }

    .bitpet-work__bg-pet--mochi {
      left: -30vw;
      top: 23vh;
    }

    .bitpet-work__bg-pet--nemu {
      bottom: 5vh;
      left: -18vw;
    }

    .bitpet-work__bg-pet--koko {
      bottom: 38vh;
      right: -34vw;
    }
  }

  @keyframes bitpet-bg-drift {
    0% {
      translate: 0 0;
    }

    45% {
      translate: 18px -16px;
    }

    100% {
      translate: -14px 20px;
    }
  }
</style>
