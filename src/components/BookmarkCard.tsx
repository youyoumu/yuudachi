import { Show, createSignal } from "solid-js";
import { Globe } from "./Icons";
import type { Bookmark } from "../data/types";

function hostname(url: string): string {
  try {
    return new URL(url).hostname;
  } catch {
    return url;
  }
}

export default function BookmarkCard(props: { bookmark: Bookmark }) {
  const [failed, setFailed] = createSignal(false);

  return (
    <a
      href={props.bookmark.url}
      target="_blank"
      rel="noopener noreferrer"
      title={props.bookmark.url}
      class="group flex flex-col items-center gap-3 rounded-lg p-4 transition-colors hover:bg-surface-container-low"
    >
      <span
        class="flex h-12 w-12 items-center justify-center rounded-full bg-surface-container text-on-primary-container"
        aria-hidden="true"
      >
        <Show
          when={failed()}
          fallback={
            <img
              src={`https://www.google.com/s2/favicons?domain=${encodeURIComponent(hostname(props.bookmark.url))}&sz=64`}
              alt=""
              class="h-6 w-6"
              onError={() => setFailed(true)}
            />
          }
        >
          <Globe width={24} height={24} />
        </Show>
      </span>
      <span class="max-w-full truncate text-center text-sm text-on-surface-variant group-hover:text-on-surface">
        {props.bookmark.title}
      </span>
    </a>
  );
}
