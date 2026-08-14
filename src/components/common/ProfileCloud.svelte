<script lang="ts">
  import { onDestroy } from "svelte";
  import {
    profileCloudItems,
    type LanguageSkill,
    type ProfileCloudItem,
  } from "../../contentData/meItem";

  export let languages: LanguageSkill[] = [];

  type CloudItem = ProfileCloudItem & {
    bytes?: number;
  };

  type SweepPhase =
    | "idle"
    | "wipe"
    | "scatter"
    | "slash"
    | "hold"
    | "returning";

  let cloudItems: CloudItem[] = [];
  let sweepPhase: SweepPhase = "idle";
  let sweepTimers: number[] = [];
  const mobilePositions = new Map([
    ["上 原 龍 之 介", { x: 50, y: 52 }],
    ["ue / hara", { x: 21, y: 66 }],
    ["web", { x: 20, y: 76 }],
    ["2001", { x: 22, y: 4 }],
    ["宮古島", { x: 72, y: 72 }],
    ["Docker", { x: 20, y: 32 }],
    ["Python", { x: 76, y: 91 }],
    ["Next.js", { x: 17, y: 43 }],
    ["Tailwind", { x: 52, y: 80 }],
    ["React", { x: 83, y: 8 }],
    ["TypeScript", { x: 50, y: 23 }],
    ["JavaScript", { x: 64, y: 98 }],
    ["HTML", { x: 18, y: 13 }],
    ["CSS", { x: 84, y: 36 }],
    ["Shell", { x: 43, y: 13 }],
    ["Vue", { x: 81, y: 63 }],
    ["Rust", { x: 17, y: 96 }],
    ["Svelte", { x: 34, y: 90 }],
    ["PHP", { x: 59, y: 6 }],
    ["sweep", { x: 47, y: 40 }],
  ]);
  const fallbackMobilePositions = [
    { x: 12, y: 18 },
    { x: 88, y: 16 },
    { x: 12, y: 66 },
    { x: 87, y: 73 },
    { x: 38, y: 9 },
    { x: 58, y: 39 },
    { x: 39, y: 93 },
    { x: 72, y: 8 },
  ];
  const desktopPositions = new Map([
    ["TypeScript", { x: 50, y: 8 }],
    ["2001", { x: 22, y: 15 }],
    ["React", { x: 72, y: 30 }],
    ["HTML", { x: 12, y: 31 }],
    ["CSS", { x: 30, y: 31 }],
    ["Next.js", { x: 11, y: 43 }],
    ["Docker", { x: 42, y: 39 }],
    ["Shell", { x: 88, y: 31 }],
    ["Vue", { x: 84, y: 55 }],
    ["上 原 龍 之 介", { x: 54, y: 49 }],
    ["宮古島", { x: 36, y: 60 }],
    ["ue / hara", { x: 23, y: 70 }],
    ["JavaScript", { x: 70, y: 70 }],
    ["web", { x: 12, y: 82 }],
    ["Tailwind", { x: 47, y: 80 }],
    ["Python", { x: 87, y: 84 }],
    ["Rust", { x: 13, y: 94 }],
    ["Svelte", { x: 56, y: 93 }],
    ["PHP", { x: 60, y: 20 }],
    ["sweep", { x: 50, y: 30 }],
  ]);
  const fallbackDesktopPositions = [
    { x: 14, y: 18 },
    { x: 84, y: 18 },
    { x: 16, y: 62 },
    { x: 84, y: 68 },
    { x: 36, y: 12 },
    { x: 62, y: 38 },
    { x: 36, y: 92 },
    { x: 70, y: 92 },
  ];

  $: cloudItems = mergeCloudItems([
    ...profileCloudItems,
    ...languages.map<CloudItem>((language) => ({
      label: language.name,
      tone: "language",
      weight: language.ratio,
      bytes: language.bytes,
    })),
  ]);

  function getItemStyle(item: CloudItem, index: number) {
    const featuredOffset = item.tone === "primary" ? -18 : 0;
    const angle = ((index * 137.5 + getSeed(item.label, 0)) % 360) - 90;
    const itemAngle = angle + featuredOffset;
    const radius = getRadius(index, item);
    const rotation = getScatterValue(item.label, index, 1, -13, 13);
    const size = getFontSize(item);
    const mobilePosition = getMobilePosition(item, index);
    const mobileRotation = getScatterValue(item.label, index, 2, -9, 9);
    const mobileSize = getMobileFontSize(item);
    const desktopPosition = getDesktopPosition(item, index);
    const desktopRotation = getScatterValue(item.label, index, 8, -8, 8);
    const desktopSize = getDesktopFontSize(item);
    const floatX = getScatterValue(item.label, index, 3, -12, 12);
    const floatY = getScatterValue(item.label, index, 4, -14, 14);
    const floatRotation = getScatterValue(item.label, index, 5, -5, 5);
    const floatDuration = getScatterValue(item.label, index, 6, 2600, 5200);
    const floatDelay = getScatterValue(item.label, index, 7, -2400, 0);
    const hoverX = getScatterValue(item.label, index, 9, -16, 16);
    const hoverY = getScatterValue(item.label, index, 10, -16, 16);
    const hoverRotation = getScatterValue(item.label, index, 11, -4, 4);
    const wipeDirection =
      getScatterValue(item.label, index, 15, 0, 4) <= 1 ? -1 : 1;
    const scatterX =
      wipeDirection * getScatterValue(item.label, index, 12, 900, 1320);
    const scatterY = getScatterValue(item.label, index, 13, -760, 760);
    const scatterRotation = getScatterValue(item.label, index, 14, -42, 42);
    const wipeDistance = getScatterValue(item.label, index, 16, 0.55, 1.35);
    const wipeLift = getScatterValue(item.label, index, 17, -0.08, 0.08);
    const wipeTeamDelay = wipeDirection === 1 ? 0 : 560;
    const wipeDelay =
      wipeTeamDelay + getScatterValue(item.label, index, 18, 0, 620);
    const wipeDuration = getScatterValue(item.label, index, 23, 1180, 2050);
    const wipeExitY = getScatterValue(item.label, index, 20, -150, 150);
    const wipeExitDistance = getScatterValue(item.label, index, 19, 155, 205);
    const shouldRoll = getScatterValue(item.label, index, 21, 0, 5) >= 4;
    const wipeRoll = shouldRoll
      ? wipeDirection * getScatterValue(item.label, index, 22, 70, 190)
      : wipeDirection * getScatterValue(item.label, index, 22, 4, 18);
    const wipeRollStep1 = Math.round(wipeRoll * 0.28);
    const wipeRollStep2 = Math.round(wipeRoll * 0.64);
    const opacity = item.tone === "language" ? 0.78 + item.weight * 0.22 : 1;
    const colorOpacity = item.label === "上 原 龍 之 介" ? 0.82 : 1;

    return [
      `--cloud-angle: ${itemAngle}deg`,
      `--cloud-angle-reverse: ${itemAngle * -1}deg`,
      `--cloud-radius: ${radius / 100}`,
      `--cloud-rotation: ${rotation}deg`,
      `--cloud-size: ${size}rem`,
      `--mobile-x: ${mobilePosition.x}%`,
      `--mobile-y: ${mobilePosition.y}%`,
      `--mobile-rotation: ${mobileRotation}deg`,
      `--mobile-size: ${mobileSize}rem`,
      `--desktop-x: ${desktopPosition.x}%`,
      `--desktop-y: ${desktopPosition.y}%`,
      `--desktop-rotation: ${desktopRotation}deg`,
      `--desktop-size: ${desktopSize}rem`,
      item.label === "上 原 龍 之 介"
        ? `--name-mobile-size: ${mobileSize}rem`
        : "",
      item.label === "上 原 龍 之 介"
        ? `--name-desktop-size: ${desktopSize}rem`
        : "",
      `--cloud-weight: ${getFontWeight(item)}`,
      `--cloud-opacity: ${opacity}`,
      `--cloud-color-opacity: ${colorOpacity}`,
      `--float-x: ${floatX}px`,
      `--float-y: ${floatY}px`,
      `--float-rotation: ${floatRotation}deg`,
      `--float-duration: ${floatDuration}ms`,
      `--float-delay: ${floatDelay}ms`,
      `--hover-x: ${hoverX}px`,
      `--hover-y: ${hoverY}px`,
      `--hover-rotation: ${hoverRotation}deg`,
      `--scatter-x: ${scatterX}px`,
      `--scatter-y: ${scatterY}px`,
      `--scatter-rotation: ${scatterRotation}deg`,
      `--wipe-direction: ${wipeDirection}`,
      `--wipe-distance: ${wipeDistance}em`,
      `--wipe-lift: ${wipeLift}em`,
      `--wipe-delay: ${wipeDelay}ms`,
      `--wipe-duration: ${wipeDuration}ms`,
      `--wipe-exit-x: calc(${wipeDirection} * ${wipeExitDistance}vw)`,
      `--wipe-exit-y: ${wipeExitY}px`,
      `--wipe-roll: ${wipeRoll}deg`,
      `--wipe-roll-step-1: ${wipeRollStep1}deg`,
      `--wipe-roll-step-2: ${wipeRollStep2}deg`,
    ].join("; ");
  }

  function getRadius(index: number, item: CloudItem) {
    if (item.label === "上 原 龍 之 介") {
      return 0;
    }

    const baseRadius = item.tone === "language" ? 22 : 16;
    const ringOffset = (index % 4) * 11;
    const weightOffset = (1 - item.weight) * 8;

    return Math.min(48, baseRadius + ringOffset + weightOffset);
  }

  function getFontSize(item: CloudItem) {
    if (item.label === "上 原 龍 之 介") {
      return 5.1;
    }

    if (item.tone === "primary") {
      return 2.4 + item.weight * 2.8;
    }

    if (item.tone === "secondary") {
      return 1.7 + item.weight * 1.95;
    }

    return 1.75 + Math.sqrt(item.weight) * 4.15;
  }

  function getDesktopFontSize(item: CloudItem) {
    const sizeByLabel = new Map([
      ["上 原 龍 之 介", 5.2],
      ["TypeScript", 4.6],
      ["React", 4.25],
      ["2001", 3.1],
      ["Python", 4.45],
      ["Rust", 4.15],
      ["Tailwind", 3.7],
      ["Docker", 3.25],
      ["Next.js", 3.15],
      ["web", 3.05],
      ["ue / hara", 3],
      ["HTML", 2.85],
      ["CSS", 2.85],
      ["Shell", 2.85],
      ["Vue", 2.85],
      ["Svelte", 3.1],
      ["JavaScript", 2.9],
      ["宮古島", 2.75],
      ["sweep", 2.7],
    ]);

    return sizeByLabel.get(item.label) ?? getFontSize(item) * 0.78;
  }

  function getMobileFontSize(item: CloudItem) {
    if (item.label === "上 原 龍 之 介") {
      return 3.25;
    }

    if (item.tone === "primary") {
      return 2.04 + item.weight * 1.3;
    }

    if (item.tone === "secondary") {
      return 1.44 + item.weight * 0.98;
    }

    return 1.3 + Math.sqrt(item.weight) * 2.05;
  }

  function getFontWeight(item: CloudItem) {
    if (item.tone === "language") {
      return Math.round(260 + item.weight * 280);
    }

    return item.tone === "primary" ? 500 : 260;
  }

  function getScatterValue(
    name: string,
    index: number,
    salt: number,
    min: number,
    max: number
  ) {
    const hash = getSeed(`${name}-${index}`, salt);

    return Math.round(min + (hash % 100) * ((max - min) / 99));
  }

  function getSeed(name: string, salt: number) {
    return [...`${name}-${salt}`].reduce(
      (result, char) => result + char.charCodeAt(0),
      0
    );
  }

  function isLatinText(label: string) {
    return /^[\w\s/@.-]+$/.test(label);
  }

  function getItemClass(item: CloudItem) {
    return [
      "profile-cloud__item",
      `profile-cloud__item--${item.tone}`,
      item.label === "上 原 龍 之 介" ? "profile-cloud__item--name" : "",
      item.label === "sweep" ? "profile-cloud__item--sweep" : "",
      isLatinText(item.label) ? "profile-cloud__item--latin" : "",
    ]
      .filter(Boolean)
      .join(" ");
  }

  function startSweep() {
    if (sweepPhase !== "idle") {
      return;
    }

    clearSweepTimers();
    sweepPhase = "wipe";
    sweepTimers = [
      window.setTimeout(() => (sweepPhase = "scatter"), 3660),
      window.setTimeout(() => (sweepPhase = "slash"), 3690),
      window.setTimeout(() => (sweepPhase = "hold"), 4490),
      window.setTimeout(() => (sweepPhase = "returning"), 8490),
      window.setTimeout(() => (sweepPhase = "idle"), 9790),
    ];
  }

  function clearSweepTimers() {
    sweepTimers.forEach((timer) => window.clearTimeout(timer));
    sweepTimers = [];
  }

  onDestroy(clearSweepTimers);

  function getMobilePosition(item: CloudItem, index: number) {
    const fixedPosition = mobilePositions.get(item.label);

    if (fixedPosition) {
      return fixedPosition;
    }

    return fallbackMobilePositions[index % fallbackMobilePositions.length];
  }

  function getDesktopPosition(item: CloudItem, index: number) {
    const fixedPosition = desktopPositions.get(item.label);

    if (fixedPosition) {
      return fixedPosition;
    }

    return fallbackDesktopPositions[index % fallbackDesktopPositions.length];
  }

  function mergeCloudItems(items: CloudItem[]) {
    return [
      ...items
        .reduce((result, item) => {
          const existingItem = result.get(item.label);

          if (!existingItem) {
            result.set(item.label, item);
            return result;
          }

          result.set(item.label, {
            ...existingItem,
            bytes: (existingItem.bytes ?? 0) + (item.bytes ?? 0) || undefined,
            tone:
              existingItem.tone === "primary" || item.tone === "primary"
                ? "primary"
                : item.tone,
            weight: Math.max(existingItem.weight, item.weight),
          });

          return result;
        }, new Map<string, CloudItem>())
        .values(),
    ];
  }
