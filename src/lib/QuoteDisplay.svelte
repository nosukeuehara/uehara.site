<script lang="ts">
  import { onMount, onDestroy } from "svelte";

  interface Quote {
    meigen: string;
    auther: string;
  }

  export let typingSpeed_ms: number = 50;
  export let autoStart: boolean = true;
  export let switchInterval_s: number = 30;

  const SIZE = 10;
  const API_URL = import.meta.env.VITE_QUOTE_API_URL!;
  const STORAGE_KEY = "meigen_cache";

  let quote: Quote = {
    meigen: "書きかけの言葉がここに現れる予定です…",
    auther: "不明",
  };
  let displayed = "";
  let author = "";
  let cachedQuotes: Quote[] = [];
  let currentIndex = 0;
  let timer: ReturnType<typeof setInterval>;

  async function fetchQuoteOncePerDay(): Promise<Quote[]> {
    const saved = localStorage.getItem(STORAGE_KEY);
    const today = new Date().toISOString().slice(0, 10);

    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.date === today && Array.isArray(parsed.quotes)) {
        return parsed.quotes;
      }
    }

    try {
      const res = await fetch(`${API_URL}meigen?c=${SIZE}`);
      const data = await res.json();
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ date: today, quotes: data })
      );
      return data;
    } catch (err) {
      console.error("名言の取得に失敗しました", err);
      throw new Error("名言の取得に失敗しました");
    }
  }

  async function typeQuote(data: Quote) {
    displayed = "";
    author = "";

    for (let i = 0; i < data.meigen.length; i++) {
      displayed += data.meigen[i];
      await new Promise((resolve) => setTimeout(resolve, typingSpeed_ms));
    }

    for (let i = 0; i < data.auther.length; i++) {
      author += data.auther[i];
      await new Promise((resolve) => setTimeout(resolve, typingSpeed_ms));
    }
  }

  async function updateQuote() {
    if (cachedQuotes.length === 0) return;

    const data = cachedQuotes[currentIndex];
    currentIndex = (currentIndex + 1) % cachedQuotes.length;

    quote = { ...data, auther: `— ${data.auther}` };
    await typeQuote(quote);
  }

  function copyQuote() {
    const text = `${displayed} ${author}`;
    navigator.clipboard.writeText(text).then(() => {
      alert("名言をコピーしました");
    });
  }

  async function initialize() {
    cachedQuotes = await fetchQuoteOncePerDay();
    currentIndex = 0;
    await updateQuote();

    timer = setInterval(updateQuote, switchInterval_s * 1000);
  }

  onMount(() => {
    if (autoStart) {
      initialize();
    }
  });

  onDestroy(() => {
    clearInterval(timer);
  });
</script>

<div class="quote-container">
  <button class="quote" on:click={copyQuote} type="button">
    <p class="quote-text">{displayed}</p>
    <p class="quote-author">{author}</p>
    <p class="quote-author">https://meigen.doodlenote.net/</p>
  </button>
</div>

<style>
  .quote-container {
    width: 100%;
  }
  .quote {
    min-height: 170px;
    cursor: pointer;
    background: none;
    border: none;
    padding: 0;
    text-align: left;
    width: 100%;
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
  @media (min-width: 1024px) {
    .quote-container {
      width: 40%;
      margin: 0 auto;
    }
  }
</style>
