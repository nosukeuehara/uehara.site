import type { Blog, Info } from "../types/microcms";

export async function fetchCotos(): Promise<{ contents: Blog[] }> {
  const res = await fetch(`${import.meta.env.VITE_MICROCMS_API_URL}/api/blogs`);
  return await res.json();
}

export async function fetchInfos(): Promise<Info[]> {
  const res = await fetch(`${import.meta.env.VITE_MICROCMS_API_URL}/api/info`);
  const data = await res.json();
  return data.contents;
}

export async function fetchSpecificInfo(id: string): Promise<Info> {
  const res = await fetch(`${import.meta.env.VITE_MICROCMS_API_URL}/api/info/${id}`);
  return await res.json();
}
