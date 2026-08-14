<script lang="ts">
  import { onMount } from "svelte";
  import DefaultLayout from "./common/layout/DefaultLayout.svelte";
  import ProfileCloud from "../components/common/ProfileCloud.svelte";
  import { createObserver } from "../lib/actions/createObserver";
  import {
    fallbackLanguageSkills,
    type LanguageSkill,
  } from "../contentData/meItem";
  import { fetchGitHubLanguageSkills } from "../service/githubSkills";

  // IntersectionObserver のセットアップ
  let languageSkills: LanguageSkill[] = fallbackLanguageSkills;
  let isCloudVisible = false;

  onMount(async () => {
    languageSkills = await fetchGitHubLanguageSkills();
  });

  const cloudObserver = createObserver(
    (e) => (isCloudVisible = e.isIntersecting)
  );
</script>

<DefaultLayout>
  <div class="me section-style-base">
    <div
      class="me__contents"
      class:fade-in-up={isCloudVisible}
      use:cloudObserver
    >
      <ProfileCloud languages={languageSkills} />
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
    overflow: hidden;
    padding: 12px 10px;
  }

  .me__contents {
    align-items: center;
    display: grid;
    min-height: calc(100vh - 24px);
    opacity: 0;
    place-items: center;
    transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    width: 100%;
    margin: 0 auto;
  }

  .fade-in-up {
    opacity: 1;
    animation: fadeInUp 0.8s ease-out forwards;
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

  @media (min-width: 768px) {
    .me {
      padding: 32px 24px;
    }
    .me__contents {
      max-width: 1320px;
      min-height: calc(100vh - 64px);
    }
  }
</style>
