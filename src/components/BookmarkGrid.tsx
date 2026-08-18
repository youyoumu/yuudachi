import { For } from "solid-js";
import { Globe } from "./Icons";
import type { Bookmark } from "../data/types";

function hostname(url: string): string {
  try {
    return new URL(url).hostname;
  } catch {
    return url;
  }
}

export default function BookmarkGrid(props: { bookmarks: Bookmark[] }) {
  return (
    <main class="mx-auto max-w-5xl px-6">
      <div class="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        <For each={props.bookmarks}>
          {(bookmark) => (
            <a
              href={bookmark.url}
              target="_blank"
              rel="noopener noreferrer"
              title={bookmark.url}
              class="group flex flex-col items-center gap-3 rounded-lg p-4 transition-colors hover:bg-surface-container"
            >
              <span
                class="relative flex h-12 w-12 items-center justify-center rounded-full bg-primary-container text-on-primary-container"
                aria-hidden="true"
              >
                <Globe width={24} height={24} class="opacity-60" />
                <img
                  src={`https://www.google.com/s2/favicons?domain=${encodeURIComponent(hostname(bookmark.url))}&sz=64`}
                  alt=""
                  class="absolute inset-0 m-auto h-6 w-6"
                  onError={(event) => (event.currentTarget.style.display = "none")}
                />
              </span>
              <span class="max-w-full truncate text-center text-sm text-on-surface-variant group-hover:text-on-surface">
                {bookmark.title}
              </span>
            </a>
          )}
        </For>
      </div>
    </main>
  );
}
