"use client";

import { useSearchParams } from "next/navigation";
import useSWR from "swr";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { SearchResponse } from "@/types";
import PaginationSearch from "@/components/PaginationSearch";
import { fetcher } from "@/lib/utils";


export default function SearchResultPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const page = searchParams.get("page");

  const queryString = query
    ? `/api/search?q=${encodeURIComponent(query)}${page ? `&page=${page}` : ""}`
    : null;

  const { data, error, isLoading } = useSWR<SearchResponse>(queryString, fetcher, {
    suspense: false,
  });

  if (!query)
    return <p className="text-center mt-10">Masukkan kata kunci pencarian.</p>;
  if (isLoading) return <LoadingSkeleton />;
  if (error)
    return <p className="text-center mt-10 text-red-500">Gagal memuat data.</p>;
  if (!data || !data.data.length)
    return (
      <p className="text-center mt-10 h-screen">
        Tidak ada hasil ditemukan untuk: {query}
      </p>
    );

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-4">
      <h1 className="text-2xl font-bold">Hasil Pencarian: {data.query}</h1>

      {data.data.map((item, index) => {
        const slug = item.link.replace("https://nekopoi.care/", "");
        return (
          <Card className="flex flex-col md:flex-row overflow-hidden" key={index}>
            <div className="relative w-full md:w-48 h-48 md:h-auto">
              <Image
                src={item.image}
                alt={item.title}
                fill
                unoptimized
                referrerPolicy="no-referrer"
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 200px"
              />
            </div>
            <div className="flex-1 p-4 space-y-2">
              <CardHeader className="p-0">
                <Link href={`/watch/${slug}`} key={index}>
                  <h2 className="text-lg font-semibold">{item.title}</h2>
                </Link>
              </CardHeader>
              <CardContent className="p-0 text-sm text-muted-foreground">
                <p><strong>Durasi:</strong> {item.duration}</p>
                <p><strong>Genre:</strong> {item.genres.join(", ")}</p>
                <p><strong>Ukuran:</strong> {item.size}</p>
              </CardContent>
            </div>
          </Card>
        );
      })}
      <PaginationSearch pagination={data.pagination} query={query} />
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-4">
      <Skeleton className="h-8 w-1/2" />
      {[...Array(3)].map((_, i) => (
        <Card key={i} className="flex flex-col md:flex-row overflow-hidden">
          <Skeleton className="w-full md:w-48 h-48" />
          <div className="flex-1 p-4 space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-1/3" />
          </div>
        </Card>
      ))}
    </div>
  );
}