</script>

<div
  class={`profile-cloud profile-cloud--${sweepPhase}`}
  aria-label="プロフィール要素"
>
  {#each cloudItems as item, i}
    {#if item.label === "sweep"}
      <button
        class={getItemClass(item)}
        style={getItemStyle(item, i)}
        type="button"
        onclick={startSweep}
        title="sweep"
      >
        <span class="profile-cloud__label">{item.label}</span>
      </button>
    {:else}
      <span
        class={getItemClass(item)}
        style={getItemStyle(item, i)}
        title={item.bytes
          ? `${item.label}: ${item.bytes.toLocaleString()} bytes`
          : item.label}
      >
        <span class="profile-cloud__label">
          {#if item.label === "上 原 龍 之 介"}
            <span class="profile-cloud__name-core"
              ><span class="profile-cloud__name-first">上</span><span
                class="profile-cloud__name-slash">/</span
              ><span class="profile-cloud__name-last">原</span></span
            ><span class="profile-cloud__name-rest">龍之介</span>
          {:else}
            {item.label}
          {/if}
        </span>
      </span>
    {/if}
  {/each}
</div>

<style>
  .profile-cloud {
    --cloud-font-max: 4.35rem;
    --cloud-size-base: min(98vw, 460px);
    height: clamp(620px, calc(100svh - 24px), 860px);
    position: relative;
    width: min(100%, 430px);
    min-width: 280px;
    margin: 0 auto;
  }

  .profile-cloud__item {
    background: transparent;
    border: 0;
    color: rgba(246, 247, 250, var(--cloud-color-opacity));
    cursor: default;
    display: inline-block;
    font-family: var(--font-jp);
    font-size: clamp(0.7rem, var(--mobile-size), var(--cloud-font-max));
    font-weight: var(--cloud-weight);
    left: var(--mobile-x);
    line-height: 1;
    opacity: var(--cloud-opacity);
    position: absolute;
    text-shadow: 0 2px 20px rgba(42, 123, 145, 0.26);
    top: var(--mobile-y);
    transform: translate(-50%, -50%) rotate(var(--mobile-rotation));
    transform-origin: center;
    transition:
      opacity 1.05s ease,
      transform 0.28s cubic-bezier(0.22, 1, 0.36, 1);
    white-space: nowrap;
  }

  .profile-cloud__item:hover,
  .profile-cloud__item:active {
    transform: translate(-50%, -50%) translate(var(--hover-x), var(--hover-y))
      rotate(calc(var(--mobile-rotation) + var(--hover-rotation)));
  }

  .profile-cloud__label {
    display: inline-block;
    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;
    line-height: inherit;
    animation: profileCloudDrift var(--float-duration) ease-in-out infinite
      alternate;
    animation-delay: var(--float-delay);
    will-change: transform;
  }

  .profile-cloud__item--primary {
    letter-spacing: 0;
  }

  .profile-cloud__item--name {
    color: rgba(246, 247, 250, 0.82);
  }

  .profile-cloud__item--sweep {
    color: rgba(246, 247, 250, 0.98);
    cursor: pointer;
    text-shadow:
      0 2px 20px rgba(42, 123, 145, 0.26),
      0 0 18px rgba(246, 247, 250, 0.24);
  }

  .profile-cloud__item--sweep .profile-cloud__label {
    animation: sweepInvite 1.85s ease-in-out infinite;
  }

  .profile-cloud--wipe .profile-cloud__item {
    animation: profileCloudWipeItem var(--wipe-duration) var(--wipe-delay)
      cubic-bezier(0.48, 0.02, 0.3, 1) both;
    pointer-events: none;
  }

  .profile-cloud--wipe .profile-cloud__item--name {
    animation: none;
    opacity: var(--cloud-opacity);
    pointer-events: none;
  }

  .profile-cloud--wipe .profile-cloud__item--name .profile-cloud__label,
  .profile-cloud--scatter .profile-cloud__item--name .profile-cloud__label {
    animation: none;
  }

  .profile-cloud--scatter .profile-cloud__item,
  .profile-cloud--slash .profile-cloud__item,
  .profile-cloud--hold .profile-cloud__item {
    opacity: 0;
    pointer-events: none;
    transform: translate(-50%, -50%)
      translate(var(--scatter-x), var(--scatter-y))
      rotate(var(--scatter-rotation));
    transition:
      opacity 0.85s ease,
      transform 1.35s cubic-bezier(0.17, 0.84, 0.3, 1);
  }

  .profile-cloud--scatter .profile-cloud__item--name {
    opacity: var(--cloud-opacity);
    transform: translate(-50%, -50%) rotate(var(--mobile-rotation));
  }

  .profile-cloud--slash .profile-cloud__item--name,
  .profile-cloud--hold .profile-cloud__item--name,
  .profile-cloud--returning .profile-cloud__item--name {
    opacity: var(--cloud-opacity);
    transform: translate(-50%, -50%) rotate(var(--mobile-rotation));
    transition: none;
  }

  .profile-cloud--returning .profile-cloud__item {
    pointer-events: none;
    transition:
      opacity 1.05s ease,
      transform 1.25s cubic-bezier(0.17, 0.84, 0.3, 1);
  }

  .profile-cloud__name-core,
  .profile-cloud__name-rest {
    display: inline-block;
    font: inherit;
  }

  .profile-cloud__name-core {
    align-items: center;
    display: inline-flex;
    margin-right: 0.08em;
  }

  .profile-cloud__name-core span {
    display: inline-block;
    font: inherit;
  }

  .profile-cloud__name-first,
  .profile-cloud__name-last {
    transition: transform 1.18s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .profile-cloud__name-slash {
    margin: 0;
    opacity: 0;
    overflow: hidden;
    transform: translateY(-1.4em) rotate(14deg);
    width: 0;
  }

  .profile-cloud--slash .profile-cloud__name-first,
  .profile-cloud--hold .profile-cloud__name-first,
  .profile-cloud--returning .profile-cloud__name-first {
    transform: translateX(-0.08em);
  }

  .profile-cloud--slash .profile-cloud__name-last,
  .profile-cloud--hold .profile-cloud__name-last,
  .profile-cloud--returning .profile-cloud__name-last {
    transform: translateX(0.08em);
  }

  .profile-cloud--slash .profile-cloud__name-slash {
    animation: slashDrop 1.12s 0.12s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  .profile-cloud--hold .profile-cloud__name-slash,
  .profile-cloud--returning .profile-cloud__name-slash {
    margin: 0 0.2em;
    opacity: 1;
    transform: translateY(0) rotate(0deg);
    width: 0.42em;
  }

  .profile-cloud--wipe .profile-cloud__name-rest,
  .profile-cloud--scatter .profile-cloud__name-rest {
    animation: profileCloudNameRestWipe 1.65s cubic-bezier(0.48, 0.02, 0.3, 1)
      both;
  }

  .profile-cloud--slash .profile-cloud__name-rest,
  .profile-cloud--hold .profile-cloud__name-rest,
  .profile-cloud--returning .profile-cloud__name-rest {
    opacity: 0;
    visibility: hidden;
  }

  .profile-cloud__item--latin,
  .profile-cloud__item--language {
    font-family: var(--font-en);
  }

  .profile-cloud__item--secondary {
    color: rgba(246, 247, 250, 0.86);
  }

  .profile-cloud__item--language {
    color: rgba(246, 247, 250, 0.94);
  }

  @keyframes profileCloudDrift {
    from {
      transform: translate(0, 0) rotate(0deg);
    }
    to {
      transform: translate(var(--float-x), var(--float-y))
        rotate(var(--float-rotation));
    }
  }

  @keyframes profileCloudWipeItem {
    0% {
      opacity: var(--cloud-opacity);
      transform: translate(-50%, -50%) rotate(var(--mobile-rotation));
    }
    100% {
      opacity: var(--cloud-opacity);
      transform: translate(-50%, -50%)
        translate(var(--wipe-exit-x), var(--wipe-exit-y))
        rotate(calc(var(--mobile-rotation) + var(--wipe-roll)));
    }
  }

  @keyframes profileCloudNameRestWipe {
    0% {
      opacity: 1;
      transform: translate(0, 0) rotate(0deg);
    }
    100% {
      opacity: 1;
      transform: translate(125vw, 0.14em) rotate(190deg);
    }
  }

  @keyframes sweepInvite {
    0% {
      opacity: 0.72;
      transform: translate(0, 0) rotate(-1deg) scale(1);
    }
    38% {
      opacity: 1;
      transform: translate(0.12em, -0.1em) rotate(2deg) scale(1.12);
    }
    68% {
      opacity: 0.86;
      transform: translate(-0.06em, 0.04em) rotate(-1.2deg) scale(1.04);
    }
    100% {
      opacity: 0.72;
      transform: translate(0, 0) rotate(-1deg) scale(1);
    }
  }

  @keyframes slashDrop {
    0% {
      margin: 0;
      opacity: 0;
      transform: translateY(-1.4em) rotate(14deg);
      width: 0;
    }
    45% {
      opacity: 0.58;
    }
    to {
      margin: 0 0.2em;
      opacity: 1;
      transform: translateY(0) rotate(0deg);
      width: 0.42em;
    }
  }

  @media (min-width: 768px) {
    .profile-cloud {
      --cloud-font-max: 6rem;
      height: min(900px, calc(100vh - 64px));
      width: min(100%, 1480px);
    }

    .profile-cloud__item {
      left: var(--desktop-x);
      font-size: clamp(2rem, var(--desktop-size), var(--cloud-font-max));
      top: var(--desktop-y);
      transform: translate(-50%, -50%) rotate(var(--desktop-rotation));
    }

    .profile-cloud__item:hover,
    .profile-cloud__item:active {
      transform: translate(-50%, -50%) translate(var(--hover-x), var(--hover-y))
        rotate(calc(var(--desktop-rotation) + var(--hover-rotation)));
    }

    .profile-cloud--wipe .profile-cloud__item {
      animation-name: profileCloudWipeItemDesktop;
    }

    .profile-cloud--scatter .profile-cloud__item--name {
      transform: translate(-50%, -50%) rotate(var(--desktop-rotation));
    }

    .profile-cloud--slash .profile-cloud__item--name,
    .profile-cloud--hold .profile-cloud__item--name,
    .profile-cloud--returning .profile-cloud__item--name {
      transform: translate(-50%, -50%) rotate(var(--desktop-rotation));
    }

    .profile-cloud__sweep-name {
      font-size: clamp(2rem, var(--name-desktop-size), var(--cloud-font-max));
      left: 54%;
      top: 49%;
    }
  }

  @keyframes profileCloudWipeItemDesktop {
    0% {
      opacity: var(--cloud-opacity);
      transform: translate(-50%, -50%) rotate(var(--desktop-rotation));
    }
    100% {
      opacity: var(--cloud-opacity);
      transform: translate(-50%, -50%)
        translate(var(--wipe-exit-x), var(--wipe-exit-y))
        rotate(calc(var(--desktop-rotation) + var(--wipe-roll)));
    }
  }

  @media (max-width: 380px) {
    .profile-cloud {
      --cloud-font-max: 3.85rem;
      height: clamp(600px, calc(100svh - 18px), 820px);
      width: min(100%, 380px);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .profile-cloud__label {
      animation: none;
    }
  }
</style>
