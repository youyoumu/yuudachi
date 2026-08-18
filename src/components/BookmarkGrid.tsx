import { For } from "solid-js";
import BookmarkCard from "./BookmarkCard";
import type { Bookmark } from "../lib/types";

export default function BookmarkGrid(props: { bookmarks: Bookmark[] }) {
  return (
    <div class="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
      <For each={props.bookmarks}>{(bookmark) => <BookmarkCard bookmark={bookmark} />}</For>
    </div>
  );
}
