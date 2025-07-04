import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface BookmarkItem {
  title: string;
  url: string;
  image: string;
  sinopsis?: string;
}

interface BookmarkState {
  bookmarks: BookmarkItem[];
  toggleBookmark: (item: BookmarkItem) => void;
  isBookmarked: (title: string) => boolean;
  clearBookmarks: () => void;
}

export const useBookmarkStore = create<BookmarkState>()(
  persist(
    (set, get) => ({
      bookmarks: [],
      toggleBookmark: (item) => {
        const current = get().bookmarks;
        const exists = current.some((b) => b.title === item.title);

        const updated = exists
          ? current.filter((b) => b.title !== item.title)
          : [...current, item];

        set({ bookmarks: updated });
      },
      isBookmarked: (title) => {
        return get().bookmarks.some((b) => b.title === title);
      },
      clearBookmarks: () => {
        set({ bookmarks: [] });
      },
    }),
    {
      name: "bookmark-storage",
    }
  )
);
