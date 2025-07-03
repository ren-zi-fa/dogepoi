'use client';

import { Loader2 } from "lucide-react";
import { useParams } from 'next/navigation';
import useSWR from "swr";
import WatchAnime from "@/components/WatchingHentai";
import { WatchinAnime } from "@/types";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function WatchPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const { data, error, isLoading } = useSWR(
    slug ? `/api/watch/${slug}` : null,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
    }
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
          <p className="text-gray-600">Memuat player...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-500 text-lg">Gagal memuat data</p>
          <p className="text-gray-500 text-sm mt-2">Silakan coba lagi nanti</p>
        </div>
      </div>
    );
  }

  if (!data || !data.data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">Episode tidak ditemukan</p>
      </div>
    );
  }

  const watchData = data.data as WatchinAnime;

  return (
    <div className="mt-10">
      <WatchAnime {...watchData} />
    </div>
  );
}