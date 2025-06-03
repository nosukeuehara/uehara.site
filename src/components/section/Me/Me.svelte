<script lang="ts">
  import { onMount } from "svelte";

  let profileRef: HTMLDivElement;
  let skillSecTtlRef: HTMLDivElement;
  let skillsRef: HTMLDivElement;
  let isProfileVisible = false;
  let isSkillSecTtlVisible = false;
  let isSkillsVisible = false;
  let skillGroups: HTMLDivElement[] = [];
  let visibleSkillGroups: boolean[] = [];

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === profileRef) {
            isProfileVisible = entry.isIntersecting;
          } else if (entry.target === skillSecTtlRef) {
            isSkillSecTtlVisible = entry.isIntersecting;
          } else if (entry.target === skillsRef) {
            isSkillsVisible = entry.isIntersecting;
          } else {
            const index = skillGroups.indexOf(entry.target as HTMLDivElement);
            if (index !== -1) {
              visibleSkillGroups[index] = entry.isIntersecting;
              visibleSkillGroups = [...visibleSkillGroups];
            }
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    if (profileRef) observer.observe(profileRef);
    if (skillSecTtlRef) observer.observe(skillSecTtlRef);
    if (skillsRef) observer.observe(skillsRef);

    skillGroups.forEach((group, index) => {
      if (group) {
        observer.observe(group);
        visibleSkillGroups[index] = false;
      }
    });

    return () => observer.disconnect();
  });

  function setSkillGroupRef(element: HTMLDivElement, index: number) {
    if (element) {
      skillGroups[index] = element;
    }
  }
</script>

<section class="section-me section-style-base">
  <div class="section-me-contents">
    <div
      class="profile"
      class:fade-in-up={isProfileVisible}
      bind:this={profileRef}
    >
      <p class="name">上 原 龍 之 介</p>
      <p class="job">frontend @ web</p>
    </div>
    <div
      class="skillSec-ttl"
      class:fade-in-up={isSkillSecTtlVisible}
      bind:this={skillSecTtlRef}
    >
      スキル
    </div>
    <div
      class="skills-container"
      class:fade-in-up={isSkillsVisible}
      bind:this={skillsRef}
    >
      <div
        class="skill-group-wrapper"
        class:slide-in-left={visibleSkillGroups[0]}
        use:setSkillGroupRef={0}
      >
        <div class="skill-gr-title">言語</div>
        <div class="skills-group">
          <p>JavaScript</p>
          <p>TypeScript</p>
          <p>PHP</p>
          <p>Python</p>
        </div>
      </div>

      <div
        class="skill-group-wrapper"
        class:slide-in-left={visibleSkillGroups[1]}
        use:setSkillGroupRef={1}
      >
        <div class="skill-gr-title">フレームワーク</div>
        <div class="skills-group">
          <p>React</p>
          <p>Vue</p>
          <p>Svelte</p>
          <p>Next</p>
          <p>Nuxt</p>
        </div>
      </div>

      <div
        class="skill-group-wrapper"
        class:slide-in-left={visibleSkillGroups[2]}
        use:setSkillGroupRef={2}
      >
        <div class="skill-gr-title">スタイリング</div>
        <div class="skills-group">
          <p>CSS Modules</p>
          <p>Tailwind CSS</p>
          <p>Material-UI</p>
        </div>
      </div>

      <div
        class="skill-group-wrapper"
        class:slide-in-left={visibleSkillGroups[3]}
        use:setSkillGroupRef={3}
      >
        <div class="skill-gr-title">CMS</div>
        <div class="skills-group">
          <p>WordPress</p>
          <p>HubSpot</p>
          <p>other HeadlessCMS...</p>
        </div>
      </div>

      <div
        class="skill-group-wrapper"
        class:slide-in-left={visibleSkillGroups[4]}
        use:setSkillGroupRef={4}
      >
        <div class="skill-gr-title">バックエンド / 他</div>
        <div class="skills-group">
          <p>AppRouter[Next.js]</p>
          <p>Hono.js</p>
          <p>Express</p>
          <p>Docekr</p>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .section-me {
    background-color: var(--turquoise-fresh);
  }
  .profile,
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

  .section-me {
    background-color: var(--turquoise-fresh);
    display: grid;
    justify-items: start;
  }
  .section-me-contents {
    width: 100%;
    margin: 0 auto;
  }
  .profile {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  .profile::after {
    content: "";
    display: block;
    height: 1px;
    width: 100%;
    margin: 0.5rem 0 2rem;
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
    padding-bottom: 0.2rem;
  }
  .job {
    font-family: var(--font-en);
    font-size: var(--font-size-md);
    font-weight: var(--font-weight-light);
  }
  .skillSec-ttl {
    font-family: var(--font-jp);
    font-size: var(--font-size-md);
    font-weight: var(--font-weight-thin);
    padding-bottom: 0.8rem;
  }
  .skills-container {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  .skill-gr-title {
    font-family: var(--font-jp);
    font-size: var(--font-size-sm);
    padding-bottom: 0.3rem;
  }
  .skill-gr-title::before {
    content: "✜";
    display: inline-block;
    font-size: var(--font-size-sm);
    padding-right: 0.2rem;
  }
  .skills-group {
    display: flex;
    flex-wrap: wrap;
    padding-bottom: 1.7rem;
    max-width: 253px;
    width: 100%;
    /* skill-gr-titleのfont-sizeとその疑似クラスのpadding-rightの値から算出 */
    padding-left: calc(var(--font-size-sm) + 0.2rem);
    column-gap: 0.5rem;
  }
  .skills-group p {
    font-family: var(--font-en);
    white-space: nowrap;
  }

  .skill-group-wrapper {
    width: 100%;
  }

  @media (min-width: 1024px) {
    .section-me-contents {
      max-width: 1080px;
    }
    .name {
      font-size: var(--font-size-xl);
    }
    .job {
      font-size: var(--font-size-lg);
    }
    .profile::after {
      margin: 0.5rem 0 4rem;
    }
    .skillSec-ttl {
      font-size: var(--font-size-xl);
      padding-bottom: 1.2rem;
    }
    .skill-gr-title {
      font-size: var(--font-size-lg);
      padding-bottom: 1rem;
    }
    .skill-gr-title::before {
      font-size: var(--font-size-lg);
      padding-right: 0.7rem;
    }
    .skills-group {
      padding-bottom: 3rem;
      max-width: 100%;
      /* skill-gr-titleのfont-sizeとその疑似クラスのpadding-rightの値から算出 */
      padding-left: calc(var(--font-size-lg) + 0.7rem);
      column-gap: 1rem;
    }
    .skills-group p {
      font-size: var(--font-size-md);
    }
  }
</style>
