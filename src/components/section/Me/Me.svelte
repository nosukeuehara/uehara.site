<script lang="ts">
  import { createObserver } from "../../../lib/actions/createObserver";
  import { historyItems, skillGroups } from "../../../contentData/meItem";

  // IntersectionObserver の設定はそのまま
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

<section class="section-me section-style-base">
  <div class="section-me__contents">
    <!-- プロフィール -->
    <div
      class="section-me__profile"
      class:fade-in-up={isProfileVisible}
      use:profileObserver
    >
      <h2 class="section-me__name">上 原 龍 之 介</h2>
      <p class="section-me__job">frontend @ web</p>
    </div>

    <!-- 履歴 -->
    <div
      class="section-me__history"
      class:fade-in-up={isHistoryVisible}
      use:historyObserver
    >
      {#each historyItems as h}
        <p class="section-me__history-item">{h}</p>
      {/each}
    </div>

    <!-- スキル見出し -->
    <div
      class="section-me__skill-section-title"
      class:fade-in-up={isSkillSecTtlVisible}
      use:skillSecTtlObserver
    >
      スキル
    </div>

    <!-- スキル一覧 -->
    <div
      class="section-me__skills"
      class:fade-in-up={isSkillsVisible}
      use:skillsObserver
    >
      {#each skillGroups as { title, items }, i}
        <div
          class="section-me__skill-group"
          class:slide-in-left={visibleSkillGroups[i]}
          use:skillGroupObserver(i)
        >
          <div class="section-me__skill-group-title">{title}</div>
          <div class="section-me__skills-group">
            {#each items as item}
              <p class="section-me__skills-group-item">{item}</p>
            {/each}
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  .section-me * {
    color: var(--clear-white);
  }

  .section-me {
    background-color: var(--turquoise-fresh);
    min-height: 100vh;
    display: grid;
    justify-items: start;
  }

  .section-me__contents {
    width: 100%;
    margin: 0 auto;
  }

  .section-me__profile,
  .section-me__history,
  .section-me__skill-section-title,
  .section-me__skills,
  .section-me__skill-group {
    opacity: 0;
    transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .section-me__profile {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-bottom: 42px;
  }

  .section-me__profile * {
    line-height: 1;
  }

  .section-me__profile::after {
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

  .section-me__name {
    font-size: var(--font-size-lg);
    padding-bottom: 3px;
  }

  .section-me__job {
    font-family: var(--font-en);
    font-size: var(--font-size-md);
    font-weight: var(--font-weight-light);
  }

  .section-me__history {
    font-size: var(--font-size-sm);
    padding-bottom: 2rem;
  }

  .section-me__history-item {
    font-size: var(--font-size-sm);
  }

  .section-me__skill-section-title {
    font-family: var(--font-jp);
    font-size: var(--font-size-md);
    font-weight: var(--font-weight-thin);
    padding-bottom: 15px;
  }

  .section-me__skills {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .section-me__skill-group {
    width: 100%;
  }

  .section-me__skill-group-title {
    font-family: var(--font-jp);
    font-size: var(--font-size-sm);
    padding-bottom: 8px;
  }

  .section-me__skill-group-title::before {
    content: "✜";
    display: inline-block;
    font-size: var(--font-size-sm);
    padding-right: 3px;
  }

  .section-me__skills-group {
    display: flex;
    flex-wrap: wrap;
    padding-bottom: 27px;
    max-width: 253px;
    width: 100%;
    padding-left: calc(var(--font-size-sm) + 3px);
    column-gap: 8px;
  }

  .section-me__skills-group-item {
    font-family: var(--font-en);
    white-space: nowrap;
  }

  @media (min-width: 768px) {
    .section-me__contents {
      max-width: 1080px;
    }
    .section-me__name {
      font-size: var(--font-size-xl);
    }
    .section-me__job {
      font-size: var(--font-size-lg);
    }
    .section-me__history-item {
      font-size: var(--font-size-md);
    }
    .section-me__skill-section-title {
      font-size: var(--font-size-xl);
      padding-bottom: 19px;
    }
    .section-me__skill-group-title {
      font-size: var(--font-size-lg);
      padding-bottom: 16px;
    }
    .section-me__skill-group-title::before {
      font-size: var(--font-size-lg);
      padding-right: 11px;
    }
    .section-me__skills-group {
      padding-bottom: 48px;
      max-width: 100%;
      padding-left: calc(var(--font-size-lg) + 11px);
      column-gap: 16px;
    }
    .section-me__skills-group-item {
      font-size: var(--font-size-md);
    }
  }
</style>
