import { Loading, createMemo } from "solid-js";
import { getBookmarks } from "./data/mock-bookmarks";
import BookmarkGrid from "./components/BookmarkGrid";
import "./index.css";

export default function App() {
  const bookmarks = createMemo(() => getBookmarks());

  return (
    <div class="min-h-screen bg-surface-container-lowest text-on-surface">
      <header class="pb-10 pt-16 text-center">
        <h1 class="text-4xl font-semibold tracking-tight">Yuudachi</h1>
        <p class="mt-2 text-on-surface-variant">Your bookmarks</p>
      </header>
      <Loading fallback={<p class="text-center text-on-surface-variant">Loading…</p>}>
        <BookmarkGrid bookmarks={bookmarks()} />
      </Loading>
    </div>
  );
}
