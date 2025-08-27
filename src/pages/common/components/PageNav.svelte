<script lang="ts">
  import { sitemap } from "../../../utils";
</script>

<!-- PC表示版のページ内ナビゲーションヘッダー -->
<nav class="page-nav">
  <header class="page-nav__header">
    <a class="page-nav__brand" href="/">上 / 原</a>
    <ul class="page-nav__menu">
      {#each sitemap as item}
        <li class="page-nav__menu-item">
          <a href={item.link} class="page-nav__menu-link">
            {item.name}
          </a>
        </li>
      {/each}
    </ul>
  </header>
</nav>

<style>
  .page-nav {
    display: none;
  }

  @media (min-width: 768px) {
    .page-nav {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100px;
      display: flex;
      padding: 0 24px;
    }

    .page-nav__header {
      display: flex;
      width: 1080px;
      margin: 0 auto;
      height: 100%;
      justify-content: space-between;
      align-items: flex-end;
    }

    .page-nav__brand {
      font-size: var(--font-size-xxl);
      font-weight: var(--font-weight-bold);
      margin: 0;
      text-decoration: none;
    }

    .page-nav__menu {
      display: flex;
      gap: 50px;
      list-style: none;
      margin: 0;
      padding: 0;
    }

    .page-nav__menu-link {
      font-size: var(--font-size-md);
      display: block;
      width: 100%;
      text-decoration: none;
    }
  }
</style>
