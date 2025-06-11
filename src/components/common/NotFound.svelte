<script lang="ts">
</script>

<section class="notfound">
  <div class="notfound__content">
    <h1 class="notfound__title">404</h1>
    <p class="notfound__message">ページが見つかりません</p>
    <a href="/" class="notfound__link">トップページに戻る</a>
  </div>
</section>

<style>
  .notfound {
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

  .notfound__content {
    text-align: center;
    background-color: var(--clear-white);
    padding: 3rem 2rem;
    border-radius: 1rem;
  }

  .notfound__title {
    font-size: 5rem;
    margin: 0;
    color: var(--tomato-red);
    font-weight: bold;
  }

  .notfound__message {
    font-size: 1.5rem;
    margin-top: 1rem;
    color: var(--dark);
  }

  .notfound__link {
    display: inline-block;
    margin-top: 2rem;
    padding: 0.75rem 1.5rem;
    background-color: var(--tomato-red);
    color: var(--clear-white);
    text-decoration: none;
    border-radius: 0.5rem;
    transition: all 0.3s ease;
  }

  .notfound__link:hover {
    background-color: var(--crimson-wine);
  }
</style>
