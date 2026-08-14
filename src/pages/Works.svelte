<script lang="ts">
  import DefaultLayout from "./common/layout/DefaultLayout.svelte";
  import { onMount } from "svelte";
  import { link } from "svelte-spa-router";

  const cotoLink = "https://coto-nine.vercel.app/";
  const sushipalsLink = "https://sushi-peace.web.app/";
  const bitpetLink = "/bitpet";
  const bitpetGithubLink = "https://github.com/nosukeuehara/bitpet";

  let titleRef: HTMLDivElement;
  let ueharaRef: HTMLDivElement;
  let cotoRef: HTMLDivElement;
  let sushiRef: HTMLDivElement;
  let bitpetRef: HTMLDivElement;
  let isTitleVisible = false;
  let isUeharaVisible = false;
  let isCotoVisible = false;
  let isSushiVisible = false;
  let isBitpetVisible = false;

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
          } else if (entry.target === sushiRef) {
            isSushiVisible = entry.isIntersecting;
          } else if (entry.target === bitpetRef) {
            isBitpetVisible = entry.isIntersecting;
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: "0px 0px -100px 0px",
      }
    );

    observer.observe(titleRef);
    observer.observe(ueharaRef);
    observer.observe(cotoRef);
    observer.observe(sushiRef);
    observer.observe(bitpetRef);
    return () => observer.disconnect();
  });

  function startTypingAnimation() {
    isTypingTitle = true;
    const titleInterval = setInterval(() => {
      if (titleIndex < titleText.length) {
        displayTitle += titleText[titleIndex++];
      } else {
        clearInterval(titleInterval);
        setTimeout(() => {
          isTypingSubtitle = true;
          const subtitleInterval = setInterval(() => {
            if (subtitleIndex < subtitleText.length) {
              displaySubtitle += subtitleText[subtitleIndex++];
            } else {
              clearInterval(subtitleInterval);
            }
          }, 100);
        }, 300);
      }
    }, 300);
  }
</script>

