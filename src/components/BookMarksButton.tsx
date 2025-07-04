import { useBookmarkStore } from "@/store/useBookMarkStore";
import { Bookmark, BookmarkCheck } from "lucide-react";

interface Props {
  title: string;
  url: string;
  image: string;
  sinopsis?: string;
}

export default function BookmarkButton({ title, url, image, sinopsis }: Props) {
  const { isBookmarked, toggleBookmark } = useBookmarkStore();
  const bookmarked = isBookmarked(title);

  return (
    <button
      onClick={() => toggleBookmark({ title, url, image, sinopsis })}
      className="p-2 rounded hover:bg-slate-100 dark:hover:bg-slate-700 transition"
      title={bookmarked ? "Remove Bookmark" : "Add Bookmark"}
    >
      {bookmarked ? (
        <BookmarkCheck className="text-yellow-500" />
      ) : (
        <Bookmark className="text-slate-400 hover:text-yellow-500" />
      )}
    </button>
  );
}
