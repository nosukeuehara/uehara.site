<script lang="ts">
  import { onMount } from "svelte";

  const ueharaLink = "https://nosukeuehara.github.io/uehara.site/";
  const cotoLink =
    "https://coto-git-develop-ryunosuke-ueharas-projects.vercel.app/";
  const works = "/works";

  let titleRef: HTMLDivElement;
  let ueharaRef: HTMLDivElement;
  let cotoRef: HTMLDivElement;
  let worksPageLinkRef: HTMLAnchorElement;
  let isTitleVisible = false;
  let isUeharaVisible = false;
  let isCotoVisible = false;
  let isWorksPageLinkVisible = false;

  // タイピング効果用の状態
  let titleText = "集";
  let subtitleText = "works";
  let displayTitle = "";
  let displaySubtitle = "";
  let titleIndex = 0;
  let subtitleIndex = 0;
  let isTypingTitle = false;
  let isTypingSubtitle = false;

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === titleRef) {
            isTitleVisible = entry.isIntersecting;
            if (entry.isIntersecting && !isTypingTitle) {
              startTypingAnimation();
            }
          } else if (entry.target === ueharaRef) {
            isUeharaVisible = entry.isIntersecting;
          } else if (entry.target === cotoRef) {
            isCotoVisible = entry.isIntersecting;
          } else if (entry.target === worksPageLinkRef) {
            isWorksPageLinkVisible = entry.isIntersecting;
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: "0px 0px -100px 0px",
      }
    );

    if (titleRef) observer.observe(titleRef);
    if (ueharaRef) observer.observe(ueharaRef);
    if (cotoRef) observer.observe(cotoRef);
    if (worksPageLinkRef) observer.observe(worksPageLinkRef);

    return () => observer.disconnect();
  });

  function startTypingAnimation() {
    isTypingTitle = true;

    const titleInterval = setInterval(() => {
      if (titleIndex < titleText.length) {
        displayTitle += titleText[titleIndex];
        titleIndex++;
      } else {
        clearInterval(titleInterval);
        setTimeout(() => {
          isTypingSubtitle = true;
          const subtitleInterval = setInterval(() => {
            if (subtitleIndex < subtitleText.length) {
              displaySubtitle += subtitleText[subtitleIndex];
              subtitleIndex++;
            } else {
              clearInterval(subtitleInterval);
            }
          }, 100);
        }, 300);
      }
    }, 300);
  }
</script>

