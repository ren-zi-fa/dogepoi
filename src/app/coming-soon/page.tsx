"use client";

import { fetcher } from "@/lib/utils";
import { AnimeResponse, ComingSoonItem } from "@/types";
import useSWR from "swr";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

export default function ComingSoonPage() {
  const { data, error, isLoading } = useSWR<AnimeResponse<ComingSoonItem[]>>(
    `/api/coming-soon`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
    }
  );

  if (error) {
    return (
      <div className="text-center py-10 text-red-500">
        Terjadi kesalahan saat memuat data. Silakan coba lagi.
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-semibold mb-6 text-center">
        Coming Soon 🔥
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {isLoading
          ? Array.from({ length: 10 }).map((_, index) => (
              <Skeleton key={index} className="h-[300px] w-full rounded-xl" />
            ))
          : data?.data?.map((item, index) => (
              <Link href={item.url} key={index}>
                <Card className="hover:shadow-lg transition duration-200 rounded-xl overflow-hidden">
                  <div className="relative w-full h-[200px]">
                    <Image
                      src={item.thumbnail}
                      alt={item.title}
                      fill
                      unoptimized
                      referrerPolicy="no-referrer"
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-3">
                    <h2 className="text-sm font-semibold line-clamp-2 mb-1">
                      {item.title}
                    </h2>
                    <p className="text-xs text-muted-foreground">
                      Episode: {item.episode}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Rilis: {item.releaseDate}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
      </div>
    </div>
  );
}
