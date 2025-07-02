import { EpisodeItem } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";


interface IEpisodeTerbaru {
  episodeTerbaru: EpisodeItem[];
}
export default function EpisodeTerbaru({ episodeTerbaru }: IEpisodeTerbaru) {
  return (
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
    </section>
  );
}
