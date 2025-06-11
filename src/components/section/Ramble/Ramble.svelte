<script lang="ts">
  import QuoteDisplay from "../../../lib/QuoteDisplay.svelte";
  import { createObserver } from "../../../lib/actions/createObserver";

  const href = "/ramble";

  let isTitleVisible = false;
  let isComingSoonVisible = false;
  let isQuoteVisible = false;

  const titleObserver = createObserver(
    (entry) => (isTitleVisible = entry.isIntersecting)
  );
  const comingSoonObserver = createObserver(
    (entry) => (isComingSoonVisible = entry.isIntersecting)
  );
  const quoteObserver = createObserver(
    (entry) => (isQuoteVisible = entry.isIntersecting)
  );
</script>

<section class="section-ramble section-style-base">
  <div class="section-ramble__contents">
    <div
      class="section-ramble__title-wrapper"
      class:fade-in-up={isTitleVisible}
      use:titleObserver
    >
      <h2 class="section-ramble__title">言・こと</h2>
      <p class="section-ramble__subtitle">ramble</p>
    </div>

    <div
      class="section-ramble__coming-soon"
      class:fade-in-up={isComingSoonVisible}
      use:comingSoonObserver
    >
      <p class="section-ramble__coming-soon-text">近日公開</p>
      <a
        {href}
        aria-disabled="true"
        class="section-ramble__link section-ramble__link--disabled"
      >
        → 言・こと
      </a>
    </div>

    <div
      class="section-ramble__quote-wrapper"
      class:fade-in-up={isQuoteVisible}
      use:quoteObserver
    >
      <QuoteDisplay />
    </div>
  </div>
</section>

<style>
  .section-ramble {
    background-color: var(--amber-orange);
    min-height: 100vh;
  }

  .section-ramble__contents {
    width: 100%;
    margin: 0 auto;
  }

  .section-ramble__title-wrapper {
    opacity: 0;
    transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    margin-bottom: 42px;
  }

  .section-ramble__title-wrapper * {
    line-height: 1;
  }

  .section-ramble__title-wrapper::after {
    content: "";
    display: block;
    height: 2px;
    width: 100%;
    margin-top: 8px;
    background-image: repeating-linear-gradient(
      to right,
      var(--clear-white),
      var(--clear-white) 10px,
      transparent 10px,
      transparent 20px
    );
  }

  .section-ramble__title {
    font-size: var(--font-size-lg);
    padding-bottom: 3px;
  }

  .section-ramble__subtitle {
    font-size: var(--font-size-md);
  }

  .section-ramble__coming-soon {
    opacity: 0;
    transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .section-ramble__coming-soon-text {
    font-size: var(--font-size-md);
    display: flex;
    justify-content: center;
    padding: 40px 0 20px;
  }

  .section-ramble__link {
    font-size: var(--font-size-sm);
    display: flex;
    justify-content: center;
    padding-right: 7px;
    text-decoration: none;
  }

  .section-ramble__link--disabled {
    cursor: not-allowed;
    opacity: 0.6;
    pointer-events: none;
  }

  .section-ramble__quote-wrapper {
    opacity: 0;
    transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    display: flex;
    justify-content: center;
    padding: 30px 0;
  }

  .fade-in-up {
    opacity: 1;
    animation: fadeInUp 0.8s ease-out forwards;
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (min-width: 768px) {
    .section-ramble__contents {
      max-width: 1080px;
    }

    .section-ramble__quote-wrapper {
      padding: 70px 0;
    }

    .section-ramble__title {
      font-size: var(--font-size-xl);
    }

    .section-ramble__subtitle {
      font-size: var(--font-size-lg);
    }
  }
</style>
