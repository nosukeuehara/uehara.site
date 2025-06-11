<script lang="ts">
  import DefaultLayout from "./common/layout/DefaultLayout.svelte";
  import { createObserver } from "../lib/actions/createObserver";
  import QuoteDisplay from "../../src/lib/QuoteDisplay.svelte";

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

<DefaultLayout>
  <div class="ramble section-style-base">
    <div class="ramble__contents">
      <div
        class="ramble__title-wrapper"
        class:fade-in-up={isTitleVisible}
        use:titleObserver
      >
        <h2 class="ramble__title">言・こと</h2>
        <p class="ramble__subtitle">ramble</p>
      </div>

      <div
        class="ramble__coming-soon"
        class:fade-in-up={isComingSoonVisible}
        use:comingSoonObserver
      >
        <p class="ramble__coming-soon-text">近日公開</p>
        <a
          {href}
          aria-disabled="true"
          class="ramble__link ramble__link--disabled"
        >
          → 言・こと
        </a>
      </div>

      <div
        class="ramble__quote"
        class:fade-in-up={isQuoteVisible}
        use:quoteObserver
      >
        <QuoteDisplay />
      </div>
    </div>
  </div>
</DefaultLayout>

<style>
  .ramble {
    background-color: var(--amber-orange);
    min-height: 100vh;
  }

  .ramble__contents {
    width: 100%;
    margin: 0 auto;
  }

  .ramble__title-wrapper {
    opacity: 0;
    transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    margin-bottom: 42px;
  }

  .ramble__title-wrapper * {
    line-height: 1;
  }

  .ramble__title-wrapper::after {
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

  .ramble__title {
    font-size: var(--font-size-lg);
    margin: 0;
  }

  .ramble__subtitle {
    font-size: var(--font-size-md);
    margin: 0;
  }

  .ramble__coming-soon {
    opacity: 0;
    transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .ramble__coming-soon-text {
    font-size: var(--font-size-md);
    padding: 40px 0 20px;
    margin: 0;
  }

  .ramble__link {
    font-size: var(--font-size-sm);
    display: flex;
    justify-content: center;
    padding-right: 7px;
    text-decoration: none;
  }

  .ramble__link--disabled {
    cursor: not-allowed;
    opacity: 0.6;
    pointer-events: none;
  }

  .ramble__quote {
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
    .ramble {
      padding: 190px 24px;
    }

    .ramble__contents {
      max-width: 1080px;
    }

    .ramble__quote {
      padding: 70px 0;
    }

    .ramble__title {
      font-size: var(--font-size-xl);
    }

    .ramble__subtitle {
      font-size: var(--font-size-lg);
    }
  }
</style>
