const API_URL = import.meta.env.VITE_MICROCMS_SERVICE_URL;
const API_KEY = import.meta.env.VITE_MICROCMS_API_KEY;

export async function fetchBlogs() {
  const res = await fetch(`${API_URL}blogs`, {
    headers: {
      'X-MICROCMS-API-KEY': API_KEY,
    },
  });
  const data = await res.json();
  return data;
}

export async function fetchInfos() {
  const res = await fetch(`${API_URL}info`, {
    headers: {
      'X-MICROCMS-API-KEY': API_KEY,
    },
  });
  console.log(`${API_URL}info`);
  const data = await res.json();
  return data.contents;
}

export async function fetchSpecificInfo(id: string) {
  const res = await fetch(`${API_URL}info/${id}`, {
    headers: {
      'X-MICROCMS-API-KEY': API_KEY,
    },
  });
  const data = await res.json();
  return data;
}