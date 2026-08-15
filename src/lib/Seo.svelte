<script lang="ts">
  import {
    defaultImage,
    pageSeo,
    siteName,
    siteUrl,
    toAbsoluteUrl,
    type JsonLd,
  } from "../seo";

  type Props = {
    title?: string;
    description?: string;
    path?: string;
    image?: string;
    type?: "website" | "article";
    robots?: string;
    jsonLd?: JsonLd;
  };

  let {
    title = pageSeo.home.title,
    description = pageSeo.home.description,
    path = "/",
    image = defaultImage,
    type = "website",
    robots,
    jsonLd,
  }: Props = $props();

  function setMeta(
    selector: string,
    attribute: "name" | "property",
    value: string
  ) {
    let element = document.head.querySelector<HTMLMetaElement>(selector);

    if (!element) {
      element = document.createElement("meta");
      element.setAttribute(attribute, selector.match(/"([^"]+)"/)?.[1] || "");
      document.head.appendChild(element);
    }

    element.content = value;
  }

  function setCanonical(canonicalUrl: string) {
    let element = document.head.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]'
    );

    if (!element) {
      element = document.createElement("link");
      element.rel = "canonical";
      document.head.appendChild(element);
    }

    element.href = canonicalUrl;
  }

  function setJsonLd(value?: JsonLd) {
    const id = "page-json-ld";
    let element = document.getElementById(id) as HTMLScriptElement | null;

    if (!value) {
      element?.remove();
      return;
    }

    if (!element) {
      element = document.createElement("script");
      element.id = id;
      element.type = "application/ld+json";
      document.head.appendChild(element);
    }

    element.textContent = JSON.stringify(value).replace(/</g, "\\u003c");
  }

  $effect(() => {
    if (typeof document === "undefined") {
      return;
    }

    const canonicalUrl = toAbsoluteUrl(path, siteUrl);
    const imageUrl = toAbsoluteUrl(image, siteUrl);

    document.title = title;
    setMeta('meta[name="description"]', "name", description);
    setMeta('meta[property="og:title"]', "property", title);
    setMeta('meta[property="og:description"]', "property", description);
    setMeta('meta[property="og:type"]', "property", type);
    setMeta('meta[property="og:url"]', "property", canonicalUrl);
    setMeta('meta[property="og:image"]', "property", imageUrl);
    setMeta('meta[property="og:site_name"]', "property", siteName);
    setMeta('meta[property="og:locale"]', "property", "ja_JP");
    setMeta('meta[name="twitter:card"]', "name", "summary_large_image");
    setMeta('meta[name="twitter:title"]', "name", title);
    setMeta('meta[name="twitter:description"]', "name", description);
    setMeta('meta[name="twitter:image"]', "name", imageUrl);

    if (robots) {
      setMeta('meta[name="robots"]', "name", robots);
    }

    setCanonical(canonicalUrl);
    setJsonLd(jsonLd);
  });
</script>
