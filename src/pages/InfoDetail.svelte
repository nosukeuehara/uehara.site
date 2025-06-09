<script lang="ts">
  import { fetchSpecificInfo } from "../service/api";
  import DefaultLayout from "../layout/DefaultLayout.svelte";
  import { link } from "svelte-spa-router";

  interface Props {
    params: {
      id: string;
    };
  }

  let props: Props = $props();
</script>

<DefaultLayout>
  <div class="info-detail">
    {#await fetchSpecificInfo(props.params.id)}
      <div class="loadingUI">
        <p>読み込み中...</p>
      </div>
    {:then info}
      <article>
        <h1>{info.title}</h1>
        <div class="category"><p>#{info.category.name}</p></div>
        <img
          src={info.eyecatch.url}
          alt={info.title}
          width={info.eyecatch.width}
          height={info.eyecatch.height}
        />
        <div class="body">{@html info.body}</div>
      </article>
      <a class="go-infos" href="/Info" use:link>
        <p>→ 報</p>
      </a>
    {:catch err}
      <p style="color:red;">
        {err instanceof Error ? err.message : String(err)}
      </p>
    {/await}
  </div>
</DefaultLayout>

<style>
  * {
    color: var(--pine-forest);
  }
  .loadingUI {
    height: 100vh;
    padding: 100px 24px 60px;
  }
  .go-infos {
    display: flex;
    justify-content: center;
    padding-top: 60px;
  }
  .info-detail {
    background-color: var(--sunshine-yellow);
    padding: 90px 24px 30px;
  }
  h1 {
    font-size: var(--font-size-lg);
    padding-bottom: 1rem;
  }

  img {
    max-width: 327px;
    width: 100%;
    height: auto;
    padding-top: 1.5rem;
    display: block;
    margin: 0 auto;
  }

  .category {
    display: inline-block;
    font-size: var(--font-size-xs);
  }

  :global(.body h2) {
    font-size: var(--font-size-lg);
    border-bottom: 1px solid var(--pine-forest);
    padding: 2rem 0 4px;
  }

  :global(.body h3) {
    font-size: var(--font-size-md);
    padding: 2rem 0 0;
  }
  :global(strong) {
    font-weight: var(--font-weight-bold);
  }

  :global(.body p) {
    padding: 0.5rem 0;
  }

  @media (min-width: 768px) {
    .info-detail {
      padding: 190px 24px 60px;
    }

    article,
    .loadingUI {
      max-width: 1080px;
      margin: 0 auto;
    }
  }
</style>
