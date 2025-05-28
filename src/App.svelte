<script lang="ts">
  import Navbar from "./components/common/Navbar.svelte";
  import Info from "./components/secsion/Info/Info.svelte";
  import Me from "./components/secsion/Me/Me.svelte";
  import Ramble from "./components/secsion/Ramble/Ramble.svelte";
  import Works from "./components/secsion/Works/Works.svelte";
</script>

<main>
  <section class="page-top">
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
</main>

<style>
  .page-top {
    background-color: var(--cactus-green);
    height: 95vh;
    padding: 3rem;
    display: flex;
    flex-direction: column;
    gap: 3rem;
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
    font-family: "Outfit";
    font-weight: 600;
    text-align: center;
    font-size: 1.3em;
  }
  .links {
    margin: 0 auto;
    font-family: "Outfit";
  }
  .github-link {
    display: inline-block;
    transform: translateY(0);
    transition: transform 0.2s ease-in-out;
  }
  .github-link:hover {
    transform: translateY(2px);
  }
</style>
