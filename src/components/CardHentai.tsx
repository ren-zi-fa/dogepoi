"use client";
import { EpisodeItem, HentaiItem } from "@/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import HentaiTerbaru from "./HentaiTerbaru";
import EpisodeTerbaru from "./EpisodeTerbaru";

type Props = {
  hentaiTerbaru?: HentaiItem[];
  episodeTerbaru: EpisodeItem[];
};

export default function AnimeHentai({ hentaiTerbaru, episodeTerbaru }: Props) {
  const pathname = usePathname();

  // Extract current page from URL (e.g., /page/5 -> 5)
  const getCurrentPage = (): number => {
    const pageMatch = pathname.match(/\/page\/(\d+)/);
    return pageMatch ? parseInt(pageMatch[1]) : 1;
  };

  const currentPage = getCurrentPage();
  const totalPages = 530;

  // Generate pagination items
  const generatePaginationItems = () => {
    const items = [];
    const maxVisible = 7; // Maximum visible page numbers

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        items.push(i);
      }
    } else {
      // Complex pagination logic
      if (currentPage <= 4) {
        // Show: 1 2 3 4 5 ... 530
        for (let i = 1; i <= 2; i++) {
          items.push(i);
        }
        items.push("...");
        items.push(totalPages);
      } else if (currentPage >= totalPages - 3) {
        // Show: 1 ... 526 527 528 529 530
        items.push(1);
        items.push("...");
        for (let i = totalPages - 4; i <= totalPages; i++) {
          items.push(i);
        }
      } else {
        items.push(1);
        items.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          items.push(i);
        }
        items.push("...");
        items.push(totalPages);
      }
    }

    return items;
  };

  const paginationItems = generatePaginationItems();
  return (
    <div className="max-w-7xl mx-auto space-y-8 px-4 md:px-6 lg:px-8 pb-20">
      {/* Section: Hentai Terbaru - Horizontal Layout */}

      {hentaiTerbaru && <HentaiTerbaru hentaiTerbaru={hentaiTerbaru} />}
      {/* Section: Episode Terbaru - Vertical Grid Layout */}
      <EpisodeTerbaru episodeTerbaru={episodeTerbaru} />
      <div className="flex justify-center mt-8">
        <nav className="flex flex-wrap items-center justify-center gap-1 sm:gap-2">
          {/* Previous Button */}
          <Link
            href={currentPage - 1 === 1 ? `/` : `/page/${currentPage - 1}`}
            className="flex items-center px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded transition"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            <span className="hidden sm:inline">Previous</span>
            <span className="inline sm:hidden">Prev</span>
          </Link>

          {/* Page Numbers */}
          {paginationItems.map((item, index) => {
            if (item === "...") {
              return (
                <span
                  key={`ellipsis-${index}`}
                  className="px-2 py-2 text-sm text-muted-foreground"
                >
                  ...
                </span>
              );
            }

            const pageNumber = item as number;
            const isActive = pageNumber === currentPage;

            return (
              <Link
                key={pageNumber}
                href={pageNumber === 1 ? `/` : `/page/${pageNumber}`}
                className={`px-3 py-2 text-sm font-medium rounded transition
    ${
      isActive
        ? "bg-primary text-white"
        : "text-muted-foreground hover:text-foreground hover:bg-muted"
    }
  `}
              >
                {pageNumber}
              </Link>
            );
          })}

          {/* Next Button */}
          {currentPage < totalPages && (
            <Link
              href={`${process.env.NEXT_PUBLIC_URL}/page/${currentPage + 1}`}
              className="flex items-center px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded transition"
            >
              <span className="hidden sm:inline">Next</span>
              <span className="inline sm:hidden">Next</span>
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          )}
        </nav>
      </div>
    </div>
  );
}
