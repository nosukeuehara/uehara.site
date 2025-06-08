<script lang="ts">
  import { onMount } from "svelte";
  import { fetchInfos } from "../service/api";
  import { link } from "svelte-spa-router";
  import type { Info } from "../types/microcms";
  let articles: Array<Info> = [];

  onMount(async () => {
    const res = await fetchInfos();
    articles = res;
  });
</script>

<div>
  {#each articles as article}
    <a href={`/info/${article.id}`} use:link>
      <img src={article.eyecatch.url} alt={"サイト「上 / 原」 の画像"} />
      <p>{new Date(article.publishedAt).toLocaleDateString()}</p>
      <p>{article.category.name}</p>
      <h2>{article.title}</h2>
      <p>{article.description}</p>
    </a>
  {/each}
</div>

<style>
  * {
    color: var(--pine-forest);
  }
  img {
    width: 100%;
    max-width: 400px;
  }
</style>
