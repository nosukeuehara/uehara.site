<script lang="ts">
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
    <p>上 / 原</p>
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
          <div><a href="/works" on:click={closeMenu}>わあくす</a></div>
          <div><a href="/ramble" on:click={closeMenu}>言・こと</a></div>
          <div><a href="/info" on:click={closeMenu}>しらせ</a></div>
        </div>
      </div>
    </div>
  {/if}
</div>

<style>
  .header {
    display: none;
  }

  .header-btn {
    font-size: 2em;
    font-weight: var(--font-weight-bold);
    transform: rotate(0deg);
    transition: transform 0.3s ease;
    background: none;
    border: none;
    cursor: pointer;
    color: inherit;
  }

  .header-btn--clicked {
    transform: rotate(45deg);
  }

  @media (max-width: 768px) {
    .header {
      position: fixed;
      width: 100%;
      top: 0;
      background-color: transparent;
      display: flex;
      justify-content: space-between;
      padding: 0 1.5rem;
      height: 100px;
      align-items: center;
      z-index: 999;
    }
  }

  p {
    font-size: 2em;
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
    display: flex;
    justify-content: center;
    align-items: center;
    animation: fadeIn 0.3s ease;
  }

  .menu-content {
    padding-left: 1rem;
    width: 100vw;
    animation: slideIn 0.3s ease;
  }

  .menu-nav {
    display: flex;
    flex-direction: column;
    list-style: none;
    gap: 1.7rem;
    padding: 0;
    margin: 0;
  }

  .menu-nav a {
    font-family: var(--font-jp);
    color: var(--clear-white);
    font-size: 1.5em;
    display: block;
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

  /* メニューが開いている時にスクロールを無効化 */
  :global(body.menu-open) {
    overflow: hidden;
  }
</style>
