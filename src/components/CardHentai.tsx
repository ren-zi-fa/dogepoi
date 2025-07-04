"use client";

import { EpisodeItem, HentaiItem } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import HentaiTerbaru from "./HentaiTerbaru";
import EpisodeTerbaru from "./EpisodeTerbaru";
import { Button } from "@/components/ui/button";

type Props = {
  hentaiTerbaru?: HentaiItem[];
  episodeTerbaru: EpisodeItem[];
};

export default function AnimeHentai({ hentaiTerbaru, episodeTerbaru }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page") || "1");
  const totalPages = 530;

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    if (page === 1) {
      params.delete("page");
      router.push("/?" + params.toString());
    } else {
      params.set("page", page.toString());
      router.push("/?" + params.toString());
    }
  };

  const getPageNumbers = () => {
    const delta = 2;
    let pages: (number | string)[] = [];

    if (totalPages <= 7) {
      pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    } else {
      pages.push(1);
      const start = Math.max(2, currentPage - delta);
      const end = Math.min(totalPages - 1, currentPage + delta);

      if (start > 2) pages.push("...");
      for (let i = start; i <= end; i++) pages.push(i);
      if (end < totalPages - 1) pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  };

  const paginationItems = getPageNumbers();

  return (
    <div className="max-w-7xl mx-auto space-y-8 px-4 md:px-6 lg:px-8 pb-20">
      {hentaiTerbaru && <HentaiTerbaru hentaiTerbaru={hentaiTerbaru} />}
      <EpisodeTerbaru episodeTerbaru={episodeTerbaru} />

      {/* Pagination */}
      <div className="flex justify-center mt-8">
        <nav className="flex flex-wrap items-center justify-center gap-1 sm:gap-2">
          {/* Previous Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            <span className="hidden sm:inline">Previous</span>
            <span className="inline sm:hidden">Prev</span>
          </Button>

          {/* Page Numbers */}
          {paginationItems.map((item, index) => (
            <div key={index}>
              {item === "..." ? (
                <span className="px-2 py-1 text-sm text-muted-foreground">
                  ...
                </span>
              ) : (
                <Button
                  variant={item === currentPage ? "default" : "outline"}
                  size="sm"
                  onClick={() => handlePageChange(item as number)}
                >
                  {item}
                </Button>
              )}
            </div>
          ))}

          {/* Next Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
          >
            <span className="hidden sm:inline">Next</span>
            <span className="inline sm:hidden">Next</span>
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </nav>
      </div>
    </div>
  );
}
