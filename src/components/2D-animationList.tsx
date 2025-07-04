"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Category2DAnimation, AnimeResponse } from "@/types";
import { useSearchParams, useRouter } from "next/navigation";
import { useBookmarkStore } from "@/store/useBookMarkStore";
import { Bookmark, BookmarkCheck } from "lucide-react";

interface Props {
  response: AnimeResponse<Category2DAnimation[]>;
  basePath: string;
  isLoading: boolean;
}

export default function List2D({ response, basePath }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page") || "1");
  const { toggleBookmark, isBookmarked } = useBookmarkStore();
  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    if (page === 1) {
      params.delete("page");
    } else {
      params.set("page", page.toString());
    }
    router.push(`${basePath}?${params.toString()}`);
  };

  // Fungsi untuk mendapatkan array nomor halaman yang akan ditampilkan
  const getPageNumbers = () => {
    const totalPages = response.pagination?.totalPages || 1;
    const current = currentPage;
    const delta = 2; // Jumlah halaman di kiri dan kanan halaman aktif

    let pages: (number | string)[] = [];

    // Jika total halaman <= 7, tampilkan semua
    if (totalPages <= 7) {
      pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    } else {
      // Selalu tampilkan halaman 1
      pages.push(1);

      // Tentukan range halaman di sekitar halaman aktif
      const start = Math.max(2, current - delta);
      const end = Math.min(totalPages - 1, current + delta);

      // Tambahkan ellipsis jika ada gap setelah halaman 1
      if (start > 2) {
        pages.push("...");
      }

      // Tambahkan halaman di sekitar halaman aktif
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      // Tambahkan ellipsis jika ada gap sebelum halaman terakhir
      if (end < totalPages - 1) {
        pages.push("...");
      }

      // Selalu tampilkan halaman terakhir
      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="space-y-6">
      {/* List Card */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 container mx-auto px-4">
        {response.data.map((item, idx) => {
          const url = item.url;
          const slug = url.replace("https://nekopoi.care/", "");
          const bookmarked = isBookmarked(item.title);

          return (
            <Card key={idx} className="overflow-hidden shadow-md">
              <Link href={`/watch/${slug}`}>
                <Image
                  src={item.thumbnail}
                  alt={item.title}
                  width={300}
                  unoptimized
                  referrerPolicy="no-referrer"
                  height={400}
                  className="w-full h-48 object-cover"
                />
              </Link>
              <CardContent className="p-4 space-y-2">
                <Link href={`/watch/${slug}`}>
                  <h3 className="font-semibold text-lg line-clamp-2">
                    {item.title}
                  </h3>
                </Link>

                <p className="text-xs text-slate-500">
                  Producer: {item.producers}
                </p>
                <button
                  onClick={() =>
                    toggleBookmark({
                      title: item.title,
                      url: `/watch/${slug}`,
                      image: item.thumbnail,
                    })
                  }
                  className="p-1 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition"
                  title={bookmarked ? "Remove Bookmark" : "Add Bookmark"}
                >
                  {bookmarked ? (
                    <BookmarkCheck className="w-6 h-6 md:w-10 md:h-10 text-yellow-500" />
                  ) : (
                    <Bookmark className="w-6 h-6 md:w-10 md:h-10 text-slate-400" />
                  )}
                </button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Pagination */}
      {response.pagination && response.pagination.totalPages > 1 && (
        <div className="flex flex-wrap justify-center items-center gap-2 mt-4">
          {/* Previous Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </Button>

          {/* Page Numbers */}
          {getPageNumbers().map((page, index) => (
            <div key={index}>
              {page === "..." ? (
                <span className="px-2 py-1 text-sm text-muted-foreground">
                  ...
                </span>
              ) : (
                <Button
                  variant={page === currentPage ? "default" : "outline"}
                  size="sm"
                  onClick={() => handlePageChange(page as number)}
                >
                  {page}
                </Button>
              )}
            </div>
          ))}

          {/* Next Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === response.pagination?.totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
