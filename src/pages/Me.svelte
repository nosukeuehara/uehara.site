<script lang="ts">
  import DefaultLayout from "./common/layout/DefaultLayout.svelte";
  import { createObserver } from "../lib/actions/createObserver";
  import { historyItems, skillGroups } from "../contentData/meItem";

  // IntersectionObserver のセットアップ
  let isProfileVisible = false;
  let isHistoryVisible = false;
  let isSkillSecTtlVisible = false;
  let isSkillsVisible = false;
  let visibleSkillGroups = Array(5).fill(false);

  const profileObserver = createObserver(
    (e) => (isProfileVisible = e.isIntersecting)
  );
  const historyObserver = createObserver(
    (e) => (isHistoryVisible = e.isIntersecting)
  );
  const skillSecTtlObserver = createObserver(
    (e) => (isSkillSecTtlVisible = e.isIntersecting)
  );
  const skillsObserver = createObserver(
    (e) => (isSkillsVisible = e.isIntersecting)
  );
  function skillGroupObserver(i: number) {
    return createObserver((e) => {
      visibleSkillGroups[i] = e.isIntersecting;
      visibleSkillGroups = [...visibleSkillGroups];
    });
  }
</script>

<DefaultLayout>
  <div class="me section-style-base">
    <div class="me__contents">
      <!-- profile -->
      <div
        class="me__profile"
        class:fade-in-up={isProfileVisible}
        use:profileObserver
      >
        <h2 class="me__name">上 原 龍 之 介</h2>
        <p class="me__job">frontend @ web</p>
      </div>

      <!-- history -->
      <div
        class="me__history"
        class:fade-in-up={isHistoryVisible}
        use:historyObserver
      >
        {#each historyItems as h}
          <p class="me__history-item">{h}</p>
        {/each}
      </div>

      <!-- skill section title -->
      <div
        class="me__skill-section-title"
        class:fade-in-up={isSkillSecTtlVisible}
        use:skillSecTtlObserver
      >
        スキル
      </div>

      <!-- skills -->
      <div
        class="me__skills"
        class:fade-in-up={isSkillsVisible}
        use:skillsObserver
      >
        {#each skillGroups as { title, items }, i}
          <div
            class="me__skill-group"
            class:slide-in-left={visibleSkillGroups[i]}
            use:skillGroupObserver(i)
          >
            <div class="me__skill-group-title">{title}</div>
            <div class="me__skills-group">
              {#each items as item}
                <p class="me__skills-group-item">{item}</p>
              {/each}
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
</DefaultLayout>

<style>
  .me * {
    color: var(--clear-white);
  }

  .me {
    background-color: var(--turquoise-fresh);
    min-height: 100vh;
    padding: 100px 24px;
  }

  .me__contents {
    width: 100%;
    margin: 0 auto;
  }

  .me__profile,
  .me__history,
  .me__skill-section-title,
  .me__skills,
  .me__skill-group {
    opacity: 0;
    transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .fade-in-up {
    opacity: 1;
    animation: fadeInUp 0.8s ease-out forwards;
  }

  .slide-in-left {
    opacity: 1;
    animation: slideInLeft 0.8s ease-out forwards;
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideInLeft {
    from {
      opacity: 0;
      transform: translateX(-50px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  .me__profile {
    display: flex;
    flex-direction: column;
    margin-bottom: 42px;
    position: relative;
  }
  .me__profile::after {
    content: "";
    display: block;
    height: 2px;
    width: 100%;
    margin-top: 8px;
    background-image: repeating-linear-gradient(
      to right,
      var(--clear-white),
      var(--clear-white) 10px,
      transparent 10px,
      transparent 20px
    );
  }

  .me__name {
    font-size: var(--font-size-lg);
    padding-bottom: 3px;
    margin: 0;
  }

  .me__job {
    font-family: var(--font-en);
    font-size: var(--font-size-md);
    font-weight: var(--font-weight-light);
    margin: 0;
  }

  .me__history {
    padding-bottom: 2rem;
  }

  .me__history-item {
    font-size: var(--font-size-sm);
    margin: 0;
  }

  .me__skill-section-title {
    font-family: var(--font-jp);
    font-size: var(--font-size-md);
    font-weight: var(--font-weight-thin);
    padding-bottom: 15px;
  }

  .me__skills {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .me__skill-group {
    width: 100%;
  }

  .me__skill-group-title {
    font-family: var(--font-jp);
    font-size: var(--font-size-sm);
    padding-bottom: 8px;
  }
  .me__skill-group-title::before {
    content: "✜";
    display: inline-block;
    font-size: var(--font-size-sm);
    padding-right: 3px;
  }

  .me__skills-group {
    display: flex;
    flex-wrap: wrap;
    padding-bottom: 27px;
    max-width: 253px;
    width: 100%;
    padding-left: calc(var(--font-size-sm) + 3px);
    column-gap: 8px;
  }

  .me__skills-group-item {
    font-family: var(--font-en);
    white-space: nowrap;
    margin: 0;
  }

  @media (min-width: 768px) {
    .me {
      padding: 190px 24px;
    }
    .me__contents {
      max-width: 1080px;
    }
    .me__name {
      font-size: var(--font-size-xl);
    }
    .me__job {
      font-size: var(--font-size-lg);
    }
    .me__history-item {
      font-size: var(--font-size-md);
    }
    .me__skill-section-title {
      font-size: var(--font-size-xl);
      padding-bottom: 19px;
    }
    .me__skill-group-title {
      font-size: var(--font-size-lg);
      padding-bottom: 16px;
    }
    .me__skill-group-title::before {
      font-size: var(--font-size-lg);
      padding-right: 11px;
    }
    .me__skills-group {
      padding-bottom: 48px;
      max-width: 100%;
      padding-left: calc(var(--font-size-lg) + 11px);
      column-gap: 16px;
    }
    .me__skills-group-item {
      font-size: var(--font-size-md);
    }
  }
</style>
