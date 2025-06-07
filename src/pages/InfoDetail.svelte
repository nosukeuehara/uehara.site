<script lang="ts">
  import { fetchSpecificInfo } from "../service/api";
  import type { Info } from "../types/microcms";
  import { onMount } from "svelte";

  export let params: { id: string };

  let info: Info | null = null;
  let loading = true;
  let error: string | null = null;

  async function fetchInfo() {
    try {
      if (!params.id) throw new Error("IDが無効です");

      info = await fetchSpecificInfo(params.id);
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
    <img
      src={info.eyecatch.url}
      alt={info.title}
      width={info.eyecatch.width}
      height={info.eyecatch.height}
    />
    <div class="category"><p>{info.category.name}</p></div>
    <p><strong>説明:</strong> {info.description}</p>
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
  }

  img {
    width: 100%;
    height: auto;
    padding: 1.5rem 0;
  }

  strong {
    font-weight: var(--font-weight-bold);
  }

  .category {
    display: inline-block;
    font-size: var(--font-size-xs);
    padding-bottom: 1rem;
  }

  .body {
    padding-top: 2rem;
  }

  .body {
    padding-top: 2rem;
  }

  :global(.body h2) {
    font-size: 1.3rem;
    border-bottom: 1px solid var(--pine-forest);
    padding-bottom: 0.5rem;
  }

  :global(.body p) {
    padding: 1rem 0;
  }
</style>
