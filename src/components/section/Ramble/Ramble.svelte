<script lang="ts">
  import { onMount } from "svelte";
  import QuoteDisplay from "../../../lib/QuoteDisplay.svelte";
  const href = "/ramble";

  let titleRef: HTMLDivElement;
  let commingsoonRef: HTMLDivElement;
  let quoteRef: HTMLDivElement;

  let isTitleVisible = false;
  let isCommingSoonVisible = false;
  let isQuoteVisible = false;

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === titleRef) {
            isTitleVisible = entry.isIntersecting;
          } else if (entry.target === commingsoonRef) {
            isCommingSoonVisible = entry.isIntersecting;
          } else if (entry.target === quoteRef) {
            isQuoteVisible = entry.isIntersecting;
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    if (titleRef) observer.observe(titleRef);
    if (commingsoonRef) observer.observe(commingsoonRef);
    if (quoteRef) observer.observe(quoteRef);

    return () => observer.disconnect();
  });
</script>

<section class="section-ramble section-style-base">
  <div class="section-ramble-contents">
    <div
      class="section-ramble-title-wrapper"
      class:fade-in-up={isTitleVisible}
      bind:this={titleRef}
    >
      <h2 class="section-ramble-title">言・こと</h2>
      <p class="section-ramble-subtitle">ramble</p>
    </div>

    <div
      class="commingsoon-wrapper"
      class:fade-in-up={isCommingSoonVisible}
      bind:this={commingsoonRef}
    >
      <p class="release-soon-text">近日公開</p>
      <a {href} aria-disabled="true" class="coto2-link disabled">→ 言・こと</a>
    </div>

    <div
      class="quote-wrapper"
      class:fade-in-up={isTitleVisible}
      bind:this={quoteRef}
    >
      <QuoteDisplay typingSpeed_ms={50} interval_s={20} autoStart={true} />
    </div>
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
  .section-ramble-title-wrapper {
    opacity: 0;
    transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
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
  .commingsoon-wrapper {
    opacity: 0;
    transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .release-soon-text {
    font-size: var(--font-size-md);
    display: flex;
    justify-content: center;
    padding: 40px 0 20px;
  }
  .coto2-link {
    font-size: var(--font-size-sm);
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
  .quote-wrapper {
    opacity: 0;
    transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    display: flex;
    justify-content: center;
    padding: 100px 0;
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
  @media (min-width: 1024px) {
    .section-ramble-contents {
      max-width: 1080px;
    }
  }
</style>
