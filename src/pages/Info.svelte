<script lang="ts">
  import DefaultLayout from "../layout/DefaultLayout.svelte";
  import Info from "../lib/Info.svelte";
</script>

<DefaultLayout>
  <div class="section-info section-style-base">
    <div class="section-info-contents">
      <div class="section-info-title-wrapper">
        <h2 class="section-info-title">報</h2>
        <p class="section-info-subtitle">info</p>
      </div>

      <div class="release-wrapper">
        <Info />
      </div>
    </div>
  </div>
</DefaultLayout>

<style>
  * {
    color: var(--pine-forest);
  }
  .section-info {
    background-color: var(--sunshine-yellow);
    min-height: 100vh;
  }
  .section-info-contents {
    width: 100%;
    margin: 0 auto;
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
  }
  .section-info-subtitle {
    font-size: var(--font-size-md);
  }

  .release-wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
    padding-bottom: 40px 0;
  }

  @media (min-width: 768px) {
    .section-info {
      padding: 190px 24px;
    }
    .section-info-contents {
      max-width: 1080px;
    }

    .section-info-title {
      font-size: var(--font-size-xl);
    }
    .section-info-subtitle {
      font-size: var(--font-size-lg);
    }
  }
</style>
