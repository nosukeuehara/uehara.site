<script lang="ts">
  import DefaultLayout from "./common/layout/DefaultLayout.svelte";
  import { createObserver } from "../lib/actions/createObserver";
  import Foods from "../lib/Foods.svelte";

  const href = "/huuud";

  let isTitleVisible = false;
  let isFoodVisu = false;

  const titleObserver = createObserver(
    (entry) => (isTitleVisible = entry.isIntersecting)
  );
  const quoteObserver = createObserver(
    (entry) => (isFoodVisu = entry.isIntersecting)
  );
</script>

<DefaultLayout>
  <div class="huuud">
    <div class="huuud__contents">
      <div
        class="huuud__title-wrapper"
        class:fade-in-up={isTitleVisible}
        use:titleObserver
      >
        <h2 class="huuud__title">ふーど</h2>
        <p class="huuud__subtitle">huuud</p>
      </div>

      <div class:fade-in-up={isFoodVisu} use:quoteObserver>
        <Foods />
      </div>
    </div>
  </div>
</DefaultLayout>

<style>
  .huuud {
    background-color: var(--amber-orange);
    min-height: 100vh;
    padding: 120px 24px;
  }

  .huuud__contents {
    width: 100%;
    margin: 0 auto;
  }

  .huuud__title-wrapper {
    opacity: 0;
    transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    margin-bottom: 42px;
  }

  .huuud__title-wrapper * {
    line-height: 1;
  }

  .huuud__title-wrapper::after {
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

  .huuud__title {
    font-size: var(--font-size-lg);
    margin: 0;
  }

  .huuud__subtitle {
    font-size: var(--font-size-md);
    margin: 0;
    font-family: var(--font-en);
    font-weight: var(--font-weight-light);
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
    .huuud {
      padding: 190px 24px;
    }

    .huuud__contents {
      max-width: 1080px;
    }
    .huuud__title {
      font-size: var(--font-size-xl);
    }

    .huuud__subtitle {
      font-size: var(--font-size-lg);
    }
  }
</style>
