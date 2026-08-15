import type { Info } from "./types/microcms";

export type JsonLd = Record<string, unknown> | Record<string, unknown>[];

export type PageSeo = {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  robots?: string;
};

export const siteUrl = "https://uehara-site.pages.dev";
export const siteName = "uehara soo | 作品集";
export const defaultImage = "/uehara.png";

export const pageSeo = {
  home: {
    title: "uehara soo | Web制作・個人開発の作品集",
    description:
      "上原 龍之介のポートフォリオ。Svelte、Rust、Web制作、個人開発の作品やお知らせをまとめています。",
    path: "/",
    image: defaultImage,
    type: "website",
  },
  me: {
    title: "私 | 上原 龍之介のプロフィール",
    description:
      "上原 龍之介のプロフィール。Web制作、Svelte、TypeScript、Rustなどの関心や制作領域をまとめています。",
    path: "/me",
    image: defaultImage,
    type: "website",
  },
  works: {
    title: "作品集 | uehara soo",
    description:
      "上原 龍之介のWeb制作・個人開発作品。coto、SushiPals、bitpetなどの制作物を紹介しています。",
    path: "/works",
    image: defaultImage,
    type: "website",
  },
  huuud: {
    title: "ふーど | uehara soo",
    description: "上原 龍之介の好きなごはんや日常の写真をまとめたページです。",
    path: "/huuud",
    image: "/food.jpg",
    type: "website",
  },
  bitpet: {
    title: "bitpet | ターミナルで育てるCLIペット",
    description:
      "bitpetは、ターミナルの中で小さなモンスターを育てるRust製CLIアプリです。ブラウザ版の体験とGitHubリポジトリを紹介しています。",
    path: "/bitpet",
    image: defaultImage,
    type: "website",
  },
  info: {
    title: "お知らせ | uehara soo",
    description:
      "上原 龍之介の制作、個人開発、サイト更新に関するお知らせ一覧です。",
    path: "/info",
    image: defaultImage,
    type: "website",
  },
} satisfies Record<string, PageSeo>;

export const staticSeoPages = Object.values(pageSeo);

export function toAbsoluteUrl(pathOrUrl = "/", baseUrl = siteUrl) {
  if (/^https?:\/\//.test(pathOrUrl)) {
    return pathOrUrl;
  }

  return new URL(pathOrUrl, `${baseUrl}/`).toString();
}

export function stripHtml(value: string) {
  return value
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function truncateDescription(value: string, maxLength = 118) {
  if (value.length <= maxLength) {
    return value;
  }

  return `${value.slice(0, maxLength - 1).trim()}…`;
}

export function infoToSeo(info: Info): PageSeo {
  const description = truncateDescription(
    info.description || stripHtml(info.body)
  );

  return {
    title: `${info.title} | お知らせ | uehara soo`,
    description,
    path: `/info/${info.id}`,
    image: info.eyecatch?.url || defaultImage,
    type: "article",
  };
}

export function categoryToSeo(
  categoryId: string,
  categoryName?: string
): PageSeo {
  const label = categoryName || categoryId;

  return {
    title: `${label}の記事一覧 | uehara soo`,
    description: `「${label}」カテゴリに含まれる上原 龍之介のお知らせ記事一覧です。`,
    path: `/info/categories/${categoryId}`,
    image: defaultImage,
    type: "website",
  };
}

export function siteJsonLd() {
  return [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      name: siteName,
      url: siteUrl,
      inLanguage: "ja",
    },
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "@id": `${siteUrl}/#owner`,
      name: "上原 龍之介",
      alternateName: "uehara soo",
      url: siteUrl,
      image: toAbsoluteUrl(defaultImage),
      description: "Web制作、デジタル作品をまとめたポートフォリオサイト。",
      sameAs: ["https://github.com/nosukeuehara"],
    },
  ];
}

export function articleJsonLd(info: Info) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${toAbsoluteUrl(`/info/${info.id}`)}#article`,
    headline: info.title,
    description: info.description || truncateDescription(stripHtml(info.body)),
    image: info.eyecatch?.url ? [info.eyecatch.url] : undefined,
    datePublished: info.publishedAt,
    dateModified: info.revisedAt || info.updatedAt,
    mainEntityOfPage: toAbsoluteUrl(`/info/${info.id}`),
    author: {
      "@type": "Person",
      "@id": `${siteUrl}/#owner`,
      name: "上原 龍之介",
    },
    publisher: {
      "@type": "Person",
      "@id": `${siteUrl}/#owner`,
      name: "上原 龍之介",
    },
  };
}
