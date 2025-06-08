<script lang="ts">
  import { fetchSpecificInfo } from "../service/api";
  import type { Info } from "../types/microcms";
  import { onMount } from "svelte";

  interface Props {
    params: {
      id: string;
    };
  }

  let props: Props = $props();
  let info: Info | null = $state(null);
  let loading = $state(true);
  let error: string | null = $state(null);

  async function fetchInfo() {
    try {
      if (!props.params.id) throw new Error("IDが無効です");

      info = await fetchSpecificInfo(props.params.id);
    } catch (err) {
      error = err instanceof Error ? err.message : String(err);
    } finally {
      loading = false;
    }
  }

  onMount(fetchInfo);
</script>

{#if loading}
  <p>読み込み中...</p>
{:else if error}
  <p style="color:red;">{error}</p>
{:else if info}
  <article class="info-detail">
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
{/if}

<style>
  * {
    color: var(--pine-forest);
  }
  article {
    background-color: var(--sunshine-yellow);
    padding: 100px 24px;
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
    font-size: 1.3rem;
    border-bottom: 1px solid var(--pine-forest);
    padding: 2rem 0 1rem;
  }

  :global(strong) {
    font-weight: var(--font-weight-bold);
  }

  :global(.body p) {
    padding: 1rem 0;
  }
</style>
