import { For } from "solid-js";
import type { Bookmark } from "../data/types";

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
              class="group flex flex-col items-center gap-3 rounded-2xl p-4 transition-colors hover:bg-surface-container-high"
            >
              <span
                class="flex h-12 w-12 items-center justify-center rounded-full bg-primary-container text-lg font-semibold text-on-primary-container"
                aria-hidden="true"
              >
                {bookmark.title.charAt(0).toUpperCase()}
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
