"use client";

import { fetcher } from "@/lib/utils";
import { AnimeResponse, GenreItem } from "@/types";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import useSWR from "swr";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function GenrePage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();

  const genre = params?.genre as string;
  const page = searchParams.get("page");

  const validPage = page && !isNaN(Number(page)) && Number(page) > 1;

  const swrUrl = genre
    ? validPage
      ? `/api/genre/${genre}?page=${page}`
      : `/api/genre/${genre}`
    : null;

  const { data, error, isLoading } = useSWR<AnimeResponse<GenreItem[]>>(
    swrUrl,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
    }
  );
  const handleNext = () => {
    if (data?.pagination?.hasNextPage) {
      const nextUrl = data.pagination.nextPageUrl;
      const nextPageMatch = nextUrl?.match(/page\/(\d+)/);
      const nextPage = nextPageMatch ? nextPageMatch[1] : null;
      if (nextPage) {
        router.push(`/genre/${genre}?page=${nextPage}`);
      }
    }
  };

  const handlePrev = () => {
    const prevPage = Math.max(Number(page) - 1, 1);
    router.push(`/genre/${genre}?page=${prevPage}`);
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="space-y-3">
            <Skeleton className="h-[200px] w-full rounded-md" />
            <Skeleton className="h-4 w-3/4 mx-4" />
            <Skeleton className="h-3 w-1/2 mx-4 mb-4" />
          </Card>
        ))}
      </div>
    );
  }

  if (error || !data?.success) {
    return (
      <p className="text-center text-red-500 mt-8 h-screen">
        Sepertinya Genre yang kamu cari tidak ada{"    "}
        <span className="underline text-blue-500">
          <Link href="/">Back</Link>
        </span>
      </p>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 capitalize text-center">
        {genre} Genre
      </h1>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="space-y-3">
              <Skeleton className="h-[200px] w-full rounded-md" />
              <Skeleton className="h-4 w-3/4 mx-4" />
              <Skeleton className="h-3 w-1/2 mx-4 mb-4" />
            </Card>
          ))}
        </div>
      ) : error || !data?.success ? (
        <p className="text-center text-red-500 mt-8">
          ❌ Failed to load data. check your connection{" "}
        </p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
            {data.data.map((item, idx) => {
              const url = item.url;
              const slug = url.replace("https://nekopoi.care/", "");

              return (
                <Card
                  key={idx}
                  className="flex flex-col overflow-hidden max-w-sm md:w-sm w-xs mx-auto"
                >
                  <div className="relative w-full h-[200px]">
                    <Image
                      src={item.thumbnail}
                      alt={item.title}
                      unoptimized
                      referrerPolicy="no-referrer"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardHeader>
                    <Link href={slug}>
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                    </Link>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-2">
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {item.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {item.genres.map((genre, i) => {
                        const decoded = decodeURIComponent(genre);

                        const lower = decoded.toLowerCase();

                        const slug = lower.replace(/\s+/g, "-");
                        return (
                          <Link href={`/genre/${slug}`} key={i}>
                            <Badge className="text-xs">{genre}</Badge>
                          </Link>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Pagination */}
          {data.pagination && (
            <div className="flex justify-center gap-4 mt-8">
              <Button
                variant="default"
                onClick={handlePrev}
                disabled={data.pagination.currentPage <= 1}
              >
                Prev
              </Button>
              <span className="text-sm text-muted-foreground pt-2">
                Page {data.pagination.currentPage} of{" "}
                {data.pagination.totalPages}
              </span>
              <Button
                variant="default"
                onClick={handleNext}
                disabled={!data.pagination.hasNextPage}
              >
                Next
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
