<script lang="ts">
  import { fetchSpecificInfo } from "../service/api";
  import DefaultLayout from "./common/layout/DefaultLayout.svelte";
  import { link } from "svelte-spa-router";

  interface Props {
    params: { id: string };
  }
  let props: Props = $props();
</script>

<DefaultLayout>
  <div class="info-detail">
    {#await fetchSpecificInfo(props.params.id)}
      <div class="info-detail__loading">
        <p class="info-detail__loading-text">読み込み中...</p>
      </div>
    {:then info}
      <article class="info-detail__article">
        <h1 class="info-detail__title">{info.title}</h1>
        <div class="info-detail__category">
          <p class="info-detail__category-text">#{info.category.name}</p>
        </div>
        <img
          class="info-detail__image"
          src={info.eyecatch.url}
          alt={info.title}
          width={info.eyecatch.width}
          height={info.eyecatch.height}
        />
        <div class="info-detail__body">
          {@html info.body}
        </div>
      </article>
      <a class="info-detail__back-link" href="/Info" use:link>
        <p class="info-detail__back-link-text">→ 報</p>
      </a>
    {:catch err}
      <p class="info-detail__error">
        {err instanceof Error ? err.message : String(err)}
      </p>
    {/await}
  </div>
</DefaultLayout>

<style>
  .info-detail * {
    color: var(--pine-forest);
    box-sizing: border-box;
  }

  .info-detail {
    background-color: var(--sunshine-yellow);
    padding: 90px 24px 30px;
  }

  .info-detail__loading {
    height: 100vh;
    padding: 100px 24px 60px;
  }
  .info-detail__loading-text {
    margin: 0;
  }

  .info-detail__article {
    max-width: 1080px;
    margin: 0 auto;
  }

  .info-detail__title {
    font-size: var(--font-size-lg);
    padding-bottom: 1rem;
    margin: 0;
  }

  .info-detail__category {
    display: inline-block;
    font-size: var(--font-size-xs);
  }
  .info-detail__category-text {
    margin: 0;
  }

  .info-detail__image {
    max-width: 327px;
    width: 100%;
    height: auto;
    padding-top: 1.5rem;
    display: block;
    margin: 0 auto;
  }

  .info-detail__back-link {
    display: flex;
    justify-content: center;
    padding-top: 60px;
    text-decoration: none;
  }
  .info-detail__back-link-text {
    margin: 0;
  }

  .info-detail__error {
    color: red;
    text-align: center;
  }

  .info-detail__body :global(h2),
  .info-detail__body :global(h3),
  .info-detail__body :global(strong),
  .info-detail__body :global(p) {
    margin: 0;
  }

  .info-detail__body :global(h2) {
    font-size: var(--font-size-lg);
    border-bottom: 1px solid var(--pine-forest);
    padding: 2rem 0 4px;
  }

  .info-detail__body :global(h3) {
    font-size: var(--font-size-md);
    padding: 2rem 0 0;
  }

  .info-detail__body :global(strong) {
    font-weight: var(--font-weight-bold);
  }

  .info-detail__body :global(p) {
    padding: 0.5rem 0;
  }

  @media (min-width: 768px) {
    .info-detail {
      padding: 190px 24px 60px;
    }
    .info-detail__article,
    .info-detail__loading {
      max-width: 1080px;
      margin: 0 auto;
    }
  }
</style>
