<script lang="ts">
  const sitemap = [
    { name: "私", link: "/me" },
    { name: "集", link: "/works" },
    { name: "言・こと", link: "/ramble" },
    { name: "伝", link: "/info" },
  ];
</script>

<section class="footer section-style-base">
  <div class="names">
    <p class="name-kanji">上 / 原</p>
    <p class="name-kana">ue / hara</p>
  </div>
  <div class="footer-sitemap">
    <ul class="footer-sitemap-list">
      {#each sitemap as item}
        <li class="footer-sitemap-item disabled">
          <a href={item.link} class="footer-sitemap-link">{item.name}</a>
          <span class="coming-soon-label">近日公開</span>
        </li>
      {/each}
    </ul>
  </div>
</section>

<style>
  .footer {
    background-color: var(--fuzz-purple);
    color: var(--clear-white);
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 250px 0;
  }

  /* 名前セクション */
  .names {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
  }
  .names .name-kanji {
    font-size: var(--font-size-xl);
    font-weight: var(--font-weight-bold);
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--clear-white);
    transition: transform 0.3s ease;
  }
  .names .name-kana {
    font-family: var(--font-en);
    font-size: var(--font-size-md);
    color: var(--clear-white);
    font-weight: var(--font-weight-bold);
    letter-spacing: 1px;
  }

  /* サイトマップセクション */
  .footer-sitemap {
    margin-top: 20px;
  }
  .footer-sitemap-list {
    list-style: none;
    padding: 0;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: flex-start;
  }

  .footer-sitemap-link {
    font-size: 1.2em;
    color: var(--clear-white);
    text-decoration: none;
    transition:
      color 0.3s ease,
      transform 0.3s ease;
    display: inline-block;
  }
  .coming-soon-label {
    display: inline-block;
    font-size: 0.9em;
    color: rgba(255, 255, 255, 0.7);
    margin-left: 8px;
    font-style: italic;
  }
  .footer-sitemap-item.disabled {
    cursor: not-allowed;
    opacity: 0.6;
    text-decoration: none;
    pointer-events: none;
  }
  .footer-sitemap-item {
    width: 100%;
  }
  .footer-sitemap-item::after {
    content: "";
    display: block;
    height: 0px;
    width: 100%;
    margin: 3px 0 10px;
    border: 1px solid var(--clear-white);
  }
</style>
