<script lang="ts">
  import { link } from "svelte-spa-router";
</script>

<div class="nav-header">
  <nav class="nav">
    <a href="/me" use:link>
      <p>Me</p>
    </a>
    <a href="/works" use:link>
      <p>Works</p>
    </a>
    <a href="/ramble" use:link>
      <p>Ramble</p>
    </a>
    <a href="/info" use:link>
      <p>Info</p>
    </a>
  </nav>
</div>

<style>
  @media (max-width: 768px) {
    .nav-header {
      display: none;
    }
  }

  .nav {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    margin: 0 auto 50px;
    max-width: 400px;
  }

  .nav a {
    padding-bottom: 0.2em;
    border-bottom: solid 2px;
  }

  .nav a p {
    transform: translateX(0);
    transition: transform 0.3s ease;
  }

  .nav a p:hover {
    transform: translateX(5px);
  }
</style>
