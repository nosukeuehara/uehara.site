<script lang="ts">
  import { fetchInfoByCategoryId } from "../service/api";
  import DefaultLayout from "./common/layout/DefaultLayout.svelte";
  import { link } from "svelte-spa-router";
  import Categories from "../lib/Categories.svelte";

  interface Props {
    params: { categoryId: string };
  }
  let props: Props = $props();
</script>

<DefaultLayout>
  <div class="info-category">
    {#await fetchInfoByCategoryId(props.params.categoryId)}
      <div class="info-category__loading">
        <p class="info-category__loading-text">読み込み中...</p>
      </div>
    {:then articles}
      {#if articles.length === 0}
        <p class="info-category__no-items">記事が見つかりませんでした。</p>
      {:else}
        <h2 class="info-category__title">
          「{articles[0].category.name}」 の記事一覧
        </h2>
        <Categories params={props.params} />
        <div class="info-category__list">
          {#each articles as article}
            <div class="info-list__item">
              <img
                class="info-list__item-image"
                src={article.eyecatch.url}
                alt="記事のサムネイル"
              />
              <p class="info-list__item-published">
                {new Date(article.publishedAt).toLocaleDateString()}
              </p>
              <a href={`/info/${article.id}`} use:link>
                <h2 class="info-list__item-title">{article.title}</h2>
                <p class="info-list__item-description">
                  {article.description}
                </p>
              </a>
            </div>
          {/each}
        </div>
      {/if}
      <a class="info-category__back-link" href="/info" use:link>
        記事一覧へ戻る
      </a>
    {:catch err}
      <p class="info-category__error">
        {err instanceof Error ? err.message : String(err)}
      </p>
    {/await}
  </div>
</DefaultLayout>

<style>
  .info-category {
    background-color: var(--sunshine-yellow);
    padding: 120px 24px;
  }

  .info-category__title {
    text-align: center;
    font-size: var(--font-size-lg);
    color: var(--dark);
    margin-bottom: 10px;
  }

  .info-category__list {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 24px;
    justify-items: center;
    max-width: 1080px;
    margin: 0 auto;
  }

  .info-category__loading,
  .info-category__no-items,
  .info-category__error {
    text-align: center;
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-bold);
    margin-top: 60px;
  }

  .info-category__back-link {
    display: block;
    margin-top: 48px;
    text-align: center;
    font-size: var(--font-size-sm);
    color: var(--dark);
  }

  .info-category__back-link::before {
    content: "← ";
  }

  .info-list__item {
    display: grid;
    width: 100%;
    max-width: 400px;
    grid-template-rows: subgrid;
    grid-row: span 3;
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

  .info-category__loading-text {
    color: var(--dark);
    font-weight: var(--font-weight-regular);
  }

  @media (min-width: 768px) {
    .info-category__list {
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    }
  }
</style>
