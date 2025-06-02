<script lang="ts">
</script>

<section class="section-me section-style-base">
  <div class="section-me-contents">
    <div class="">
      <p class="name">上 原 龍 之 介</p>
      <p class="job">web enginner</p>
    </div>
    <div class="">
      <p>二〇〇一年生まれ</p>
      <p>宮古島出身</p>
      <p>東京都在住</p>
      <p>ウェブエンジニアをしている</p>
    </div>
    <div class="section-textarea2">
      <p>ライブ</p>
      <p>音楽</p>
      <p>ネットラジオ</p>
      <p>料理</p>
      <p>読書</p>
      <p>JavaScript</p>
      <p>TypeScript</p>
      <p>Node.js</p>
      <p>React</p>
      <p>Svelte</p>
      <p>Vue</p>
      <p>Next.js</p>
      <p>CSS Modules</p>
      <p>Tailwind CSS</p>
      <p>Material-UI</p>
      <p>WordPress</p>
      <p>HubSpot</p>
    </div>
  </div>
</section>

<style>
  .section-me {
    background-color: var(--turquoise-fresh);
  }

  @media (max-width: 768px) {
    .section-textarea-rightEnd {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      padding-bottom: 0.5rem;
    }
    .section-textarea-leftEnd {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
    }
    .textDirection-colum {
      width: 100%;
      writing-mode: vertical-rl;
      display: flex;
      flex-direction: column;
      gap: 5px;
    }
    .name {
      font-size: var(--font-size-md);
    }
    .job {
      font-family: var(--font-en);
      font-size: var(--font-size-md);
      font-weight: var(--font-weight-light);
    }
    .birth {
      font-size: var(--font-size-sm);
    }
  }
</style>
