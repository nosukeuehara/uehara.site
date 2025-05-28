<script lang="ts">
</script>

<div class="nav-header">
  <nav class="nav">
    <a href="/me">
      <p>Me</p>
    </a>
    <a href="/works">
      <p>Works</p>
    </a>
    <a href="/contact">
      <p>Ramble</p>
    </a>
    <a href="/">
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

  .nav a p:hover {
    text-align: end;
  }
</style>
