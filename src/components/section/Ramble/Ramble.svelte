<script lang="ts">
  import QuoteDisplay from "../../../lib/QuoteDisplay.svelte";
  const href = "/ramble";
</script>

<section class="section-ramble section-style-base">
  <div class="section-ramble-contents">
    <div class="section-ramble-title-wrapper">
      <h2 class="section-ramble-title">言・こと</h2>
      <p class="section-ramble-subtitle">ramble</p>
    </div>

    <p class="release-soon-text">近日公開</p>
    <a {href} aria-disabled="true" class="coto2-link disabled">→ 言・こと</a>

    <!-- 名言コンポーネントを使用 -->
    <QuoteDisplay typingSpeed_ms={50} interval_s={20} autoStart={true} />
  </div>
</section>

<style>
  .section-ramble {
    background-color: var(--amber-orange);
    min-height: 100vh;
  }
  .section-ramble-contents {
    width: 100%;
    margin: 0 auto;
  }
  .section-ramble-title {
    font-size: var(--font-size-lg);
  }
  .section-ramble-subtitle {
    font-size: var(--font-size-md);
  }
  .section-ramble-title-wrapper::after {
    content: "";
    display: block;
    height: 1px;
    width: 100%;
    margin: 8px 0 32px;
    background-image: repeating-linear-gradient(
      to right,
      var(--clear-white),
      var(--clear-white) 10px,
      transparent 10px,
      transparent 20px
    );
  }
  .release-soon-text {
    font-size: var(--font-size-md);
    display: flex;
    justify-content: center;
    padding: 40px 0 20px;
  }
  .coto2-link {
    font-size: var(--font-size-xs);
    display: flex;
    justify-content: center;
    padding-right: 7px;
  }
  .coto2-link.disabled {
    cursor: not-allowed;
    opacity: 0.6;
    text-decoration: none;
    pointer-events: none;
  }
</style>
