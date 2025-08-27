<script lang="ts">
  import { sitemap } from "../../utils";
</script>

<div class="nav-header">
  <ul class="nav-header__list">
    {#each sitemap as item}
      <li class="nav-header__item">
        <a href={item.link} class="nav-header__link">
          {item.name}
        </a>
      </li>
    {/each}
  </ul>
</div>

<style>
  .nav-header__list {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    margin: 0 auto 50px;
    max-width: 400px;
  }

  .nav-header__item {
    padding-bottom: 0.2em;
    border-bottom: solid 2px;
  }

  .nav-header__link {
    display: block;
    width: 100%;
    transform: translateX(0);
    transition: transform 0.3s ease;
  }

  .nav-header__link:hover {
    transform: translateX(5px);
  }

  @media (max-width: 768px) {
    .nav-header {
      display: none;
    }
  }
</style>
