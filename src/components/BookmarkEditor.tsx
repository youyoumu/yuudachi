import { Show, createMemo, createSignal } from "solid-js";
import { DEFAULT_BOOKMARKS, parseBookmarks, saveBookmarks } from "../lib/bookmark-storage";
import { fetchCollectionBookmarks, loadToken, saveToken } from "../lib/raindrop";
import type { Bookmark } from "../lib/types";
import { Check, Pencil, RefreshCw, RotateCcw, X } from "./Icons";

interface BookmarkEditorProps {
  bookmarks: Bookmark[];
  onSave: (bookmarks: Bookmark[]) => void;
}

export default function BookmarkEditor(props: BookmarkEditorProps) {
  const [editing, setEditing] = createSignal(false);
  const [draft, setDraft] = createSignal("");
  const [token, setToken] = createSignal(loadToken());
  const [syncing, setSyncing] = createSignal(false);
  const [syncStatus, setSyncStatus] = createSignal<{ ok: boolean; text: string } | null>(null);

  const parsed = createMemo(() => parseBookmarks(draft()));

  const status = createMemo(() => {
    const result = parsed();
    return result.ok
      ? { valid: true, text: `Valid JSON — ${result.value.length} bookmarks` }
      : { valid: false, text: result.error };
  });

  const openEditor = () => {
    setDraft(JSON.stringify(props.bookmarks, null, 2));
    setEditing(true);
  };

  const handleSave = () => {
    const result = parseBookmarks(draft());
    if (!result.ok) return;
    saveBookmarks(result.value);
    props.onSave(result.value);
    setEditing(false);
    setDraft("");
  };

  const handleReset = () => {
    saveBookmarks(DEFAULT_BOOKMARKS);
    props.onSave(DEFAULT_BOOKMARKS);
    setDraft(JSON.stringify(DEFAULT_BOOKMARKS, null, 2));
  };

  const handleClose = () => {
    setEditing(false);
    setDraft("");
  };

  const handleSync = async () => {
    const current = token().trim();
    if (!current) {
      setSyncStatus({ ok: false, text: "Enter your Raindrop API token first." });
      return;
    }
    setSyncing(true);
    setSyncStatus(null);
    try {
      const bookmarks = await fetchCollectionBookmarks(current, "yuudachi");
      saveBookmarks(bookmarks);
      props.onSave(bookmarks);
      setDraft(JSON.stringify(bookmarks, null, 2));
      setSyncStatus({ ok: true, text: `Loaded ${bookmarks.length} bookmarks from Raindrop.` });
    } catch (error) {
      setSyncStatus({ ok: false, text: (error as Error).message });
    } finally {
      setSyncing(false);
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
      event.preventDefault();
      handleSave();
    }
  };

  return (
    <>
      <Show when={!editing()}>
        <button
          type="button"
          onClick={openEditor}
          class="fixed right-4 bottom-4 z-20 flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-on-primary transition-opacity hover:opacity-90"
        >
          <Pencil width={16} height={16} />
          Edit bookmarks
        </button>
      </Show>

      <Show when={editing()}>
        <div class="fixed inset-0 z-30 bg-black/50" role="presentation" onClick={handleClose} />
        <aside
          class="fixed inset-y-0 right-0 z-40 flex w-full max-w-md flex-col bg-surface-container shadow-2xl"
          role="dialog"
          aria-modal="true"
          aria-label="Edit bookmarks"
        >
          <header class="flex items-center justify-between bg-surface-container-high px-4 py-3">
            <h2 class="text-base font-semibold text-on-surface">Edit bookmarks (localStorage)</h2>
            <button
              type="button"
              onClick={handleClose}
              class="text-on-surface-variant transition-colors hover:text-on-surface"
              aria-label="Close editor"
            >
              <X width={20} height={20} />
            </button>
          </header>

          <div class="flex flex-1 flex-col gap-4 overflow-auto p-4">
            <label class="flex flex-col gap-1">
              <span class="text-xs text-on-surface-variant">Raindrop API token</span>
              <input
                type="password"
                value={token()}
                onInput={(event) => {
                  setToken(event.currentTarget.value);
                  saveToken(event.currentTarget.value);
                }}
                placeholder="Paste your Raindrop API token"
                class="rounded-lg bg-surface-container-lowest px-3 py-2 font-mono text-xs text-on-surface outline-none placeholder:text-on-surface-variant focus:ring-2 focus:ring-primary"
              />
            </label>

            <textarea
              value={draft()}
              onInput={(event) => setDraft(event.currentTarget.value)}
              onKeyDown={handleKeyDown}
              spellcheck={false}
              class="h-64 w-full flex-1 resize-none rounded-lg bg-surface-container-lowest p-3 font-mono text-xs text-on-surface outline-none placeholder:text-on-surface-variant focus:ring-2 focus:ring-primary"
              placeholder='[{"id": "1", "title": "GitHub", "url": "https://github.com"}]'
            />

            <div class="rounded-lg bg-surface-container-low px-3 py-2 text-xs">
              <Show when={status().valid} fallback={<p class="text-error">{status().text}</p>}>
                <p class="text-on-surface-variant">{status().text}</p>
              </Show>
              <Show when={syncStatus()}>
                <p class={syncStatus()?.ok ? "text-on-surface-variant" : "text-error"}>
                  {syncStatus()?.text}
                </p>
              </Show>
            </div>
          </div>

          <footer class="flex items-center justify-between gap-2 bg-surface-container-high px-4 py-3">
            <div class="flex flex-col gap-1">
              <button
                type="button"
                onClick={handleSync}
                disabled={syncing()}
                class="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-primary disabled:opacity-50"
              >
                <RefreshCw width={16} height={16} class={syncing() ? "animate-spin" : ""} />
                Update from Raindrop
              </button>
              <button
                type="button"
                onClick={handleReset}
                class="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-error"
              >
                <RotateCcw width={16} height={16} />
                Reset to defaults
              </button>
            </div>
            <div class="flex gap-2">
              <button
                type="button"
                onClick={handleClose}
                class="rounded-lg bg-surface-container-highest px-4 py-2 text-sm font-medium text-on-surface transition-opacity hover:opacity-90"
              >
                Close
              </button>
              <button
                type="button"
                onClick={handleSave}
                class="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-on-primary transition-opacity hover:opacity-90"
              >
                <Check width={16} height={16} />
                Save
              </button>
            </div>
          </footer>
        </aside>
      </Show>
    </>
  );
}
