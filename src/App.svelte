<script lang="ts">
  import Footer from "./components/common/Footer.svelte";
  import Header from "./components/common/Header.svelte";
  import Navbar from "./components/common/Navbar.svelte";
  import Info from "./components/secsion/Info/Info.svelte";
  import Me from "./components/secsion/Me/Me.svelte";
  import Ramble from "./components/secsion/Ramble/Ramble.svelte";
  import Works from "./components/secsion/Works/Works.svelte";
</script>

<main>
  <Header />
  <section class="page-top section-height">
    <!-- max-width: 768px / none display -->
    <Navbar />
    <div class="names">
      <p class="name-kanji">上 / 原</p>
      <p class="name-kana">ue / hara</p>
    </div>
    <div class="links">
      <a class="github-link" href="https://github.com/nosukeuehara">GitHub</a>
    </div>
  </section>
  <Me />
  <Works />
  <Ramble />
  <Info />
  <Footer />
</main>

<style>
  .page-top {
    background-color: var(--cactus-green);
    display: flex;
    flex-direction: column;
    gap: 3rem;
  }
  @media (max-width: 768px) {
    .page-top {
      padding-top: 10rem;
    }
  }
  .names {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    margin: 0 auto;
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
    margin: 0 auto;
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
</style>
