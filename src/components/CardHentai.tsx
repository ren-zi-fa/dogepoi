"use client";

import { Card, CardContent } from "@/components/ui/card";
import { EpisodeItem, HentaiItem } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  hentaiTerbaru: HentaiItem[];
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
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        items.push(i);
      }
    } else {
      // Complex pagination logic
      if (currentPage <= 4) {
        // Show: 1 2 3 4 5 ... 530
        for (let i = 1; i <= 5; i++) {
          items.push(i);
        }
        items.push('...');
        items.push(totalPages);
      } else if (currentPage >= totalPages - 3) {
        // Show: 1 ... 526 527 528 529 530
        items.push(1);
        items.push('...');
        for (let i = totalPages - 4; i <= totalPages; i++) {
          items.push(i);
        }
      } else {
        // Show: 1 ... 4 5 6 ... 530
        items.push(1);
        items.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          items.push(i);
        }
        items.push('...');
        items.push(totalPages);
      }
    }
    
    return items;
  };

  const paginationItems = generatePaginationItems();
  return (
    <div className="max-w-7xl mx-auto space-y-8 px-4 md:px-6 lg:px-8 pb-20">
      {/* Section: Hentai Terbaru - Horizontal Layout */}
      <section>
        <h2 className="text-xl md:text-2xl font-bold mb-6 text-foreground text-center md:text-left">
          Hentai Terbaru
        </h2>
        <div className="overflow-x-auto pb-4">
          <div className="flex gap-3 md:gap-4 justify-center md:justify-start min-w-max">
            {hentaiTerbaru.map((item, i) => {
              const linkFull = item.link;
              const slug = linkFull.replace("https://nekopoi.care/hentai/", "");
              return (
                <Link
                  key={i}
                  href={`${process.env.NEXT_PUBLIC_URL}/detail/${slug}`}
                  className="flex-shrink-0"
                >
                  <Card className="w-36 sm:w-40 md:w-44 lg:w-48 hover:shadow-lg hover:scale-105 transition-all duration-300 group h-full">
                    <div className="relative overflow-hidden rounded-t-md">
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={192}
                        height={270}
                        referrerPolicy="no-referrer"
                        unoptimized
                        className="object-cover object-center w-full h-48 sm:h-52 md:h-56 lg:h-60 group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                    </div>
                    <CardContent className="p-3 flex-1 flex flex-col justify-between">
                      <p className="text-xs sm:text-sm font-medium line-clamp-2 leading-tight text-center">
                        {item.title}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
        {/* Scroll indicator for mobile */}
        <div className="flex justify-center mt-2 md:hidden">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-muted-foreground/30 rounded-full"></div>
            <div className="w-6 h-2 bg-primary/60 rounded-full"></div>
            <div className="w-2 h-2 bg-muted-foreground/30 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Section: Episode Terbaru - Vertical Grid Layout */}
      <section>
        <h2 className="text-xl md:text-2xl font-bold mb-6 text-foreground text-center md:text-left">
          Episode Terbaru
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 justify-items-center">
          {episodeTerbaru.map((item, i) => {
            const linkFull = item.link;
            const slug = linkFull.replace("https://nekopoi.care/", "");
     
            return (
              <Link
                key={i}
                href={`${process.env.NEXT_PUBLIC_URL}/watch/${slug}`}
                className="group w-full max-w-sm"
              >
                <Card className="hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-card h-full flex flex-col">
                  <div className="relative overflow-hidden rounded-t-md">
                    <Image
                      referrerPolicy="no-referrer"
                      src={item.image}
                      alt={item.title}
                      width={300}
                      height={200}
                      unoptimized
                      className="object-cover object-center w-full h-44 sm:h-48 md:h-52 group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-primary/90 text-primary-foreground text-xs px-2 py-1 rounded-md backdrop-blur-sm text-center">
                        Tonton Sekarang
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-3 md:p-4 flex-1 flex flex-col justify-between">
                    <h3 className="text-sm md:text-base font-semibold line-clamp-2 mb-2 group-hover:text-primary transition-colors duration-300 text-center">
                      {item.title}
                    </h3>
                    <div className="flex items-center justify-between mt-auto">
                      <p className="text-xs md:text-sm text-muted-foreground">
                        {item.date}
                      </p>
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-8">
          <nav className="flex items-center space-x-1 sm:space-x-2">
            {/* Previous Button */}
            {currentPage > 1 && (
              <Link
                href={`${process.env.NEXT_PUBLIC_URL}/page/${currentPage - 1}`}
                className="flex items-center px-2 sm:px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors duration-200"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                <span className="hidden sm:inline">Previous</span>
                <span className="sm:hidden">Prev</span>
              </Link>
            )}

            {/* Page Numbers */}
            <div className="flex items-center space-x-1">
              {paginationItems.map((item, index) => {
                if (item === '...') {
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
                    href={
                      pageNumber === 1
                        ? `${process.env.NEXT_PUBLIC_URL}/`
                        : `${process.env.NEXT_PUBLIC_URL}/page/${pageNumber}`
                    }
                    className={`
                      px-2 sm:px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200
                      ${
                        isActive
                          ? 'bg-primary text-primary-foreground shadow-sm'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                      }
                    `}
                  >
                    {pageNumber}
                  </Link>
                );
              })}
            </div>

            {/* Next Button */}
            {currentPage < totalPages && (
              <Link
                href={`${process.env.NEXT_PUBLIC_URL}/page/${currentPage + 1}`}
                className="flex items-center px-2 sm:px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors duration-200"
              >
                <span className="hidden sm:inline">Next</span>
                <span className="sm:hidden">Next</span>
                <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            )}
          </nav>
        </div>
      </section>
    </div>
  );
}