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
  <div class="page-top__navbar-wrapper" class:fade-in={isLoaded}>
    <Navbar />
  </div>

  <div class="page-top__contents">
    <div class="page-top__names" class:slide-up={isLoaded}>
      <p class="page-top__name-kanji">上 / 原</p>
      <p class="page-top__name-kana">ue / hara</p>
    </div>
    <div class="page-top__links" class:fade-in-delay={isLoaded}>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href={import.meta.env.VITE_GITHUB_REPO_URL}
        class="page-top__github-link"
      >
        GitHub
      </a>
    </div>
  </div>

  <div class="page-top__scroll-hint" class:float-animation={isLoaded}>下</div>
</section>

<style>
  .page-top {
    background-color: var(--cactus-green);
    height: 100vh;
    overflow: hidden;
    padding: 100px 0 0;
  }

  .page-top__navbar-wrapper,
  .page-top__names,
  .page-top__links,
  .page-top__scroll-hint {
    transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    opacity: 0;
  }

  .page-top__navbar-wrapper {
    transform: translateY(-20px);
  }

  .page-top__contents {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 50px;
    padding-top: calc(100vh / 3.5);
  }

  .page-top__names {
    transform: translateY(40px);
    display: flex;
    flex-direction: column;
    align-items: center;
    width: fit-content;
  }

  .page-top__name-kanji {
    font-size: 2em;
    font-weight: var(--font-weight-bold);
    animation: none;
  }

  .page-top__name-kana {
    font-family: var(--font-en);
    font-weight: var(--font-weight-bold);
    text-align: center;
    font-size: 1.3em;
    animation: none;
  }

  .page-top__links {
    transform: translateY(30px);
    transition-delay: 0.3s;
    display: flex;
    justify-content: center;
  }

  .page-top__github-link {
    font-family: var(--font-en);
    display: inline-block;
    position: relative;
    overflow: hidden;
    transform: translateY(0);
    transition: transform 0.2s ease-in-out;
    text-decoration: none;
  }

  .page-top__github-link:hover {
    transform: translateY(2px);
  }

  .page-top__github-link::before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background-color: currentColor;
    transition: width 0.3s ease-in-out;
  }

  .page-top__github-link:hover::before {
    width: 100%;
  }

  .page-top__scroll-hint {
    transform: translateX(-50%) translateY(20px);
    transition-delay: 0.6s;
    position: absolute;
    left: 50%;
    bottom: 0;
    background-color: transparent;
    color: var(--clear-white);
    font-family: var(--font-jp);
    text-align: center;
  }

  .page-top__scroll-hint::after {
    content: "";
    display: block;
    width: 0;
    border: 1px solid var(--clear-white);
    height: 50px;
    margin-top: 10px;
    transform: translateX(calc(var(--font-size-sm) / 2 - 1.7px));
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

  @media (min-width: 768px) {
    .page-top {
      height: 95vh;
    }
    .page-top__contents {
      gap: 30px;
      padding-top: calc(100vh / 5);
    }
    .page-top__scroll-hint {
      bottom: 60px;
    }
    .page-top__scroll-hint::after {
      height: 70px;
    }
  }
</style>
