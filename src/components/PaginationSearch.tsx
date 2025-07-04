import { Button } from "@/components/ui/button";
import { SearchResponse } from "@/types";
import { useRouter } from "next/navigation";

export default function PaginationSearch({
  pagination,
  query,
}: {
  pagination: SearchResponse["pagination"];
  query: string;
}) {
  const router = useRouter();
  const { currentPage, totalPages, hasNextPage, hasPreviousPage, nextPageUrl, previousPageUrl } = pagination;

  const getPageNumbers = () => {
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

  const handlePageClick = (page: number | string) => {
    if (typeof page === "number") {
      router.push(`/search?q=${encodeURIComponent(query)}&page=${page}`);
    }
  };

const extractPageNumber = (urlStr: string | null, fallback: number): number => {
  if (!urlStr) return Math.max(fallback, 1); // Jangan biarkan page=0
  try {
    const url = new URL(urlStr, "http://dummy");
    const page = url.searchParams.get("page");
    const pageNum = Number(page);
    return !isNaN(pageNum) && pageNum > 0 ? pageNum : Math.max(fallback, 1);
  } catch {
    return Math.max(fallback, 1);
  }
};

  return (
    <div className="flex justify-center items-center gap-2 flex-wrap mt-6">
      {hasPreviousPage && (
        <Button
          variant="default"
          size="sm"
          onClick={() => {
            const prevPage = extractPageNumber(previousPageUrl, currentPage - 1);
            router.push(`/search?q=${encodeURIComponent(query)}&page=${prevPage}`);
          }}
        >
          Prev
        </Button>
      )}

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

      {hasNextPage && (
        <Button
          variant="default"
          size="sm"
          onClick={() => {
            const nextPage = extractPageNumber(nextPageUrl, currentPage + 1);
            router.push(`/search?q=${encodeURIComponent(query)}&page=${nextPage}`);
          }}
        >
          Next
        </Button>
      )}
    </div>
  );
}
