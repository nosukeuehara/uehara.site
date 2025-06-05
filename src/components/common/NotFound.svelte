<script lang="ts">
  export let userData: { notFound?: boolean } = {};
</script>

<section class="notfound-container">
  <div class="notfound-content">
    <h1 class="notfound-title">404</h1>
    <p class="notfound-message">ページが見つかりません</p>
    {#if userData.notFound}
      <p class="notfound-detail">
        URLが間違っているか、ページが削除された可能性があります。
      </p>
    {/if}
    <a href="/" class="notfound-link">トップページに戻る</a>
  </div>
</section>

<style>
  .notfound-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 80vh;
    background-color: var(--tomato-red);
    padding: 2rem;
    position: absolute;
    height: 100vh;
    width: 100vw;
    z-index: 1000;
  }

  .notfound-content {
    text-align: center;
    background-color: var(--clear-white);
    padding: 3rem 2rem;
    border-radius: 1rem;
  }

  .notfound-title {
    font-size: 5rem;
    margin: 0;
    color: var(--tomato-red);
    font-weight: bold;
  }

  .notfound-message {
    font-size: 1.5rem;
    margin-top: 1rem;
    color: var(--dark);
  }

  .notfound-detail {
    margin-top: 0.5rem;
    font-size: 1rem;
    color: #666;
  }

  .notfound-link {
    display: inline-block;
    margin-top: 2rem;
    padding: 0.75rem 1.5rem;
    background-color: var(--tomato-red);
    color: var(--clear-white);
    text-decoration: none;
    border-radius: 0.5rem;
    transition: all 0.3s ease;
  }

  .notfound-link:hover {
    background-color: var(--crimson-wine);
  }
</style>
