import type { Bookmark } from "./types";

const bookmarks: Bookmark[] = [
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

export async function getBookmarks(): Promise<Bookmark[]> {
  return bookmarks;
}
