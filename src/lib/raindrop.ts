import type { Bookmark } from "./types";

const RAINDROP_API = "https://api.raindrop.io/rest/v1";
export const RAINDROP_TOKEN_KEY = "yuudachi:raindrop-token";

interface RaindropCollection {
  _id: number;
  title: string;
}

interface RaindropItem {
  _id: number;
  title?: string;
  link?: string;
}

export function loadToken(): string {
  if (typeof window === "undefined") return "";
  return window.localStorage.getItem(RAINDROP_TOKEN_KEY) ?? "";
}

export function saveToken(token: string): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(RAINDROP_TOKEN_KEY, token);
}

class RaindropError extends Error {}

async function request<T>(token: string, path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${RAINDROP_API}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...init?.headers,
    },
  });

  if (!response.ok) {
    let message = `Request failed (${response.status})`;
    try {
      const body = (await response.json()) as { errorMessage?: string };
      if (body.errorMessage) message = body.errorMessage;
    } catch {
      // fall back to the status-based message
    }
    throw new RaindropError(message);
  }

  return (await response.json()) as T;
}

async function findCollectionId(token: string, name: string): Promise<number> {
  const all: RaindropCollection[] = [];

  const roots = await request<{ items: RaindropCollection[] }>(token, "/collections");
  all.push(...roots.items);

  const children = await request<{ items: RaindropCollection[] }>(token, "/collections/childrens");
  all.push(...children.items);

  const match = all.find((collection) => collection.title.trim() === name);
  if (!match) throw new RaindropError(`Collection "${name}" not found.`);

  return match._id;
}

async function fetchRaindrops(token: string, collectionId: number): Promise<RaindropItem[]> {
  const items: RaindropItem[] = [];
  const perpage = 50;

  for (let page = 0; ; page++) {
    const data = await request<{ count: number; items: RaindropItem[] }>(
      token,
      `/raindrops/${collectionId}?perpage=${perpage}&page=${page}`,
    );
    items.push(...data.items);
    if (items.length >= data.count || data.items.length < perpage) break;
  }

  return items;
}

function hostname(url: string): string {
  try {
    return new URL(url).hostname;
  } catch {
    return url;
  }
}

export function toBookmarks(items: RaindropItem[]): Bookmark[] {
  const seen = new Set<string>();
  const bookmarks: Bookmark[] = [];

  for (const item of items) {
    const url = item.link?.trim();
    if (!url || seen.has(url)) continue;
    seen.add(url);
    bookmarks.push({
      id: String(item._id),
      title: item.title?.trim() || hostname(url),
      url,
    });
  }

  return bookmarks;
}

export async function fetchCollectionBookmarks(token: string, name: string): Promise<Bookmark[]> {
  const collectionId = await findCollectionId(token, name);
  const items = await fetchRaindrops(token, collectionId);
  return toBookmarks(items);
}
