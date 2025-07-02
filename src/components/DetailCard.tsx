"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { AnimeDetail } from "@/types";
import Link from "next/link";

interface Props {
  data: AnimeDetail;
}

export const HentaiDetailCard = ({ data }: Props) => {
  const url = data.latestEpisode.link;
  const slug = url.replace(/\/$/, "").split("/").pop();

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-xl">{data.title}</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Gambar dan info */}
        <div className="flex flex-col items-center space-y-2">
          <Image
            src={data.image}
            alt={data.title}
            width={204}
            height={300}
            unoptimized
            referrerPolicy="no-referrer"
            className="rounded-lg shadow-md object-cover"
          />
          <div className="text-sm text-muted-foreground">
            {data.info?.Tayang}
          </div>
          <div className="text-sm text-muted-foreground">
            {data.info?.Durasi}
          </div>
          <div className="text-sm text-muted-foreground">
            Skor: {data.info?.Skor}
          </div>
        </div>

        {/* Sinopsis */}
        <div className="col-span-2">
          <h3 className="font-semibold text-lg mb-2">Sinopsis</h3>
          <p className="text-sm text-muted-foreground">{data.sinopsis}</p>

          <h3 className="font-semibold text-lg mt-6 mb-2">Genres</h3>
          <div className="flex flex-wrap gap-2">
            {data.genres.map((genre) => (
              <Badge key={genre}>{genre}</Badge>
            ))}
          </div>

          <h3 className="font-semibold text-lg mt-6 mb-2">Episode Terbaru</h3>
          <div className="text-sm">
            <strong>{data.latestEpisode.title}</strong> —{" "}
            <Link
              href={`/watch/${slug}`}
              className="text-blue-500 underline"
          
            >
              watch
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
