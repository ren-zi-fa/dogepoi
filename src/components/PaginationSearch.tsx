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

  const { currentPage, totalPages } = pagination;

  const getPageNumbers = () => {
    const pages = [];
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
      router.push(`/search/${encodeURIComponent(query)}/page=${page}`);
    }
  };

  return (
    <div className="flex justify-center items-center gap-2 flex-wrap mt-6">
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

      {pagination.hasNextPage && pagination.nextPageUrl && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            const url = new URL(
              pagination.nextPageUrl as string,
              "http://dummy"
            );
            const nextPage = url.searchParams.get("page");
            router.push(
              `/search/${encodeURIComponent(query)}/page=${nextPage}`
            );
          }}
        >
          Next
        </Button>
      )}
    </div>
  );
}
