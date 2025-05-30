<script lang="ts">
</script>

<section class="section-me section-style-base">
  <div class="section-me-contents">
    <div class="perSection-title perSection-title-base">
      <p class="name">上 原 龍 之 介</p>
    </div>
    <p class="birth">二〇〇一年</p>
    <p class="from">沖縄県宮古島市出身</p>
    <p>東京都在住</p>
  </div>

  <!-- 
  <p>ウェブエンジニア。</p>
  <p>ライブ。音楽。ネットラジオ。料理。読書。</p>
  <p>
    JavaScript。TypeScript。Node.js。React。Svelte。Vue。Next。CSSModules。TailWind。MatineUI。WordPress。Hubspot。
  </p> -->
</section>

<style>
  .section-me {
    background-color: var(--turquoise-fresh);
    position: relative;
  }

  @media (max-width: 768px) {
    .perSection-title {
      display: flex;
      flex-direction: column;
      padding-bottom: 1rem;
      gap: 10px;
    }
    .name {
      font-size: var(--font-size-lg);
    }
    .birth {
      font-size: var(--font-size-sm);
    }
    .from {
    }
  }
</style>
