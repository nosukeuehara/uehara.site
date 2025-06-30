<script lang="ts">
  import Latest3Infos from "../../../lib/LatesThreetInfoContents.svelte";
  import { link } from "svelte-spa-router";
</script>

<section class="section-info section-style-base">
  <div class="section-info__contents">
    <div class="section-info__title-wrapper">
      <h2 class="section-info__title">報</h2>
      <p class="section-info__subtitle">info</p>
    </div>

    <div class="section-info__info-wrapper">
      <Latest3Infos />
    </div>

    <a href="/Info" class="section-info__more-link" use:link>
      <p>→ 報</p>
    </a>
  </div>
</section>

<style>
  .section-info * {
    color: var(--pine-forest);
  }

  .section-info {
    background-color: var(--sunshine-yellow);
    min-height: 100vh;
    position: relative;
  }

  .section-info__contents {
    width: 100%;
    margin: 0 auto;
  }

  .section-info__title-wrapper {
    margin-bottom: 42px;
  }

  .section-info__title-wrapper * {
    line-height: 1;
  }

  .section-info__title-wrapper::after {
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

  .section-info__title {
    font-size: var(--font-size-lg);
    padding-bottom: 3px;
  }

  .section-info__subtitle {
    font-size: var(--font-size-md);
  }

  .section-info__info-wrapper {
    width: 100%;
    padding-bottom: 40px;
  }

  .section-info__more-link {
    display: flex;
    justify-content: flex-end;
    font-size: var(--font-size-xl);
    position: relative;
    padding-top: 80px;
    bottom: 0;
    right: 0;
    text-decoration: none;
  }

  .section-info__more-link p {
    font-size: var(--font-size-md);
    margin: 0;
  }

  @media (min-width: 768px) {
    .section-info__contents {
      max-width: 1080px;
    }
    .section-info__title {
      font-size: var(--font-size-xl);
      padding-bottom: 3px;
    }
    .section-info__subtitle {
      font-size: var(--font-size-lg);
    }
  }
</style>
