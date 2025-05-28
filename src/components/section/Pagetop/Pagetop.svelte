<script lang="ts">
  import Navbar from "../../common/Navbar.svelte";
</script>

<div>
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
    <div class="please-down">
      <p class="please-down--text">下</p>
      <div></div>
    </div>
  </section>
</div>

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
    gap: calc(100vh / 3);
    padding-top: calc(100vh / 5);
  }
  @media (max-width: 768px) {
    .pagetop-contents {
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      padding: 50% 0 90%;
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
  .please-down {
    font-family: var(--font-jp);
    font-size: var(--font-size-sm);
    text-align: center;
  }

  .please-down--text {
    padding-bottom: 1rem;
  }
  .please-down::after {
    content: "";
    display: block;
    width: 0px;
    height: 40px;
    border: 1px solid var(--clear-white);
    margin: 0 auto;
    /* animation: growLine 2s ease-in-out infinite; */
  }
  /* 
  @keyframes growLine {
    0% {
      height: 0px;
      opacity: 0;
      top: 0;
    }
    50% {
      height: 20px;
      opacity: 0.5;
      top: 20px;
    }
    100% {
      height: 40px;
      opacity: 1;
    }
  } */
</style>
