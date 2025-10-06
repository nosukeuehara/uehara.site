<script lang="ts">
  import { fetchInfoCategories } from "../service/api";

  interface Props {
    params: { categoryId: string };
  }
  let props: Props = $props();
</script>

<div class="info-category__tags">
  {#await fetchInfoCategories()}
    <p class="loading-text">カテゴリ読み込み中...</p>
  {:then categories}
    <div class="info-category__tags-inner">
      {#each categories as cat}
        <a
          href={`/info/categories/${cat.id}`}
         
          class="info-category__tag {props.params.categoryId === cat.id
            ? 'active'
            : ''}"
        >
          #{cat.name}
        </a>
      {/each}
    </div>
  {:catch e}
    <p>カテゴリの読み込みに失敗しました</p>
  {/await}
</div>

<style>
  .info-category__tags {
    text-align: center;
    margin-bottom: 2rem;
    color: var(--dark);
  }

  .info-category__tags-inner {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
  }

  .info-category__tag {
    font-size: var(--font-size-sm);
    color: var(--dark);
  }

  .loading-text {
    color: var(--dark);
  }
</style>
