import { readFileSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const siteUrl = "https://uehara-site.pages.dev";
const siteName = "uehara soo | 作品集";
const defaultImage = "/uehara.png";
const today = new Date().toISOString().slice(0, 10);

const staticPages = [
  {
    title: "uehara soo | Web制作・個人開発の作品集",
    description:
      "上原 龍之介のポートフォリオ。Svelte、Rust、Web制作、個人開発の作品やお知らせをまとめています。",
    path: "/",
    image: defaultImage,
    type: "website",
    priority: "1.0",
    jsonLd: siteJsonLd(),
  },
  {
    title: "私 | 上原 龍之介のプロフィール",
    description:
      "上原 龍之介のプロフィール。Web制作、Svelte、TypeScript、Rustなどの関心や制作領域をまとめています。",
    path: "/me",
    image: defaultImage,
    type: "website",
    priority: "0.8",
  },
  {
    title: "作品集 | uehara soo",
    description:
      "上原 龍之介のWeb制作・個人開発作品。coto、SushiPals、bitpetなどの制作物を紹介しています。",
    path: "/works",
    image: defaultImage,
    type: "website",
    priority: "0.9",
  },
  {
    title: "ふーど | uehara soo",
    description: "上原 龍之介の好きなごはんや日常の写真をまとめたページです。",
    path: "/huuud",
    image: "/food.jpg",
    type: "website",
    priority: "0.6",
  },
  {
    title: "bitpet | ターミナルで育てるCLIペット",
    description:
      "bitpetは、ターミナルの中で小さなモンスターを育てるRust製CLIアプリです。ブラウザ版の体験とGitHubリポジトリを紹介しています。",
    path: "/bitpet",
    image: defaultImage,
    type: "website",
    priority: "0.9",
  },
  {
    title: "お知らせ | uehara soo",
    description:
      "上原 龍之介の制作、個人開発、サイト更新に関するお知らせ一覧です。",
    path: "/info",
    image: defaultImage,
    type: "website",
    priority: "0.8",
  },
];

loadEnv();

const distDir = path.resolve("dist");
const indexHtml = await readFile(path.join(distDir, "index.html"), "utf8");
const cmsPages = await fetchCmsPages();
const pages = [...staticPages, ...cmsPages];

await Promise.all(
  pages.map(async (page) => {
    const html = injectSeo(indexHtml, page);
    const routeDir =
      page.path === "/"
        ? distDir
        : path.join(distDir, page.path.replace(/^\/+/, ""));

    await mkdir(routeDir, { recursive: true });
    await writeFile(path.join(routeDir, "index.html"), html);
  })
);

const sitemap = buildSitemap(pages);
await writeFile(path.join(distDir, "sitemap.xml"), sitemap);
await writeFile(path.resolve("public/sitemap.xml"), sitemap);

function injectSeo(html, page) {
  const canonicalUrl = toAbsoluteUrl(page.path);
  const imageUrl = toAbsoluteUrl(page.image || defaultImage);
  const jsonLd = page.jsonLd
    ? `\n    <script id="page-json-ld" type="application/ld+json">${escapeJsonLd(
        JSON.stringify(page.jsonLd)
      )}</script>`
    : "";

  return html
    .replace(/\s*<script id="page-json-ld"[\s\S]*?<\/script>/s, "")
    .replace(/\s*<meta\s+name="twitter:title"[\s\S]*?\/>\s*/g, "\n")
    .replace(/\s*<meta\s+name="twitter:description"[\s\S]*?\/>\s*/g, "\n")
    .replace(/\s*<meta\s+name="twitter:image"[\s\S]*?\/>\s*/g, "\n")
    .replace(
      /<title>[\s\S]*?<\/title>/,
      `<title>${escapeHtml(page.title)}</title>`
    )
    .replace(
      /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/s,
      `<meta name="description" content="${escapeAttribute(page.description)}" />`
    )
    .replace(
      /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/s,
      `<link rel="canonical" href="${canonicalUrl}" />`
    )
    .replace(
      /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/s,
      `<meta property="og:title" content="${escapeAttribute(page.title)}" />`
    )
    .replace(
      /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/s,
      `<meta property="og:description" content="${escapeAttribute(page.description)}" />`
    )
    .replace(
      /<meta\s+property="og:type"\s+content="[^"]*"\s*\/?>/s,
      `<meta property="og:type" content="${page.type || "website"}" />`
    )
    .replace(
      /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/s,
      `<meta property="og:url" content="${canonicalUrl}" />`
    )
    .replace(
      /<meta\s+property="og:image"\s+content="[^"]*"\s*\/?>/s,
      `<meta property="og:image" content="${imageUrl}" />`
    )
    .replace(
      /<meta\s+property="og:site_name"\s+content="[^"]*"\s*\/?>/s,
      `<meta property="og:site_name" content="${escapeAttribute(siteName)}" />`
    )
    .replace(
      /<meta\s+name="twitter:card"\s+content="[^"]*"\s*\/?>/s,
      [
        `<meta name="twitter:card" content="summary_large_image" />`,
        `    <meta name="twitter:title" content="${escapeAttribute(page.title)}" />`,
        `    <meta name="twitter:description" content="${escapeAttribute(
          page.description
        )}" />`,
        `    <meta name="twitter:image" content="${imageUrl}" />`,
      ].join("\n")
    )
    .replace(/<\/head>/, `${jsonLd}\n  </head>`);
}

