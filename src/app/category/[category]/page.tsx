"use client";

import List2D from "@/components/2D-animationList";
import HentaiCardList from "@/components/HentaiList";
import { fetcher } from "@/lib/utils";
import { useParams, useSearchParams } from "next/navigation";
import useSWR from "swr";
import { useEffect, useState } from "react";
import List3D from "@/components/3D-Hentailist";

export default function CategoryPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const page = searchParams.get("page");

  const category = params.category as string;
  const [currentCategory, setCurrentCategory] = useState<string | null>(null);

  const validPage = page && !isNaN(Number(page)) && Number(page) > 1;

  const swrUrl = category
    ? validPage
      ? `/api/category/${category}?page=${page}`
      : `/api/category/${category}`
    : null;

  // Gunakan category sebagai key untuk SWR agar cache terpisah per kategori
  const swrKey = swrUrl ? [swrUrl, category] : null;

  const { data, error, isLoading } = useSWR(swrKey, ([url]) => fetcher(url), {
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
    // Opsi untuk memastikan data fresh ketika key berubah
    dedupingInterval: 0,
    // Fallback data kosong untuk mencegah undefined
    fallbackData: null,
  });

  // Reset state ketika kategori berubah
  useEffect(() => {
    if (category !== currentCategory) {
      setCurrentCategory(category);
    }
  }, [category, currentCategory]);

  // Validasi kategori yang didukung
  const validCategories = ["hentai", "2d-animation","3d-hentai"];
  const isValidCategory = validCategories.includes(category);


  // Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
          <p className="text-muted-foreground">Memuat konten...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="text-center text-red-500 p-4">
        <p>Terjadi kesalahan saat memuat data: {error.message}</p>
      </div>
    );
  }

  // Invalid category
  if (!isValidCategory) {
    return (
      <div className="text-center p-8">
        <p className="text-muted-foreground text-lg">
          Kategori : {category} tidak ditemukan
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          Kategori yang tersedia: {validCategories.join(", ")}
        </p>
      </div>
    );
  }

  // Render konten berdasarkan kategori
  return (
    <>
      {category === "hentai" && (
        <HentaiCardList
          response={data}
          basePath={`/category/${category}`}
          isLoading={isLoading}
        />
      )}

      {category === "2d-animation" && (
        <List2D
          response={data}
          basePath={`/category/${category}`}
          isLoading={isLoading}
        />
      )}
      {category === "3d-hentai" && (
        <List3D
          response={data}
          basePath={`/category/${category}`}
          isLoading={isLoading}
        />
      )}
    </>
  );
}
