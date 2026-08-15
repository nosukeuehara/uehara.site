<script lang="ts">
  import { onMount } from "svelte";
  import ProfileCloud from "../../common/ProfileCloud.svelte";
  import { createObserver } from "../../../lib/actions/createObserver";
  import {
    fallbackLanguageSkills,
    type LanguageSkill,
  } from "../../../contentData/meItem";
  import { fetchGitHubLanguageSkills } from "../../../service/githubSkills";

  // IntersectionObserver の設定はそのまま
  let languageSkills: LanguageSkill[] = fallbackLanguageSkills;
  let isCloudVisible = false;

  onMount(async () => {
    languageSkills = await fetchGitHubLanguageSkills();
  });

  const cloudObserver = createObserver(
    (e) => (isCloudVisible = e.isIntersecting)
  );
</script>

<section class="section-me section-style-base">
  <div
    class="section-me__contents"
    class:fade-in-up={isCloudVisible}
    use:cloudObserver
  >
    <ProfileCloud languages={languageSkills} />
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
    overflow: hidden;
    padding: 12px 10px;
    place-items: center;
  }

  .section-me__contents {
    align-items: center;
    display: grid;
    min-height: calc(100vh - 24px);
    opacity: 0;
    place-items: center;
    width: 100%;
    margin: 0 auto;
    transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  }

  @media (min-width: 768px) {
    .section-me__contents {
      max-width: 1320px;
      min-height: calc(100vh - 64px);
    }
  }
</style>
