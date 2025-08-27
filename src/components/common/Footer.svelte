<script lang="ts">
  import { link } from "svelte-spa-router";
  import { sitemap } from "../../utils";
  const userEmail = "uehara.ryunosuke.06@gmail.com";
  const copyRight = "© 2026 上 / 原. All rights reserved.";
</script>

<div class="footer">
  <div class="footer__names">
    <p class="footer__name footer__name--kanji">上 / 原</p>
    <p class="footer__name footer__name--kana">ue / hara</p>
  </div>
  <div class="footer__account">
    <a
      class="footer__link footer__link--mail"
      href={`mailto:${import.meta.env.VITE_EMAIL_ADD}`}
    >
      {userEmail}
    </a>
    <a
      class="footer__link footer__link--github"
      href={import.meta.env.VITE_GITHUB_REPO_URL}
      target="_blank"
      rel="noopener noreferrer"
    >
      GitHub
      <svg
        class="footer__icon"
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
  <div class="footer__sitemap">
    <ul class="footer__sitemap-list">
      {#each sitemap as item}
        <li class="footer__sitemap-item">
          <a href={item.link} class="footer__sitemap-link" use:link
            >{item.name}</a
          >
        </li>
      {/each}
    </ul>
  </div>

  <div class="copy-right">{copyRight}</div>
</div>

<style>
  .footer {
    background-color: var(--fuzz-purple);
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 80px;
  }

  .footer__names {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .footer__name {
    color: var(--clear-white);
    font-weight: var(--font-weight-bold);
  }

  .footer__name--kanji {
    font-size: var(--font-size-xl);
    letter-spacing: 2px;
    text-transform: uppercase;
    transition: transform 0.3s ease;
  }

  .footer__name--kana {
    font-family: var(--font-en);
    font-size: var(--font-size-md);
    letter-spacing: 1px;
  }

  .footer__account {
    display: flex;
    padding-top: 20px;
    flex-direction: column;
    align-items: center;
    gap: 6px;
  }

  .footer__link {
    font-size: var(--font-size-xs);
    color: var(--clear-white);
    text-decoration: none;
  }

  .footer__link--github {
    display: inline-flex;
    align-items: center;
    gap: 4px;
  }

  .footer__icon {
    width: 14px;
    height: 14px;
    stroke: currentColor;
    opacity: 0.8;
  }

  .footer__sitemap {
    margin-top: 60px;
    width: 150px;
  }

  .footer__sitemap-list {
    list-style: none;
    padding: 0;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: flex-start;
  }

  .footer__sitemap-item {
    width: 100%;
  }

  .footer__sitemap-item::after {
    content: "";
    display: block;
    height: 0px;
    width: 100%;
    margin: 3px 0 10px;
    border: 1px solid var(--clear-white);
  }

  .footer__sitemap-link {
    font-size: 1.2em;
    color: var(--clear-white);
    text-decoration: none;
    transition:
      color 0.3s ease,
      transform 0.3s ease;
    display: block;
    width: 100%;
    transform: translateX(0);
  }

  .footer__sitemap-link:hover {
    transform: translateX(5px);
  }

  .copy-right {
    font-size: var(--font-size-xs);
    color: var(--clear-white);
    text-align: center;
    padding: 80px 0px 20px;
  }
</style>