<DefaultLayout>
  <section class="works">
    <div class="works__container">
      <div
        class="works__title-block"
        class:fade-slide-up={isTitleVisible}
        bind:this={titleRef}
      >
        <h2 class="works__title">
          <span class="works__typing-text">{displayTitle}</span>
          {#if isTypingTitle && titleIndex <= titleText.length}
            <span class="works__cursor--xl">|</span>
          {/if}
        </h2>
        <p class="works__subtitle">
          <span class="works__typing-text">{displaySubtitle}</span>
          {#if isTypingSubtitle && subtitleIndex <= subtitleText.length}
            <span class="works__cursor-lg">|</span>
          {/if}
        </p>
      </div>

      <div
        class="works__item"
        class:slide-in-left={isUeharaVisible}
        bind:this={ueharaRef}
      >
        <h3 class="works__item-title">上 / 原</h3>
        <p class="works__item-description">
          好きなことを自由にアウトプットするための個人サイト。<br />
          平凡な名字に記号を加えることで、無機質さと余白を感じるデザインに。<br
          />
          創作物や趣味の写真、なんとなく書いた文章などを掲載してます。
        </p>
      </div>

      <div
        class="works__item"
        class:slide-in-left={isCotoVisible}
        bind:this={cotoRef}
      >
        <h3 class="works__item-title">coto</h3>
        <p class="works__item-description">
          「言葉」や「物事」など"コト"を由来に名付けた読書管理のためのサービス。<br
          />
          インターネットが得意じゃない人たちでも直感的に使えるよう、シンプルでわかりやすいデザインを意識しました。<br
          />
          よりやさしいを考えて現在も開発中。
        </p>
        <a href={cotoLink} class="works__link works__link--coto"> coto </a>
      </div>

      <div
        class="works__item"
        class:slide-in-left={isSushiVisible}
        bind:this={sushiRef}
      >
        <h3 class="works__item-title">SushiPals</h3>
        <p class="works__item-description">
          回転寿司の個別会計をスマートかつ楽しく解決するサービスです。<br />
          友達と回転寿司に行きたい、けど自分の食べたお皿の金額をわざわざ計算するのは面倒。<br
          />
          そんなとき、友達とワイワイ楽しみながら回転寿司を有意義な時間にするのがSushiPalsです。
        </p>
        <a href={sushipalsLink} class="works__link works__link--sushi">
          SushiPals
        </a>
      </div>

      <div
        class="works__item works__item--bitpet"
        class:slide-in-bitpet={isBitpetVisible}
        bind:this={bitpetRef}
      >
        <h3 class="works__item-title works__item-title--bitpet">bitpet</h3>
        <p class="works__item-description">
          ターミナルの中で小さなモンスターを育てるCLIアプリ。<br />
          ごはんをあげたり、遊んだり、出かけたりしながら少しずつ成長していきます。<br
          />
          Rustで作っていて、日常の作業の合間にちょっと触りたくなるような存在を目指しました。
        </p>
        <div class="works__links">
          <a href={bitpetLink} use:link class="works__link works__link--bitpet">
            bitpet
          </a>
          <a
            href={bitpetGithubLink}
            target="_blank"
            rel="noreferrer"
            class="works__link works__link--bitpet-github"
          >
            GitHub
          </a>
        </div>
      </div>
    </div>
  </section>
</DefaultLayout>

<style>
  .works {
    background-color: var(--peach-fuzz);
    min-height: 100vh;
    color: var(--dark);
    padding: 120px 24px;
  }
  .works__container {
    width: 100%;
    margin: 0 auto;
  }

  .works__title-block {
    opacity: 0;
    transform: translateY(30px);
    margin-bottom: 42px;
    transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .fade-slide-up {
    opacity: 1;
    transform: translateY(0);
  }

  .works__item {
    opacity: 0;
    transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    border-radius: 8px;
    position: relative;
    overflow: hidden;
    padding-bottom: 40px;
  }
  .works__item::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    transition: left 0.5s ease;
  }

  .works__item--bitpet {
    overflow: visible;
  }

  .works__item--bitpet::after {
    animation: bitpetBlink 2.4s ease-in-out infinite;
    background: var(--dark);
    border-radius: 2px;
    box-shadow:
      10px 0 0 var(--dark),
      5px 8px 0 var(--dark);
    content: "";
    height: 4px;
    left: -18px;
    opacity: 0.72;
    position: absolute;
    top: 0.62em;
    width: 4px;
  }

  .slide-in-left {
    opacity: 1;
    animation: slideInLeft 0.8s ease-out forwards;
  }

  .slide-in-bitpet {
    opacity: 1;
    animation: bitpetEnter 0.95s cubic-bezier(0.2, 0.9, 0.24, 1.1) forwards;
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

  @keyframes bitpetEnter {
    0% {
      opacity: 0;
      transform: translateX(-42px) translateY(18px) rotate(-1.5deg);
    }
    58% {
      opacity: 1;
      transform: translateX(8px) translateY(-8px) rotate(0.8deg);
    }
    78% {
      transform: translateX(-3px) translateY(3px) rotate(-0.3deg);
    }
    100% {
      opacity: 1;
      transform: translateX(0) translateY(0) rotate(0deg);
    }
  }

  .works__title .works__typing-text {
    font-size: var(--font-size-xl);
  }
  .works__subtitle .works__typing-text {
    font-family: var(--font-en);
    font-size: var(--font-size-lg);
    font-weight: var(--font-weight-light);
  }

  .works__cursor--xl {
    animation: blink 1s infinite;
    font-size: var(--font-size-xl);
  }

  .works__cursor-lg {
    animation: blink 1s infinite;
    font-size: var(--font-size-lg);
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

  .works__title-block::after {
    content: "";
    display: block;
    height: 1px;
    width: 100%;
    margin-top: 8px;
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

  .works__item-title {
    font-size: var(--font-size-lg);
    padding-bottom: 14px;
  }

  .works__item-title--bitpet {
    letter-spacing: 0;
    position: relative;
    width: fit-content;
  }

  .works__item-title--bitpet::before {
    content: "$ ";
    font-weight: var(--font-weight-light);
  }

  .works__item-title--bitpet::after {
    animation: bitpetCursor 1s steps(1, end) infinite;
    content: "_";
    margin-left: 0.08em;
  }

  .works__item-description {
    margin: 0;
  }

  .works__link {
    display: inline-block;
    padding-top: 5px;
    position: relative;
    transition: all 0.3s ease;
    text-decoration: none;
  }
  .works__link:hover {
    transform: translateX(5px);
  }

  .works__links {
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    gap: 10px 24px;
  }
  .works__link--coto {
    font-family: "Lunasima", sans-serif;
    color: var(--dark);
  }
  .works__link--sushi {
    font-family: "Lunasima", sans-serif;
    color: var(--dark);
  }

  .works__link--bitpet,
  .works__link--bitpet-github {
    color: var(--dark);
  }

  .works__link::before {
    content: "→";
    display: inline-block;
    padding-right: 4px;
    font-weight: var(--font-weight-regular);
    transition: transform 0.3s ease;
    color: var(--dark);
  }
  .works__link:hover::before {
    transform: translateX(3px);
  }

  .works__link--bitpet::before,
  .works__link--bitpet-github::before {
    content: ">";
  }

  @keyframes bitpetBlink {
    0%,
    78%,
    100% {
      transform: translateY(0) scaleY(1);
    }
    82% {
      transform: translateY(2px) scaleY(0.18);
    }
  }

  @keyframes bitpetCursor {
    0%,
    50% {
      opacity: 1;
    }
    51%,
    100% {
      opacity: 0;
    }
  }

  @media (min-width: 768px) {
    .works {
      padding: 190px 24px;
    }
    .works__container {
      max-width: 1080px;
    }
    .works__typing-text {
      font-size: var(--font-size-xl);
    }
    .works__subtitle {
      font-size: var(--font-size-lg);
    }
    .works__item-title {
      padding-bottom: 12px;
    }
  }
</style>
