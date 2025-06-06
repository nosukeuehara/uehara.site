<script lang="ts">
  import { link } from "svelte-spa-router";
  import { sitemap } from "../../utils";
</script>

<div class="nav-header">
  <ul class="nav">
    {#each sitemap as item}
      <li>
        <a href={item.link} class="menu-link" use:link>{item.name}</a>
      </li>
    {/each}
  </ul>
</div>

<style>
  @media (max-width: 768px) {
    .nav-header {
      display: none;
    }
  }

  .nav {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    margin: 0 auto 50px;
    max-width: 400px;
  }

  .nav li {
    padding-bottom: 0.2em;
    border-bottom: solid 2px;
  }

  .nav li a {
    display: block;
    width: 100%;
    transform: translateX(0);
    transition: transform 0.3s ease;
  }

  .nav li a:hover {
    transform: translateX(5px);
  }
</style>
