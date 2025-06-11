<script lang="ts">
  import { link } from "svelte-spa-router";

  let isMenuOpen = $state(false);

  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
  }

  function closeMenu() {
    isMenuOpen = false;
  }
</script>

<!-- SP表示版のヘッダーメニュー -->
<div>
  <header class="header">
    <a class="header__home-link" href="/" use:link>上 / 原</a>
    <button
      class="header__menu-btn"
      class:header__menu-btn--active={isMenuOpen}
      onclick={toggleMenu}
    >
      ＋
    </button>
  </header>

  <!-- フルスクリーンメニュー -->
  {#if isMenuOpen}
    <div
      class="menu"
      onclick={closeMenu}
      onkeydown={(e) => e.key === "Escape" && closeMenu()}
      role="dialog"
      aria-modal="true"
      tabindex="-1"
    >
      <div class="menu__content" tabindex="0" role="button">
        <nav class="menu__nav">
          <div class="menu__nav-item">
            <a class="menu__nav-link" href="/me" use:link onclick={closeMenu}
              >私</a
            >
          </div>

          <div class="menu__nav-item">
            <a class="menu__nav-link" href="/works" use:link onclick={closeMenu}
              >集</a
            >
          </div>

          <div class="menu__nav-item">
            <a
              class="menu__nav-link"
              href="/ramble"
              use:link
              onclick={closeMenu}>言・こと</a
            >
          </div>

          <div class="menu__nav-item">
            <a class="menu__nav-link" href="/info" use:link onclick={closeMenu}
              >報</a
            >
          </div>
        </nav>
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

  .header__home-link {
    font-size: var(--font-size-xl);
    font-weight: var(--font-weight-bold);
    margin: 0;
    color: inherit;
    text-decoration: none;
  }

  .header__menu-btn {
    font-size: var(--font-size-xl);
    font-weight: var(--font-weight-bold);
    transform: rotate(0deg);
    transition: transform 0.3s ease;
    background: none;
    border: none;
    cursor: pointer;
    color: inherit;
  }

  .header__menu-btn--active {
    transform: rotate(45deg);
  }

  .menu {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 900;
    background-color: var(--cactus-green);
    animation: menu-fade-in 0.3s ease;
  }

  .menu__content {
    animation: menu-slide-in 0.3s ease;
  }

  .menu__nav {
    position: relative;
    padding: 200px 1.5rem;
    height: 100vh;
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .menu__nav-item {
    border-bottom: 1px solid var(--clear-white);
    padding-bottom: 0.25rem;
  }

  .menu__nav-link {
    font-family: var(--font-en);
    color: var(--clear-white);
    font-size: 1.5em;
    display: block;
    text-decoration: none;
    transition: opacity 0.2s ease;
  }

  .menu__nav-link:hover {
    opacity: 0.8;
  }

  @media (min-width: 768px) {
    .header {
      display: none;
    }
  }
</style>
