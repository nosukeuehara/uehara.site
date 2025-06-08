<script lang="ts">
  import DefaultLayout from "../layout/DefaultLayout.svelte";
  import { createObserver } from "../lib/actions/createObserver";

  let isProfileVisible = false;
  let isHistoryVisible = false;
  let isSkillSecTtlVisible = false;
  let isSkillsVisible = false;
  let visibleSkillGroups: boolean[] = [false, false, false, false, false];

  const profileObserver = createObserver(
    (entry) => (isProfileVisible = entry.isIntersecting)
  );
  const historyObserver = createObserver(
    (entry) => (isHistoryVisible = entry.isIntersecting)
  );
  const skillSecTtlObserver = createObserver(
    (entry) => (isSkillSecTtlVisible = entry.isIntersecting)
  );
  const skillsObserver = createObserver(
    (entry) => (isSkillsVisible = entry.isIntersecting)
  );

  function skillGroupObserver(index: number) {
    return createObserver((entry) => {
      visibleSkillGroups[index] = entry.isIntersecting;
      visibleSkillGroups = [...visibleSkillGroups];
    });
  }
</script>

<DefaultLayout>
  <div class="section-me">
    <div class="section-me-contents">
      <div
        class="profile"
        class:fade-in-up={isProfileVisible}
        use:profileObserver
      >
        <h2 class="name">上 原 龍 之 介</h2>
        <p class="job">frontend @ web</p>
      </div>

      <div
        class="live-in"
        class:fade-in-up={isHistoryVisible}
        use:historyObserver
      >
        <p>2001年、宮古島出身</p>
        <p>東京都在住</p>
      </div>

      <div
        class="skillSec-ttl"
        class:fade-in-up={isSkillSecTtlVisible}
        use:skillSecTtlObserver
      >
        スキル
      </div>

      <div
        class="skills-container"
        class:fade-in-up={isSkillsVisible}
        use:skillsObserver
      >
        {#each ["言語", "フレームワーク", "スタイリング", "CMS", "バックエンド / 他"] as title, i}
          <div
            class="skill-group-wrapper"
            class:slide-in-left={visibleSkillGroups[i]}
            use:skillGroupObserver(i)
          >
            <div class="skill-gr-title">{title}</div>
            <div class="skills-group">
              {#if i === 0}
                <p>JavaScript</p>
                <p>TypeScript</p>
                <p>PHP</p>
                <p>Python</p>
              {:else if i === 1}
                <p>React</p>
                <p>Vue</p>
                <p>Svelte</p>
                <p>Next</p>
                <p>Nuxt</p>
              {:else if i === 2}
                <p>CSS Modules</p>
                <p>Tailwind CSS</p>
                <p>Material-UI</p>
              {:else if i === 3}
                <p>WordPress</p>
                <p>HubSpot</p>
                <p>other HeadlessCMS...</p>
              {:else if i === 4}
                <p>AppRouter[Next.js]</p>
                <p>Hono.js</p>
                <p>Express</p>
                <p>Docekr</p>
              {/if}
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
</DefaultLayout>

<style>
  * {
    color: var(--clear-white);
  }
  .section-me {
    background-color: var(--turquoise-fresh);
    min-height: 100vh;
    padding: 100px 24px;
  }
  .profile,
  .live-in,
  .skillSec-ttl,
  .skills-container,
  .skill-group-wrapper {
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

  @keyframes slideInRight {
    from {
      opacity: 0;
      transform: translateX(50px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  .section-me-contents {
    width: 100%;
    margin: 0 auto;
  }
  .profile {
    width: 100%;
    display: flex;
    margin-bottom: 42px;
    flex-direction: column;
  }
  .profile::after {
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
  .name {
    font-size: var(--font-size-lg);
    padding-bottom: 3px;
  }
  .job {
    font-family: var(--font-en);
    font-size: var(--font-size-md);
    font-weight: var(--font-weight-light);
  }
  .live-in {
    font-size: var(--font-size-sm);
    padding-bottom: 2rem;
  }
  .live-in p {
    font-size: var(--font-size-sm);
  }
  .skillSec-ttl {
    font-family: var(--font-jp);
    font-size: var(--font-size-md);
    font-weight: var(--font-weight-thin);
    padding-bottom: 15px;
  }
  .skills-container {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  .skill-gr-title {
    font-family: var(--font-jp);
    font-size: var(--font-size-sm);
    padding-bottom: 8px;
  }
  .skill-gr-title::before {
    content: "✜";
    display: inline-block;
    font-size: var(--font-size-sm);
    padding-right: 3px;
  }
  .skills-group {
    display: flex;
    flex-wrap: wrap;
    padding-bottom: 27px;
    max-width: 253px;
    width: 100%;
    /* skill-gr-titleのfont-sizeとその疑似クラスのpadding-rightの値から算出 */
    padding-left: calc(var(--font-size-sm) + 3px);
    column-gap: 8px;
  }
  .skills-group p {
    font-family: var(--font-en);
    white-space: nowrap;
  }

  .skill-group-wrapper {
    width: 100%;
  }

  @media (min-width: 768px) {
    .section-me {
      padding: 190px 24px;
    }
    .section-me-contents {
      max-width: 1080px;
    }
    .name {
      font-size: var(--font-size-xl);
    }
    .job {
      font-size: var(--font-size-lg);
    }
    .live-in p {
      font-size: var(--font-size-md);
    }
    .skillSec-ttl {
      font-size: var(--font-size-xl);
      padding-bottom: 19px;
    }
    .skill-gr-title {
      font-size: var(--font-size-lg);
      padding-bottom: 16px;
    }
    .skill-gr-title::before {
      font-size: var(--font-size-lg);
      padding-right: 11px;
    }
    .skills-group {
      padding-bottom: 48px;
      max-width: 100%;
      /* skill-gr-titleのfont-sizeとその疑似クラスのpadding-rightの値から算出 */
      padding-left: calc(var(--font-size-lg) + 11px);
      column-gap: 16px;
    }
    .skills-group p {
      font-size: var(--font-size-md);
    }
  }
</style>
