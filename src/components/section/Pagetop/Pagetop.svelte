<script lang="ts">
  import Navbar from "../../common/Navbar.svelte";
</script>

<section class="page-top section-height">
  <!-- max-width: 768px / none display -->
  <Navbar />
  <div class="pagetop-contents">
    <div class="names">
      <p class="name-kanji">上 / 原</p>
      <p class="name-kana">ue / hara</p>
    </div>
    <div class="links">
      <a class="github-link" href="https://github.com/nosukeuehara">GitHub</a>
    </div>
  </div>
  <div class="please-scroll">下</div>
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
  .names {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    width: fit-content;
  }
  .names .name-kanji {
    font-size: 2em;
    font-weight: var(--font-weight-bold);
  }
  .names .name-kana {
    font-family: var(--font-en);
    font-weight: 600;
    text-align: center;
    font-size: 1.3em;
  }
  .links {
    display: flex;
    justify-content: center;
  }
  .github-link {
    font-family: var(--font-en);
    display: inline-block;
    transform: translateY(0);
    transition: transform 0.2s ease-in-out;
  }
  .github-link:hover {
    transform: translateY(2px);
  }
  .please-scroll {
    display: none;
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
      transform: translateX(-50%);
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
  }
</style>
