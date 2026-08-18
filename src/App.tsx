import { Loading, createMemo } from "solid-js";
import { getBookmarks } from "./data/mock-bookmarks";
import BookmarkGrid from "./components/BookmarkGrid";
import "./index.css";

export default function App() {
  const bookmarks = createMemo(() => getBookmarks());

  return (
    <div class="min-h-screen bg-surface text-on-surface p-8">
      <Loading fallback={<p class="text-center text-on-surface-variant">Loading…</p>}>
        <BookmarkGrid bookmarks={bookmarks()} />
      </Loading>
    </div>
  );
}
