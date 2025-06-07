<script lang="ts">
  import Info from "../../../lib/Info.svelte";
</script>

<section class="section-info section-style-base">
  <div class="section-info-contents">
    <div class="section-info-title-wrapper">
      <h2 class="section-info-title">伝</h2>
      <p class="section-info-subtitle">info</p>
    </div>

    <div class="release-soon-wrapper">
      <Info />
    </div>
  </div>
</section>

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

  .release-soon-wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 40px 0;
  }

  @media (min-width: 768px) {
    .section-info-contents {
      max-width: 1080px;
    }
  }
</style>
