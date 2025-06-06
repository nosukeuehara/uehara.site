<script lang="ts">
  import { link } from "svelte-spa-router";
  import { sitemap } from "../../utils";
</script>

<div class="page-nav">
  <header class="header">
    <a class="home-text" href="/" use:link>上 / 原</a>
    <ul class="menu-nav">
      {#each sitemap as item}
        <li>
          <a href={item.link} class="menu-link" use:link>{item.name}</a>
        </li>
      {/each}
    </ul>
  </header>
</div>

<style>
  .page-nav {
    display: none;
  }
  @media (min-width: 1024px) {
    .page-nav {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100px;
      display: flex;
      padding: 0px 24px;
    }

    .header {
      display: flex;
      height: 100%;
      width: 1080px;
      margin: 0 auto;
      justify-content: space-between;
      align-items: flex-end;
    }

    .home-text {
      font-size: var(--font-size-xxl);
      font-weight: var(--font-weight-bold);
      margin: 0;
    }

    .menu-nav {
      display: flex;
      gap: 2rem;
    }

    .menu-link {
      font-size: var(--font-size-lg);
    }
  }
</style>
