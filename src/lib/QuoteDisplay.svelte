<script lang="ts">
  import { onMount, onDestroy } from "svelte";

  interface Quote {
    meigen: string;
    auther: string;
  }

  // Props
  export let typingSpeed_ms: number = 50;
  export let interval_s: number = 20;
  export let autoStart: boolean = true;

  // State
  let quote: Quote = {
    meigen: "書きかけの言葉がここに現れる予定です…",
    auther: "不明",
  };
  let displayed = "";
  let author = "";
  let countdown = interval_s;
  let timer: ReturnType<typeof setInterval>;
  let isPaused = false;

  const API_URL = import.meta.env.PROD
    ? "https://meigen.doodlenote.net/api/json.php"
    : "/api/meigen";

  async function fetchQuote(): Promise<Array<Quote>> {
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      return data;
    } catch (err) {
      console.error("名言の取得に失敗しました", err);
      throw new Error("名言の取得に失敗しました");
    }
  }

  async function typeQuote(data: Quote) {
    displayed = "";
    author = "";

    // 名言をタイピング効果で表示
    for (let i = 0; i < data.meigen.length; i++) {
      displayed += data.meigen[i];
      await new Promise((resolve) => setTimeout(resolve, typingSpeed_ms));
    }

    // 作者をタイピング効果で表示
    for (let i = 0; i < data.auther.length; i++) {
      author += data.auther[i];
      await new Promise((resolve) => setTimeout(resolve, typingSpeed_ms));
    }
  }

  function startTimer() {
    clearInterval(timer);
    timer = setInterval(() => {
      if (!isPaused) {
        countdown--;
        if (countdown === 0) {
          updateQuote();
          countdown = interval_s;
        }
      }
    }, 1000);
  }

  async function updateQuote() {
    clearInterval(timer);
    quote = (await fetchQuote())[0];
    quote.auther = `— ${quote.auther}`;
    displayed = "";
    author = "";
    await typeQuote(quote);
    countdown = interval_s;
    startTimer();
  }

  function togglePause() {
    isPaused = !isPaused;
  }

  function copyQuote() {
    const text = `${displayed} ${author}`;
    navigator.clipboard.writeText(text).then(() => {
      alert("名言をコピーしました");
    });
  }

  onMount(async () => {
    if (autoStart) {
      await updateQuote();
    }
  });

  onDestroy(() => {
    clearInterval(timer);
  });
</script>

<div class="quote-container">
  <div class="quote">
    <p class="quote-text">{displayed}</p>
    <p class="quote-author">{author}</p>
  </div>

  <div class="quote-controls">
    <p>{countdown} 秒</p>
    <button on:click={togglePause} aria-label="Toggle pause/resume">
      {#if isPaused}
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M8 5v14l11-7z" />
        </svg>
      {:else}
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M6 5h4v14H6zm8 0h4v14h-4z" />
        </svg>
      {/if}
    </button>
    <button on:click={copyQuote}>コピー</button>
  </div>
</div>

<style>
  .quote-container {
    width: 100%;
  }
  .quote {
    min-height: 170px;
  }
  .quote-text {
    font-family: "Courier New", Courier, monospace;
    margin-bottom: 20px;
  }
  .quote-author {
    font-size: var(--font-size-xs);
    display: flex;
    justify-content: flex-end;
    font-style: italic;
  }
  .quote-controls {
    display: flex;
    gap: 10px;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
  }
  .quote-controls button {
    display: flex;
    border: none;
    font-size: var(--font-size-xs);
    cursor: pointer;
  }
  @media (min-width: 1024px) {
    .quote-container {
      width: 40%;
      margin: 0 auto;
    }
  }
</style>
