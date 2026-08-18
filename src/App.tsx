import { createSignal, onSettled } from "solid-js";
import BookmarkEditor from "./components/BookmarkEditor";
import BookmarkGrid from "./components/BookmarkGrid";
import { DEFAULT_BOOKMARKS, loadBookmarks } from "./data/bookmark-storage";
import type { Bookmark } from "./data/types";
import "./index.css";

export default function App() {
  const [bookmarks, setBookmarks] = createSignal<Bookmark[]>(DEFAULT_BOOKMARKS);

  onSettled(() => {
    setBookmarks(loadBookmarks());
  });

  return (
    <div class="min-h-screen bg-surface text-on-surface p-8">
      <main class="mx-auto max-w-5xl px-6">
        <BookmarkGrid bookmarks={bookmarks()} />
      </main>

      <BookmarkEditor bookmarks={bookmarks()} onSave={(next) => setBookmarks(next)} />
    </div>
  );
}