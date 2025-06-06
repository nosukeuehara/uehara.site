<script lang="ts">
  import { link } from "svelte-spa-router";
  const sitemap = [
    { name: "私", link: "/me" },
    { name: "集", link: "/works" },
    { name: "言・こと", link: "/ramble" },
    { name: "伝", link: "/info" },
  ];
</script>

<div class="footer">
  <div class="names">
    <p class="name-kanji">上 / 原</p>
    <p class="name-kana">ue / hara</p>
  </div>
  <div class="account-container">
    <a class="mail" href="mailto:uehara.ryunosuke.06@gmail.com">
      uehara.ryunosuke.06@gmail.com
    </a>
    <a
      class="github"
      href="https://github.com/nosukeuehara"
      target="_blank"
      rel="noopener noreferrer"
    >
      GitHub
      <svg
        class="external-icon"
        xmlns="http://www.w3.org/2000/svg"
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M18 13v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
        <polyline points="15 3 21 3 21 9" />
        <line x1="10" y1="14" x2="21" y2="3" />
      </svg>
    </a>
  </div>
  <div class="footer-sitemap">
    <ul class="footer-sitemap-list">
      {#each sitemap as item}
        <li class="footer-sitemap-item">
          <a href={item.link} class="footer-sitemap-link" use:link
            >{item.name}</a
          >
        </li>
      {/each}
    </ul>
  </div>
</div>

<style>
  .footer {
    background-color: var(--fuzz-purple);
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 80px 0px;
  }
  .names {
    display: flex;
    flex-direction: column;
    align-items: center;
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
  .account-container {
    display: flex;
    padding-top: 20px;
    flex-direction: column;
    align-items: center;
    gap: 6px;
  }
  .account-container .mail,
  .github {
    font-size: var(--font-size-xs);
  }
  .mail {
    text-decoration: none;
  }
  .github {
    font-size: var(--font-size-xs);
    color: var(--clear-white);
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 4px;
  }
  .external-icon {
    width: 14px;
    height: 14px;
    stroke: currentColor;
    opacity: 0.8;
  }
  .footer-sitemap {
    margin-top: 60px;
    width: 150px;
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
