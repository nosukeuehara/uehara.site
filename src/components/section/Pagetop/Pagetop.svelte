<script lang="ts">
  import Navbar from "../../common/Navbar.svelte";
  import { delayLoad } from "../../../lib/actions/delayLoad";

  let isLoaded = false;
</script>

<section
  class="page-top section-style-base"
  use:delayLoad={100}
  on:delayload={() => (isLoaded = true)}
>
  <!-- max-width: 768px / none display -->
  <div class="navbar-wrapper" class:fade-in={isLoaded}>
    <Navbar />
  </div>

  <div class="pagetop-contents">
    <div class="names" class:slide-up={isLoaded}>
      <p class="name-kanji">上 / 原</p>
      <p class="name-kana">ue / hara</p>
    </div>
    <div class="links" class:fade-in-delay={isLoaded}>
      <a
        target="_blank"
        class="github-link"
        rel="noopener noreferrer"
        href={import.meta.env.VITE_GITHUB_REPO_URL}>GitHub</a
      >
    </div>
  </div>

  <div class="please-scroll" class:float-animation={isLoaded}>下</div>
</section>

<style>
  .page-top {
    background-color: var(--cactus-green);
    height: 100vh;
    overflow: hidden;
    padding: 100px 0 0;
  }
  .pagetop-contents {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 50px;
    padding-top: calc(100vh / 3.5);
  }
  .navbar-wrapper,
  .names,
  .links,
  .please-scroll {
    transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .navbar-wrapper {
    opacity: 0;
    transform: translateY(-20px);
  }
  .names {
    opacity: 0;
    transform: translateY(40px);
    display: flex;
    flex-direction: column;
    align-items: center;
    width: fit-content;
  }
  .links {
    opacity: 0;
    transform: translateY(30px);
    transition-delay: 0.3s;
    display: flex;
    justify-content: center;
  }
  .please-scroll {
    opacity: 0;
    transform: translateX(-50%) translateY(20px);
    transition-delay: 0.6s;
    position: absolute;
    background-color: transparent;
    color: var(--clrear-white);
    font-family: var(--font-jp);
    text-align: center;
    left: 50%;
    bottom: 0;
  }
  .fade-in,
  .slide-up,
  .fade-in-delay {
    opacity: 1;
    transform: translateY(0);
  }
  .float-animation {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
    animation: float 3s ease-in-out infinite;
  }
  .names .name-kanji {
    font-size: 2em;
    font-weight: var(--font-weight-bold);
    animation: none;
  }
  .slide-up .name-kanji {
    animation: slideUpChar 1.2s cubic-bezier(0.4, 0, 0.2, 1) 0.2s both;
  }
  .names .name-kana {
    font-family: var(--font-en);
    font-weight: var(--font-weight-bold);
    text-align: center;
    font-size: 1.3em;
    animation: none;
  }
  .slide-up .name-kana {
    animation: slideUpChar 1.2s cubic-bezier(0.4, 0, 0.2, 1) 0.4s both;
  }
  @keyframes slideUpChar {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  .github-link {
    font-family: var(--font-en);
    display: inline-block;
    transform: translateY(0);
    transition: transform 0.2s ease-in-out;
    position: relative;
    overflow: hidden;
  }
  .github-link:hover {
    transform: translateY(2px);
  }
  .github-link::before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background-color: currentColor;
    transition: width 0.3s ease-in-out;
  }
  .github-link:hover::before {
    width: 100%;
  }
  .please-scroll::after {
    content: "";
    display: block;
    width: 0;
    border: 1px solid var(--clear-white);
    height: 50px;
    font-size: 1.5em;
    font-weight: var(--font-weight-bold);
    margin-top: 10px;
    transform: translateX(calc(var(--font-size-sm) / 2 - 1.7px));
  }
  @media (min-width: 768px) {
    .page-top {
      height: 95vh;
    }
    .pagetop-contents {
      gap: 30px;
      padding-top: calc(100vh / 5);
    }
    .please-scroll {
      bottom: 60px;
    }
    .please-scroll::after {
      height: 70px;
    }
  }
</style>