async function fetchCmsPages() {
  const baseUrl = normalizeCmsBaseUrl(process.env.VITE_MICROCMS_API_URL);

  if (!baseUrl || typeof fetch !== "function") {
    return [];
  }

  try {
    const [infos, categories] = await Promise.all([
      fetchJson(new URL("api/info", baseUrl)),
      fetchJson(new URL("api/categories", baseUrl)).catch(() => ({
        contents: [],
      })),
    ]);
    const articles = Array.isArray(infos.contents) ? infos.contents : [];
    const categoryItems = Array.isArray(categories.contents)
      ? categories.contents
      : [];
    const categoryIds = new Map();

    articles.forEach((article) => {
      if (article.category?.id) {
        categoryIds.set(article.category.id, article.category.name);
      }
    });
    categoryItems.forEach((category) => {
      if (category.id) {
        categoryIds.set(category.id, category.name);
      }
    });

    return [
      ...articles.map((article) => infoToPage(article)),
      ...[...categoryIds.entries()].map(([id, name]) =>
        categoryToPage(id, name)
      ),
    ];
  } catch (error) {
    console.warn(`Skipping microCMS SEO pages: ${error.message}`);
    return [];
  }
}

async function fetchJson(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }

  return response.json();
}

function infoToPage(info) {
  const description = truncateDescription(
    info.description || stripHtml(info.body || "")
  );

  return {
    title: `${info.title} | お知らせ | uehara soo`,
    description,
    path: `/info/${info.id}`,
    image: info.eyecatch?.url || defaultImage,
    type: "article",
    lastmod: dateOnly(info.revisedAt || info.updatedAt || info.publishedAt),
    priority: "0.7",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Article",
      "@id": `${toAbsoluteUrl(`/info/${info.id}`)}#article`,
      headline: info.title,
      description,
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
    },
  };
}

function categoryToPage(id, name) {
  const label = name || id;

  return {
    title: `${label}の記事一覧 | uehara soo`,
    description: `「${label}」カテゴリに含まれる上原 龍之介のお知らせ記事一覧です。`,
    path: `/info/categories/${id}`,
    image: defaultImage,
    type: "website",
    priority: "0.6",
  };
}

function siteJsonLd() {
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

function buildSitemap(items) {
  const uniqueItems = [
    ...new Map(items.map((item) => [normalizePath(item.path), item])).values(),
  ];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${uniqueItems
  .map(
    (item) => `  <url>
    <loc>${toAbsoluteUrl(item.path)}</loc>
    <lastmod>${item.lastmod || today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${item.priority || "0.7"}</priority>
  </url>`
  )
  .join("\n")}
</urlset>
`;
}

function loadEnv() {
  for (const file of [".env.local", ".env"]) {
    try {
      const content = readFileSync(path.resolve(file), "utf8");
      parseEnv(content);
    } catch {
      // Optional local files.
    }
  }
}

function parseEnv(content) {
  content.split(/\r?\n/).forEach((line) => {
    const trimmed = line.trim();

    if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) {
      return;
    }

    const [key, ...valueParts] = trimmed.split("=");
    const value = valueParts.join("=").replace(/^['"]|['"]$/g, "");

    process.env[key] ||= value;
  });
}

function normalizeCmsBaseUrl(value) {
  if (!value) {
    return "";
  }

  return value.endsWith("/") ? value : `${value}/`;
}

function normalizePath(value) {
  if (value === "/") {
    return value;
  }

  return `/${value.replace(/^\/+|\/+$/g, "")}`;
}

function toAbsoluteUrl(value) {
  if (/^https?:\/\//.test(value)) {
    return value;
  }

  return new URL(value, `${siteUrl}/`).toString();
}

function stripHtml(value) {
  return value
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function truncateDescription(value, maxLength = 118) {
  if (value.length <= maxLength) {
    return value;
  }

  return `${value.slice(0, maxLength - 1).trim()}…`;
}

function dateOnly(value) {
  if (!value) {
    return today;
  }

  return new Date(value).toISOString().slice(0, 10);
}

function escapeHtml(value) {
  return value.replace(
    /[&<>]/g,
    (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" })[char]
  );
}

function escapeAttribute(value) {
  return escapeHtml(value).replace(/"/g, "&quot;");
}

function escapeJsonLd(value) {
  return value.replace(/</g, "\\u003c");
}
