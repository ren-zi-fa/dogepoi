import { HentaiItem } from "@/types";

import { Card, CardContent } from "@/components/ui/card";

import Image from "next/image";
import Link from "next/link";

export default function HentaiTerbaru({
  hentaiTerbaru,
}: {
  hentaiTerbaru: HentaiItem[];
}) {
  return (
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
  );
}
