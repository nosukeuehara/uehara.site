<script lang="ts">
  import Info from "../../../lib/Info.svelte";
  import { link } from "svelte-spa-router";
</script>

<section class="section-info section-style-base">
  <div class="section-info-contents">
    <div class="section-info-title-wrapper">
      <h2 class="section-info-title">報</h2>
      <p class="section-info-subtitle">info</p>
    </div>

    <div class="info-wrapper">
      <Info />
    </div>
  </div>
  <a class="go-infos" href="/Info" use:link>
    <p>→ 報</p>
  </a>
</section>

<style>
  * {
    color: var(--pine-forest);
  }
  .go-infos {
    display: flex;
    justify-content: flex-end;
    font-size: var(--font-size-xl);
    position: absolute;
    bottom: 45px;
    right: 24px;
  }
  .go-infos p {
    font-size: var(--font-size-md);
  }
  .section-info {
    background-color: var(--sunshine-yellow);
    min-height: 100vh;
    position: relative;
  }
  .section-info-contents {
    width: 100%;
    margin: 0 auto;
  }
  .section-info-title-wrapper * {
    line-height: 1;
  }
  .section-info-title-wrapper {
    margin-bottom: 42px;
  }
  .section-info-title-wrapper::after {
    content: "";
    display: block;
    height: 2px;
    width: 100%;
    margin-top: 8px;
    background-image: repeating-linear-gradient(
      to right,
      var(--pine-forest),
      var(--pine-forest) 10px,
      transparent 10px,
      transparent 20px
    );
  }
  .section-info-title {
    font-size: var(--font-size-lg);
    padding-bottom: 3px;
  }
  .section-info-subtitle {
    font-size: var(--font-size-md);
  }

  .info-wrapper {
    width: 100%;
    padding-bottom: 40px;
  }

  @media (min-width: 768px) {
    .section-info-contents {
      max-width: 1080px;
    }
    .section-info-title {
      font-size: var(--font-size-xl);
      padding-bottom: 3px;
    }
    .section-info-subtitle {
      font-size: var(--font-size-lg);
    }
  }
</style>
