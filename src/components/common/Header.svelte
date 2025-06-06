<script lang="ts">
  import { link } from "svelte-spa-router";

  let isMenuOpen = false;

  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
  }

  function closeMenu() {
    isMenuOpen = false;
  }
</script>

<div>
  <header class="header">
    <a class="home-text" href="/" use:link>上 / 原</a>
    <button
      class="header-btn"
      class:header-btn--clicked={isMenuOpen}
      on:click={toggleMenu}
    >
      ＋
    </button>
  </header>

  <!-- フルスクリーンメニュー -->
  {#if isMenuOpen}
    <div
      class="fullscreen-menu"
      on:click={closeMenu}
      on:keydown={(e) => e.key === "Escape" && closeMenu()}
      role="dialog"
      aria-modal="true"
      tabindex="-1"
    >
      <div
        class="menu-content"
        tabindex="0"
        role="button"
        on:click|stopPropagation
        on:keydown|stopPropagation
      >
        <div class="menu-nav">
          <div>
            <a class="menu-link" href="/me" use:link on:click={closeMenu}>私</a>
          </div>

          <div>
            <a class="menu-link" href="/works" use:link on:click={closeMenu}
              >集</a
            >
          </div>

          <div>
            <a class="menu-link" href="/ramble" use:link on:click={closeMenu}
              >言・こと</a
            >
          </div>

          <div>
            <a class="menu-link" href="/info" use:link on:click={closeMenu}
              >伝</a
            >
          </div>
        </div>
      </div>
    </div>
  {/if}
</div>

<style>
  .header {
    position: fixed;
    width: 100%;
    top: 0;
    background-color: transparent;
    display: flex;
    justify-content: space-between;
    padding: 0 24px;
    height: 75px;
    align-items: center;
    z-index: 999;
  }

  .header-btn {
    font-size: var(--font-size-xl);
    font-weight: var(--font-weight-bold);
    transform: rotate(0deg);
    transition: transform 0.3s ease;
  }

  .header-btn--clicked {
    transform: rotate(45deg);
  }

  .home-text {
    font-size: var(--font-size-xl);
    font-weight: var(--font-weight-bold);
    margin: 0;
  }

  .fullscreen-menu {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 900;
    background-color: var(--cactus-green);
    animation: fadeIn 0.3s ease;
  }

  .menu-content {
    animation: slideIn 0.3s ease;
  }

  .menu-nav {
    position: relative;
    padding: 200px 1.5rem;
    height: 100vh;
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .menu-nav a {
    font-family: var(--font-en);
    color: var(--clear-white);
    font-size: 1.5em;
    display: block;
  }

  .menu-nav div {
    border-bottom: 1px solid var(--clear-white);
    padding-bottom: 0.25rem;
  }

  .menu-link {
    color: var(--clear-white);
    text-decoration: none;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes slideIn {
    from {
      transform: translateY(-30px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @media (min-width: 1024px) {
    .header {
      display: none;
    }
  }
</style>
