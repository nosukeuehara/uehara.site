<script lang="ts">
  import Foods from "../../../lib/Foods.svelte";
  import { createObserver } from "../../../lib/actions/createObserver";
  import { link } from "svelte-spa-router";

  const href = "/huuud";

  let isTitleVisible = false;
  let isComingSoonVisible = false;
  let isQuoteVisible = false;

  const titleObserver = createObserver(
    (entry) => (isTitleVisible = entry.isIntersecting)
  );
  const quoteObserver = createObserver(
    (entry) => (isQuoteVisible = entry.isIntersecting)
  );
  const comingSoonObserver = createObserver(
    (entry) => (isComingSoonVisible = entry.isIntersecting)
  );
</script>

<section class="section-huuud section-style-base">
  <div class="section-huuud__contents">
    <div
      class="section-huuud__title-wrapper"
      class:fade-in-up={isTitleVisible}
      use:titleObserver
    >
      <h2 class="section-huuud__title">ふーど</h2>
      <p class="section-huuud__subtitle">huuud</p>
    </div>

    <div
      class="section-huuud__quote-wrapper"
      class:fade-in-up={isQuoteVisible}
      use:quoteObserver
    >
      <Foods />
    </div>

    <div
      class="section-huuud__coming-soon"
      class:fade-in-up={isComingSoonVisible}
      use:comingSoonObserver
    >
      <a
        {href}
        use:link
        aria-disabled="true"
        class="section-huuud__link section-huuud__link"
      >
        → ふーど
      </a>
    </div>
  </div>
</section>

<style>
  .section-huuud {
    background-color: var(--amber-orange);
    min-height: 100vh;
  }

  .section-huuud__contents {
    width: 100%;
    margin: 0 auto;
  }

  .section-huuud__title-wrapper {
    opacity: 0;
    transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    margin-bottom: 42px;
  }

  .section-huuud__title-wrapper * {
    line-height: 1;
  }

  .section-huuud__title-wrapper::after {
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

  .section-huuud__title {
    font-size: var(--font-size-lg);
    padding-bottom: 3px;
  }

  .section-huuud__subtitle {
    font-size: var(--font-size-md);
    font-family: var(--font-en);
  }

  .section-huuud__coming-soon {
    opacity: 0;
    transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .section-huuud__link {
    font-size: var(--font-size-sm);
    display: flex;
    justify-content: center;
    padding-right: 7px;
    text-decoration: none;
  }

  .section-huuud__quote-wrapper {
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
    .section-huuud__contents {
      max-width: 1080px;
    }

    .section-huuud__quote-wrapper {
      padding: 70px 0;
    }

    .section-huuud__title {
      font-size: var(--font-size-xl);
    }

    .section-huuud__subtitle {
      font-size: var(--font-size-lg);
    }
  }
</style>