<section class="section-works section-style-base">
  <div class="section-works-contents">
    <div
      class="section-works-title-wrapper"
      class:fade-slide-up={isTitleVisible}
      bind:this={titleRef}
    >
      <h2 class="section-works-title">
        <span class="typing-text">{displayTitle}</span>
        {#if isTypingTitle && titleIndex <= titleText.length}
          <span class="cursor">|</span>
        {/if}
      </h2>
      <p class="section-works-subtitle">
        <span class="typing-text">{displaySubtitle}</span>
        {#if isTypingSubtitle && subtitleIndex <= subtitleText.length}
          <span class="cursor">|</span>
        {/if}
      </p>
    </div>

    <div
      class="work-uehara"
      class:slide-in-left={isUeharaVisible}
      bind:this={ueharaRef}
    >
      <h3 class="work-title">上 / 原</h3>
      <p class="work-description">
        好きなことを自由にアウトプットするための個人サイト。<br />
        凡な名字に記号を加えることで、無機質さと余白を感じるデザインにしました。<br
        />
        創作物や趣味の写真、なんとなく書いた文章などを掲載してます。
      </p>
    </div>

    <div
      class="work-coto"
      class:slide-in-left={isCotoVisible}
      bind:this={cotoRef}
    >
      <h3 class="work-title">coto</h3>
      <p class="work-description">
        「言葉」や「物事」など"コト"を由来に名付けた読書管理のためのサービス。<br
        />
        インターネットが得意じゃない人たちでも直感的に使えるよう、シンプルでわかりやすいデザインを意識しました。<br
        />
        より易しいを考えて現在も開発中。
      </p>
      <a class="link link-coto" href={cotoLink}>coto</a>
    </div>
    <a
      class="work-page-link disabled"
      aria-disabled="true"
      href={works}
      class:slide-in-left={isWorksPageLinkVisible}
      bind:this={worksPageLinkRef}>→ 創作一覧</a
    >
  </div>
</section>

<style>
  * {
    color: var(--dark);
  }
  .section-works {
    background-color: var(--peach-fuzz);
    min-height: 100vh;
  }
  .section-works-contents {
    width: 100%;
    margin: 0 auto;
  }
  /* アニメーション用の初期状態 */
  .section-works-title-wrapper {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .work-uehara,
  .work-coto {
    opacity: 0;
    transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  }
  /* アニメーション後の状態 */
  .fade-slide-up {
    opacity: 1;
    transform: translateY(0);
  }
  .slide-in-left {
    opacity: 1;
    animation: slideInLeft 0.8s ease-out forwards;
  }
  @keyframes slideInLeft {
    from {
      opacity: 0;
      transform: translateX(-60px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  @keyframes slideInRight {
    from {
      opacity: 0;
      transform: translateX(60px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  /* タイピングエフェクト */
  .cursor {
    animation: blink 1s infinite;
    color: var(--dark);
  }
  @keyframes blink {
    0%,
    50% {
      opacity: 1;
    }
    51%,
    100% {
      opacity: 0;
    }
  }
  .work-uehara,
  .work-coto {
    border-radius: 8px;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }
  .work-uehara::before,
  .work-coto::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.1),
      transparent
    );
    transition: left 0.5s ease;
  }
  .section-works-title {
    padding-bottom: 3px;
  }
  .section-works-title span.typing-text {
    font-size: var(--font-size-lg);
  }
  .section-works-title span.cursor {
    font-size: var(--font-size-lg);
  }
  .section-works-subtitle span.typing-text {
    font-size: var(--font-size-md);
  }
  .section-works-subtitle span.cursor {
    font-size: var(--font-size-md);
  }
  .section-works-subtitle {
    font-family: var(--font-en);
    font-size: var(--font-size-md);
    font-weight: var(--font-weight-light);
  }
  .section-works-title-wrapper::after {
    content: "";
    display: block;
    height: 1px;
    width: 100%;
    margin: 8px 0 32px;
    background-image: repeating-linear-gradient(
      to right,
      var(--dark),
      var(--dark) 10px,
      transparent 10px,
      transparent 20px
    );
    opacity: 0;
    animation: fadeInLine 1s ease-out 1.5s forwards;
  }
  @keyframes fadeInLine {
    from {
      opacity: 0;
      width: 0;
    }
    to {
      opacity: 1;
      width: 100%;
    }
  }
  .link {
    display: inline-block;
    padding-top: 5px;
    position: relative;
    transition: all 0.3s ease;
  }
  .link:hover {
    transform: translateX(5px);
  }
  .link-coto {
    font-family: "Lunasima", sans-serif;
  }
  .link::before {
    content: "→";
    display: inline-block;
    padding-right: 4px;
    font-weight: var(--font-weight-regular);
    color: var(--dark);
    transition: transform 0.3s ease;
  }
  .link:hover::before {
    transform: translateX(3px);
  }
  .work-uehara {
    padding-bottom: 50px;
  }
  .work-uehara h3 {
    font-size: var(--font-size-lg);
    padding-bottom: 8px;
  }
  .work-coto h3 {
    font-family: "Lunasima", sans-serif;
    font-size: var(--font-size-lg);
    padding-bottom: 8px;
  }
  .work-page-link {
    display: flex;
    margin-top: 40px;
    font-size: var(--font-size-sm);
    color: var(--dark);
    justify-content: flex-end;
  }
  .work-page-link.disabled {
    cursor: not-allowed;
    opacity: 0.6 !important;
    text-decoration: none;
    pointer-events: none;
  }
  @media (min-width: 1024px) {
    .section-works-contents {
      max-width: 1080px;
    }
    .section-works-title span.typing-text {
      font-size: var(--font-size-xl);
    }
    .section-works-title span.cursor {
      font-size: var(--font-size-xl);
    }
    .section-works-subtitle span.typing-text {
      font-size: var(--font-size-lg);
    }
    .section-works-subtitle span.cursor {
      font-size: var(--font-size-lg);
    }
    .work-uehara h3 {
      padding-bottom: 12px;
    }
    .work-coto h3 {
      padding-bottom: 12px;
    }
  }
</style>
