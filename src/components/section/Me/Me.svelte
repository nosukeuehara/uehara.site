<script lang="ts">
</script>

<section class="section-me section-style-base">
  <div class="section-me-contents">
    <div class="perSection-title perSection-title-base">
      <div class="blink-items">
        <span>_</span><span>_</span><span>_</span><span>_</span><span>_</span>
        <span>_</span><span>_</span><span>_</span><span>_</span><span>_</span>
        <span>_</span>
      </div>
      について
    </div>
  </div>
  <div class="about-me-block">
    <p>ウエハラリュウノスケ。二〇〇一年</p>
    <p>沖縄県宮古島市生まれ。東京都在住。</p>
    <p>ウェブエンジニア。</p>
    <p>ライブ。音楽鑑賞。ネットラジオ。料理。読書。</p>
    <p>
      ジャバスクリプト。タイプスクリプト。ノードジェイエス。リアクト。スベルト。ビュー。ネクスト。ワードプレス。ハブスポット。
    </p>
  </div>
</section>

<style>
  .section-me {
    background-color: var(--turquoise-fresh);
  }

  .section-me-contents {
    width: 1280px;
  }

  @media (max-width: 768px) {
    .section-me-contents {
      width: 100%;
      padding-bottom: 2.5rem;
    }

    .perSection-title {
      display: flex;
      align-items: flex-end;
      gap: 10px;
    }

    .blink-items {
      position: relative;
      top: 2px;
    }

    @keyframes blink {
      0%,
      100% {
        opacity: 1;
      }
      50% {
        opacity: 0;
      }
    }

    .blink-items span {
      display: inline-block;
      animation: blink 1s infinite;
    }

    .blink-items span:nth-child(1) {
      animation-delay: 0s;
    }
    .blink-items span:nth-child(2) {
      animation-delay: 0.2s;
    }
    .blink-items span:nth-child(3) {
      animation-delay: 0.4s;
    }
    .blink-items span:nth-child(4) {
      animation-delay: 0.1s;
    }
    .blink-items span:nth-child(5) {
      animation-delay: 0.3s;
    }
    .blink-items span:nth-child(6) {
      animation-delay: 0.5s;
    }
    .blink-items span:nth-child(7) {
      animation-delay: 0.15s;
    }
    .blink-items span:nth-child(8) {
      animation-delay: 0.35s;
    }
    .blink-items span:nth-child(9) {
      animation-delay: 0.25s;
    }
    .blink-items span:nth-child(10) {
      animation-delay: 0.05s;
    }
    .blink-items span:nth-child(11) {
      animation-delay: 0.45s;
    }
    .blink-items span:nth-child(12) {
      animation-delay: 0.3s;
    }
  }
</style>
