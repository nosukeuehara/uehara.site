<script lang="ts">
  import { fetchInfos } from "../service/api";
  import { link } from "svelte-spa-router";
</script>

<div class="info-list">
  {#await fetchInfos()}
    <p class="info-list__no-items">loading...</p>
  {:then res}
    {#if res.length === 0}
      <p class="info-list__no-items">記事がありません</p>
    {:else}
      {#each res as article}
        <div class="info-list__item">
          <a href={`/info/${article.id}`} use:link>
            <img
              class="info-list__item-image"
              src={article.eyecatch.url}
              alt="記事のサムネイル"
            />
          </a>
          <p class="info-list__item-published">
            {new Date(article.publishedAt).toLocaleDateString()}
          </p>
          <p class="info-list__item-category">
            <a href={`/info/categories/${article.category.id}`} use:link>
              #{article.category.name}
            </a>
          </p>
          <a href={`/info/${article.id}`} use:link>
            <h2 class="info-list__item-title">{article.title}</h2>
            <p class="info-list__item-description">
              {article.description}
            </p>
          </a>
        </div>
      {/each}
    {/if}
  {:catch error}
    <p class="info-list__error">
      記事の取得に失敗しました。: {error.message}
    </p>
  {/await}
</div>

<style>
  .info-list * {
    color: var(--pine-forest);
    box-sizing: border-box;
  }

  .info-list {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 24px;
    justify-items: center;
  }

  .info-list__item {
    display: grid;
    width: 100%;
    max-width: 400px;
    grid-template-rows: subgrid;
    grid-row: span 4;
    text-decoration: none;
    background-color: #ffffffad;
    gap: 8px;
    padding-bottom: 8px;
    transition:
      transform 0.2s ease,
      box-shadow 0.2s ease;
  }

  .info-list__item-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
    object-position: center;
  }

  .info-list__item-published {
    font-size: var(--font-size-sm);
    color: #666;
    padding: 0 20px;
    margin: 0;
  }

  .info-list__item-category {
    font-size: var(--font-size-xs);
    color: #999;
    padding: 0 20px;
    margin: 0;
  }

  .info-list__item-title {
    font-size: var(--font-size-md);
    font-weight: bold;
    margin: 0;
    padding: 0 20px;
    color: var(--pine-forest);
  }

  .info-list__item-description {
    font-size: var(--font-size-xs);
    line-height: 1.5;
    color: #444;
    margin: 0;
    padding: 0 20px;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .info-list__no-items,
  .info-list__error {
    text-align: center;
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-regular);
    grid-column: 1 / -1;
    margin: 0;
  }

  @media (min-width: 768px) {
    .info-list {
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 24px;
      align-items: start;
    }
  }
</style>
