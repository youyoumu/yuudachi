import { Loading, createMemo } from "solid-js";
import { getBookmarks } from "./data/mock-bookmarks";
import BookmarkGrid from "./components/BookmarkGrid";
import "./index.css";

export default function App() {
  const bookmarks = createMemo(() => getBookmarks());

  return (
    <div class="min-h-screen bg-neutral-950 text-neutral-100">
      <header class="pb-10 pt-16 text-center">
        <h1 class="text-4xl font-semibold tracking-tight">Yuudachi</h1>
        <p class="mt-2 text-neutral-500">Your bookmarks</p>
      </header>
      <Loading fallback={<p class="text-center text-neutral-500">Loading…</p>}>
        <BookmarkGrid bookmarks={bookmarks()} />
      </Loading>
    </div>
  );
}
