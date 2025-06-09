<script lang="ts">
  import { fetchInfos } from "../service/api";
  import { link } from "svelte-spa-router";
</script>

<div class="info-list">
  {#await fetchInfos()}
    <p>loading...</p>
  {:then res}
    {#if res.length === 0}
      <p class="no-items">記事がありません</p>
    {:else}
      {#each res as article}
        <a class="info-item" href={`/info/${article.id}`} use:link>
          <img src={article.eyecatch.url} alt={"記事のサムネイル"} />
          <p class="pablished padding-y">
            {new Date(article.publishedAt).toLocaleDateString()}
          </p>
          <p class="category padding-y">#{article.category.name}</p>
          <h2 class="title padding-y">{article.title}</h2>
          <p class="description padding-y">{article.description}</p>
        </a>
      {/each}
    {/if}
  {:catch error}
    <p>記事の取得に失敗しました。: {error.message}</p>
  {/await}
</div>

<style>
  * {
    color: var(--pine-forest);
    box-sizing: border-box;
  }

  .padding-y {
    padding: 0 20px;
  }

  .info-list {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 24px;
    justify-items: center;
  }

  .info-item {
    display: grid;
    width: 100%;
    max-width: 400px;
    grid-template-rows: subgrid;
    grid-row: span 6;
    text-decoration: none;
    background-color: #ffffffad;
    gap: 8px;
    transition:
      transform 0.2s ease,
      box-shadow 0.2s ease;
  }

  .info-item img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    object-position: center;
  }

  .pablished {
    font-size: var(--font-size-sm);
    color: #666;
  }

  .category {
    font-size: var(--font-size-xs);
    color: #999;
  }

  .title {
    font-size: var(--font-size-md);
    font-weight: bold;
    color: var(--pine-forest);
    margin: 0;
  }

  .description {
    font-size: var(--font-size-xs);
    line-height: 1.5;
    color: #444;
    margin: 0;

    display: -webkit-box;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .no-items {
    text-align: center;
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-bold);
    grid-column: 1 / -1;
  }

  @media (min-width: 768px) {
    .info-list {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 24px;
      align-items: start;
    }
  }
</style>
