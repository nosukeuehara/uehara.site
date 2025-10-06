<script lang="ts">
  import { createObserver } from "../../../lib/actions/createObserver";

  const cotoLink = "https://coto-nine.vercel.app/";
  const sushipalsLink = "https://sushi-peace.web.app/";
  const works = "/works";

  let isTitleVisible = false;
  let isUeharaVisible = false;
  let isCotoVisible = false;
  let isSushiVisible = false;
  let isWorksPageLinkVisible = false;

  let titleText = "集";
  let subtitleText = "works";
  let displayTitle = "";
  let displaySubtitle = "";
  let titleIndex = 0;
  let subtitleIndex = 0;
  let isTypingTitle = false;
  let isTypingSubtitle = false;

  const titleObserver = createObserver((entry) => {
    isTitleVisible = entry.isIntersecting;
    if (entry.isIntersecting && !isTypingTitle) {
      startTypingAnimation();
    }
  });

  const ueharaObserver = createObserver(
    (entry) => (isUeharaVisible = entry.isIntersecting)
  );

  const cotoObserver = createObserver(
    (entry) => (isCotoVisible = entry.isIntersecting)
  );

  const sushipalsObserver = createObserver(
    (entry) => (isSushiVisible = entry.isIntersecting)
  );

  const worksPageLinkObserver = createObserver(
    (entry) => (isWorksPageLinkVisible = entry.isIntersecting)
  );

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

<section class="section-works section-style-base">
  <div class="section-works__contents">
    <div
      class="section-works__title-wrapper"
      class:typing={isTitleVisible}
      use:titleObserver
    >
      <h2 class="section-works__title">
        <span class="typing-text">{displayTitle}</span>
        {#if isTypingTitle && titleIndex <= titleText.length}
          <span class="cursor--lg">|</span>
        {/if}
      </h2>
      <p class="section-works__subtitle">
        <span class="typing-text">{displaySubtitle}</span>
        {#if isTypingSubtitle && subtitleIndex <= subtitleText.length}
          <span class="cursor">|</span>
        {/if}
      </p>
    </div>

    <div
      class="section-works__item"
      class:slide-in-left={isUeharaVisible}
      use:ueharaObserver
    >
      <h3 class="section-works__item-title">上 / 原</h3>
      <p class="section-works__item-description">
        好きなことを自由にアウトプットするための個人サイト。<br />
        平凡な名字に記号を加えることで、無機質さと余白を感じるデザインに。<br />
        創作物や趣味の写真、なんとなく書いた文章などを掲載してます。
      </p>
    </div>

    <div
      class="section-works__item"
      class:slide-in-left={isCotoVisible}
      use:cotoObserver
    >
      <h3 class="section-works__item-title">coto</h3>
      <p class="section-works__item-description">
        「言葉」や「物事」など"コト"を由来に名付けた読書管理のためのサービス。<br
        />
        インターネットが得意じゃない人たちでも直感的に使えるよう、シンプルでわかりやすいデザインを意識しました。<br
        />
        よりやさしいを考えて現在も開発中。
      </p>
      <a href={cotoLink} class="section-works__link section-works__link--coto">
        coto
      </a>
    </div>

    <div
      class="section-works__item"
      class:slide-in-left={isSushiVisible}
      use:sushipalsObserver
    >
      <h3 class="section-works__item-title">SushiPals</h3>
      <p class="section-works__item-description">
        回転寿司の個別会計をスマートかつ楽しく解決するサービスです。<br />
        友達と回転寿司に行きたい、けど自分の食べたお皿の金額をわざわざ計算するのは面倒。<br
        />
        そんなとき、友達とワイワイ楽しみながら回転寿司を有意義な時間にするのがSushiPalsです。
      </p>
      <a
        href={sushipalsLink}
        class="section-works__link section-works__link--sushipals"
      >
        SushiPals
      </a>
    </div>

    <div class="section-works__page-link">
      <a
        href={works}
       
        class:slide-in-left={isWorksPageLinkVisible}
        use:worksPageLinkObserver
      >
        → 集
      </a>
    </div>
  </div>
</section>

<style>
  .section-works * {
    color: var(--dark);
  }

  .section-works {
    background-color: var(--peach-fuzz);
    min-height: 100vh;
    position: relative;
  }

  .section-works__contents {
    width: 100%;
    margin: 0 auto;
  }

  .section-works__title-wrapper {
    opacity: 0;
    margin-bottom: 42px;
    transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .section-works__title-wrapper * {
    line-height: 1;
  }

  .section-works__item {
    opacity: 0;
    transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    border-radius: 8px;
    position: relative;
    overflow: hidden;
    padding-bottom: 40px;
  }
  .section-works__item::before {
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

  .section-works__item-title {
    font-size: var(--font-size-lg);
    padding-bottom: 14px;
  }
  .section-works__item-description {
    margin: 0;
  }

  .section-works__title {
    padding-bottom: 3px;
  }
  .section-works__title .typing-text {
    font-size: var(--font-size-lg);
  }
  .section-works__subtitle {
    font-family: var(--font-en);
    font-size: var(--font-size-md);
    font-weight: var(--font-weight-light);
  }
  .section-works__subtitle .typing-text {
    font-size: var(--font-size-md);
  }

  .section-works__title-wrapper::after {
    content: "";
    display: block;
    height: 2px;
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

  .section-works__link {
    display: inline-block;
    padding-top: 5px;
    position: relative;
    transition: all 0.3s ease;
    text-decoration: none;
  }
  .section-works__link:hover {
    transform: translateX(5px);
  }
  .section-works__link--coto {
    font-family: "Lunasima", sans-serif;
  }
  .section-works__link--sushipals {
    font-family: "Lunasima", sans-serif;
  }
  .section-works__link::before {
    content: "→";
    display: inline-block;
    padding-right: 4px;
    font-weight: var(--font-weight-regular);
    color: var(--dark);
    transition: transform 0.3s ease;
  }
  .section-works__link:hover::before {
    transform: translateX(3px);
  }

  .section-works__page-link {
    display: flex;
    justify-content: flex-end;
    font-size: var(--font-size-xl);
    position: relative;
    padding-top: 80px;
    bottom: 0;
    right: 0;
    text-decoration: none;
  }

  .section-works__page-link a {
    font-size: var(--font-size-md);
    margin: 0;
  }

  .typing {
    opacity: 1;
    transform: translateY(0);
  }

  .cursor--lg {
    animation: blink 1s infinite;
    color: var(--dark);
    font-size: var(--font-size-lg);
  }

  .cursor {
    animation: blink 1s infinite;
    color: var(--dark);
    font-size: var(--font-size-md);
  }

  @media (min-width: 768px) {
    .section-works__contents {
      max-width: 1080px;
    }
    .section-works__title .typing-text {
      font-size: var(--font-size-xl);
    }
    .section-works__subtitle .typing-text {
      font-size: var(--font-size-lg);
    }
    .section-works__item-title {
      padding-bottom: 12px;
      font-size: var(--font-size-lg);
    }
    .section-works__page-link {
      padding-top: 80px;
    }
  }
</style>
