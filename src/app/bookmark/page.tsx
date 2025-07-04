"use client";

import { useBookmarkStore } from "@/store/useBookMarkStore";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
function slugify(text: string) {
  return decodeURIComponent(text)
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+|-+$/g, "");
}


export default function BookmarkPage() {
  const { bookmarks, toggleBookmark } = useBookmarkStore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center text-slate-800 dark:text-slate-100">
          My BookMarked Hentai
        </h1>

        {bookmarks.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center text-slate-600 dark:text-slate-300">
            <AlertCircle className="w-12 h-12 text-yellow-500 mb-4" />
            <p className="text-lg font-semibold">
              You haven`t bookmarked anything yet.
            </p>
            <p className="text-sm mt-1">
              Go explore and bookmark your favorite anime!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {bookmarks.map((anime, idx) => {
                console.log(anime.url)
              const title = anime.title;
              const slug = slugify(title);
              return (
                <Card
                  key={idx}
                  className="shadow-lg hover:shadow-xl transition-shadow overflow-hidden bg-white dark:bg-slate-800 relative"
                >
                  {/* Image */}
                  <Link href={`/watch/${slug}`}>
                    <Image
                      src={anime.image}
                      alt={anime.title}
                      width={400}
                      height={600}
                      unoptimized
                      referrerPolicy="no-referrer"
                      className="w-full h-64 object-cover"
                    />
                  </Link>

                  {/* Delete Button */}
                  <Button
                    onClick={() => toggleBookmark(anime)}
                    size="icon"
                    variant="ghost"
                    className="absolute top-2 right-2 bg-white/70 dark:bg-slate-900/70 hover:bg-red-100 dark:hover:bg-red-900 rounded-full"
                    title="Remove from Bookmark"
                  >
                    <Trash2 className="w-5 h-5 text-red-500" />
                  </Button>

                  <CardHeader>
                    <CardTitle className="text-base sm:text-lg line-clamp-2">
                      <Link href={`/watch/${slug}`}>{anime.title}</Link>
                    </CardTitle>
                  </CardHeader>

                  <CardContent>
                    <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-3">
                      {anime.sinopsis || "No description available."}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
