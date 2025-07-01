import type { Blog, Category, Info } from "../types/microcms";

export async function fetchCotos(): Promise<{ contents: Blog[] }> {
  const res = await fetch(`${import.meta.env.VITE_MICROCMS_API_URL}api/blogs`);
  return await res.json();
}

export async function fetchInfos(): Promise<Info[]> {
  const res = await fetch(`${import.meta.env.VITE_MICROCMS_API_URL}api/info`);
  const data = await res.json();
  return data.contents;
}

export async function fetchSpecificInfo(id: string): Promise<Info> {
  const res = await fetch(`${import.meta.env.VITE_MICROCMS_API_URL}api/info/${id}`);
  return await res.json();
}

export async function fetchInfoByCategoryId(categoryId: string): Promise<Info[]> {
  console.log("Fetching info for category ID:", categoryId);
  const query = new URLSearchParams({
    filters: `category[equals]${categoryId}`
  });
  const apiUrl = `${import.meta.env.VITE_MICROCMS_API_URL}api/info?${query.toString()}`;
  console.log(apiUrl)
  const res = await fetch(apiUrl);
  if (!res.ok) {
    throw new Error(`API Error: ${res.status} ${res.statusText}`);
  }
  const data = await res.json();
  return data.contents;
}

export async function fetchInfoCategories(): Promise<Category[]> {
  const res = await fetch(`${import.meta.env.VITE_MICROCMS_API_URL}api/categories`);
  const data = await res.json();
  return data.contents;
}





