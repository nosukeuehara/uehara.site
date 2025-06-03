<script lang="ts">
  import { onMount } from "svelte";
  import Navbar from "../../common/Navbar.svelte";

  let isLoaded = false;

  onMount(() => {
    setTimeout(() => {
      isLoaded = true;
    }, 100);
  });
</script>

<section class="page-top section-style-base">
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
      <a class="github-link" href="https://github.com/nosukeuehara">GitHub</a>
    </div>
  </div>

  <div class="please-scroll" class:float-animation={isLoaded}>下</div>
</section>

<style>
  .page-top {
    background-color: var(--cactus-green);
    min-height: 330px;
    overflow: hidden;
    padding: 100px 0px 0px;
  }

  @media (max-width: 768px) {
    .page-top {
      height: 100vh;
    }
  }

  .pagetop-contents {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    gap: 30px;
    padding-top: calc(100vh / 5);
  }

  @media (max-width: 768px) {
    .pagetop-contents {
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      padding-top: 50%;
      gap: 50px;
    }
  }

  /* アニメーション用の初期状態 */
  .navbar-wrapper {
    opacity: 0;
    transform: translateY(-20px);
    transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .names {
    opacity: 0;
    transform: translateY(40px);
    transition: all 1s cubic-bezier(0.4, 0, 0.2, 1);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    width: fit-content;
  }

  .links {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.3s;
    display: flex;
    justify-content: center;
  }

  .please-scroll {
    opacity: 0;
    transform: translateX(-50%) translateY(20px);
    transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.6s;
    position: relative;
    font-family: var(--font-jp);
    display: block;
    text-align: center;
    position: absolute;
    background-color: transparent;
    color: var(--clrear-white);
    left: 50%;
    bottom: 100px;
  }

  /* アニメーション後の状態 */
  .fade-in {
    opacity: 1;
    transform: translateY(0);
  }

  .slide-up {
    opacity: 1;
    transform: translateY(0);
  }

  .fade-in-delay {
    opacity: 1;
    transform: translateY(0);
  }

  .float-animation {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
    animation: float 3s ease-in-out infinite;
  }

  /* 浮遊アニメーション */
  @keyframes float {
    0%,
    100% {
      transform: translateX(-50%) translateY(0px);
    }
    50% {
      transform: translateX(-50%) translateY(-14px);
    }
  }

  /* 文字の個別アニメーション */
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
    font-weight: 600;
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

  /* GitHubリンクにホバーエフェクト追加 */
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
    transform: translateX(calc(var(--font-size-sm) / 2 - 2px));
  }

  @media (max-width: 768px) {
    .please-scroll {
      position: relative;
      font-family: var(--font-jp);
      display: block;
      text-align: center;
      position: absolute;
      background-color: transparent;
      color: var(--clrear-white);
      left: 50%;
      bottom: 0;
      transform: translateX(-50%) translateY(20px);
    }

    .float-animation {
      transform: translateX(-50%) translateY(0);
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
  }
</style>
