"use client";

import { Button } from "@/components/ui/button";
import { SearchResponse } from "@/types";
import { useRouter } from "next/navigation";

type Props = {
  pagination: SearchResponse["pagination"];
  query: string;
};

export default function PaginationSearch({ pagination, query }: Props) {
  const router = useRouter();
  const {
    currentPage,
    totalPages,
    hasNextPage,
    hasPreviousPage,
    nextPageUrl,
    previousPageUrl,
  } = pagination;

  // Fungsi bantu: parsing nomor halaman dari URL
  const extractPageNumber = (
    urlStr: string | null | undefined,
    fallback: number
  ): number => {
    if (!urlStr) return Math.max(fallback, 1);
    try {
      const url = new URL(urlStr, "http://dummy");
      const page = Number(url.searchParams.get("page"));
      return !isNaN(page) && page > 0 ? page : Math.max(fallback, 1);
    } catch {
      return Math.max(fallback, 1);
    }
  };

  // Fungsi bantu: menentukan halaman yang akan ditampilkan
  const getPageNumbers = (): (number | string)[] => {
    const pages: (number | string)[] = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", currentPage, "...", totalPages);
      }
    }

    return pages;
  };

  // Navigasi halaman
  const handlePageClick = (page: number) => {
    router.push(`/search?q=${encodeURIComponent(query)}&page=${page}`);
  };

  return (
    <div className="flex justify-center items-center gap-2 flex-wrap mt-6">
      {/* Tombol Previous */}
      {hasPreviousPage && (
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            handlePageClick(extractPageNumber(previousPageUrl, currentPage - 1))
          }
        >
          Prev
        </Button>
      )}

      {/* Nomor Halaman */}
      {getPageNumbers().map((page, index) =>
        typeof page === "number" ? (
          <Button
            key={index}
            variant={page === currentPage ? "default" : "outline"}
            size="sm"
            onClick={() => handlePageClick(page)}
          >
            {page}
          </Button>
        ) : (
          <span key={index} className="px-2 text-muted-foreground">
            ...
          </span>
        )
      )}

      {/* Tombol Next */}
      {hasNextPage && (
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            handlePageClick(extractPageNumber(nextPageUrl, currentPage + 1))
          }
        >
          Next
        </Button>
      )}
    </div>
  );
}
