<script lang="ts">
  import { fetchInfos } from "../service/api";
  import { link } from "svelte-spa-router";
</script>

<div>
  {#await fetchInfos()}
    <p>loading...</p>
  {:then res}
    {#if res.length === 0}
      <p class="no-items">記事がありません</p>
    {:else}
      {#each res as article}
        <a href={`/info/${article.id}`} use:link>
          <img src={article.eyecatch.url} alt={"記事のサムネイル"} />
          <p class="pablished">
            {new Date(article.publishedAt).toLocaleDateString()}
          </p>
          <p class="category">#{article.category.name}</p>
          <h2 class="title">{article.title}</h2>
          <p class="description">{article.description}</p>
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
  }
  .no-items {
    text-align: center;
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-bold);
  }
  img {
    width: 100%;
    max-width: 400px;
  }
  .pablished {
    font-size: var(--font-size-sm);
  }
  .category {
    font-size: var(--font-size-xs);
  }
  h2.title {
    font-size: var(--font-size-md);
  }
  p.description {
    font-size: var(--font-size-xs);
  }
</style>
