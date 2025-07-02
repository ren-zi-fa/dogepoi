"use client";

import { Card, CardContent } from "@/components/ui/card";
import { EpisodeItem, HentaiItem } from "@/types";
import Image from "next/image";
import Link from "next/link";

type Props = {
  hentaiTerbaru: HentaiItem[];
  episodeTerbaru: EpisodeItem[];
};

export default function AnimeHentai({ hentaiTerbaru, episodeTerbaru }: Props) {
  return (
    <div className="space-y-8 px-4 md:px-6 lg:px-8 pb-20">
      {/* Section: Hentai Terbaru - Horizontal Layout */}
      <section>
        <h2 className="text-xl md:text-2xl font-bold mb-4 text-foreground">
          Hentai Terbaru
        </h2>
        <div className="overflow-x-auto pb-4">
          <div className="flex gap-3 md:gap-4 min-w-max">
            {hentaiTerbaru.map((item, i) => {
              const linkFull = item.link;
              const slug = linkFull.replace("https://nekopoi.care/hentai/", "");
              return (
                <Link
                  key={i}
                  href={`${process.env.NEXT_PUBLIC_URL}/detail/${slug}`}
                  className="flex-shrink-0"
                >
                  <Card className="w-32 sm:w-36 md:w-40 lg:w-44 hover:shadow-lg hover:scale-105 transition-all duration-300 group">
                    <div className="relative overflow-hidden rounded-t-md">
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={176}
                        height={248}
                        referrerPolicy="no-referrer"
                        unoptimized
                        className="object-cover w-full h-44 sm:h-48 md:h-52 lg:h-56 group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                    </div>
                    <CardContent className="p-2">
                      <p className="text-xs sm:text-sm font-medium line-clamp-2 leading-tight">
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
        <h2 className="text-xl md:text-2xl font-bold mb-4 text-foreground">
          Episode Terbaru
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {episodeTerbaru.map((item, i) => {
            const linkFull = item.link;
            const slug = linkFull.replace("https://nekopoi.care/hentai/", "");
            return (
              <Link
                key={i}
                href={`${process.env.NEXT_PUBLIC_URL}/detail/${slug}`}
                className="group"
              >
                <Card className="hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-card">
                  <div className="relative overflow-hidden rounded-t-md">
                    <Image
                      referrerPolicy="no-referrer"
                      src={item.image}
                      alt={item.title}
                      width={300}
                      height={169}
                      unoptimized
                      className="object-cover w-full h-40 sm:h-44 md:h-48 group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-primary/90 text-primary-foreground text-xs px-2 py-1 rounded-md backdrop-blur-sm">
                        Tonton Sekarang
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-3 md:p-4">
                    <h3 className="text-sm md:text-base font-semibold line-clamp-2 mb-2 group-hover:text-primary transition-colors duration-300">
                      {item.title}
                    </h3>
                    <div className="flex items-center justify-between">
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

        {/* Load more button placeholder */}
        <div className="flex justify-center mt-8">
          <button className="px-6 py-2 bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-md transition-colors duration-300 text-sm md:text-base">
            Muat Lebih Banyak
          </button>
        </div>
      </section>
    </div>
  );
}
