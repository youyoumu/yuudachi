import type { Bookmark } from "./types";

export const STORAGE_KEY = "yuudachi:bookmarks";

export const DEFAULT_BOOKMARKS: Bookmark[] = [
  { id: "1", title: "GitHub", url: "https://github.com" },
  { id: "2", title: "Stack Overflow", url: "https://stackoverflow.com" },
  { id: "3", title: "MDN", url: "https://developer.mozilla.org" },
  { id: "4", title: "YouTube", url: "https://youtube.com" },
  { id: "5", title: "Reddit", url: "https://reddit.com" },
  { id: "6", title: "Hacker News", url: "https://news.ycombinator.com" },
  { id: "7", title: "Gmail", url: "https://mail.google.com" },
  { id: "8", title: "X", url: "https://x.com" },
  { id: "9", title: "SolidJS", url: "https://www.solidjs.com" },
  { id: "10", title: "Tailwind CSS", url: "https://tailwindcss.com" },
  { id: "11", title: "Vite", url: "https://vite.dev" },
  { id: "12", title: "Edge Add-ons", url: "https://microsoftedge.microsoft.com/addons" },
];

export function isBookmark(value: unknown): value is Bookmark {
  if (typeof value !== "object" || value === null) return false;
  const candidate = value as Record<string, unknown>;
  return (
    typeof candidate.id === "string" &&
    typeof candidate.title === "string" &&
    typeof candidate.url === "string"
  );
}

export function loadBookmarks(): Bookmark[] {
  if (typeof window === "undefined") return DEFAULT_BOOKMARKS;

  const raw = window.localStorage.getItem(STORAGE_KEY);
  const parsed = parseBookmarks(raw ?? "");
  return parsed.ok ? parsed.value : DEFAULT_BOOKMARKS;
}

export function saveBookmarks(bookmarks: Bookmark[]): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
}

export type ParseResult = { ok: true; value: Bookmark[] } | { ok: false; error: string };

export function parseBookmarks(text: string): ParseResult {
  let data: unknown;
  try {
    data = JSON.parse(text);
  } catch (error) {
    return { ok: false, error: `Invalid JSON: ${(error as Error).message}` };
  }

  if (!Array.isArray(data)) {
    return { ok: false, error: "Expected a JSON array of bookmarks." };
  }

  if (!data.every(isBookmark)) {
    return {
      ok: false,
      error: "Each bookmark must be an object with string id, title, and url.",
    };
  }

  return { ok: true, value: data };
}
