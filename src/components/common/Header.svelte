<script lang="ts">
  let isMenuOpen = false;
  const href = "/";

  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
  }

  function closeMenu() {
    isMenuOpen = false;
  }
</script>

<div>
  <header class="header">
    <a class="home-text" {href}>上 / 原</a>
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
            <a
              aria-disabled="true"
              class="menu-link disabled"
              href="/me"
              on:click={closeMenu}>私</a
            ><span class="coming-soon-label">近日公開</span>
          </div>

          <div>
            <a
              aria-disabled="true"
              class="menu-link disabled"
              href="/works"
              on:click={closeMenu}>集</a
            ><span class="coming-soon-label">近日公開</span>
          </div>

          <div>
            <a
              class="menu-link disabled"
              aria-disabled="true"
              href="/ramble"
              on:click={closeMenu}>言・こと</a
            >
            <span class="coming-soon-label">近日公開</span>
          </div>

          <div>
            <a
              class="menu-link disabled"
              aria-disabled="true"
              href="/ramble"
              on:click={closeMenu}>伝</a
            >
            <span class="coming-soon-label">近日公開</span>
          </div>
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
    font-size: var(--font-size-xl);
    font-weight: var(--font-weight-bold);
    transform: rotate(0deg);
    transition: transform 0.3s ease;
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
      padding: 0 24px;
      height: 75px;
      align-items: center;
      z-index: 999;
    }
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

  .menu-link.disabled {
    color: rgba(255, 255, 255, 0.5);
    pointer-events: none;
    cursor: default;
    text-decoration: none;
  }

  .coming-soon-label {
    display: inline-block;
    font-size: 0.9em;
    color: rgba(255, 255, 255, 0.7);
    margin-left: 8px;
    font-style: italic;
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
</style>
