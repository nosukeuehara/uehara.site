<script lang="ts">
  import DefaultLayout from "./common/layout/DefaultLayout.svelte";
  import Info from "../lib/InfoContents.svelte";
</script>

<DefaultLayout>
  <div class="info section-style-base">
    <div class="info__contents">
      <div class="info__title-wrapper">
        <h2 class="info__title">報</h2>
        <p class="info__subtitle">info</p>
      </div>

      <div class="info__release-wrapper">
        <Info />
      </div>
    </div>
  </div>
</DefaultLayout>

<style>
  .info * {
    color: var(--pine-forest);
  }

  .info {
    background-color: var(--sunshine-yellow);
    min-height: 100vh;
  }

  .info__contents {
    width: 100%;
    margin: 0 auto;
  }

  .info__title-wrapper {
    margin-bottom: 42px;
  }

  .info__title-wrapper::after {
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

  .info__title {
    font-size: var(--font-size-lg);
    margin: 0;
  }

  .info__subtitle {
    font-size: var(--font-size-md);
    margin: 0;
  }

  .info__release-wrapper {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(100%, 1fr));
    padding-bottom: 40px;
  }

  @media (min-width: 768px) {
    .info {
      padding: 190px 24px;
    }

    .info__contents {
      max-width: 1080px;
    }

    .info__title {
      font-size: var(--font-size-xl);
    }

    .info__subtitle {
      font-size: var(--font-size-lg);
    }
  }
</style>
