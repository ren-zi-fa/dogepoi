'use client';

import { Loader2 } from 'lucide-react';
import useSWR from 'swr';
import AnimeHentai from "@/components/CardHentai";
import { AnimeResponse, AnimeResponseData } from "@/types";
import { fetcher } from '@/lib/utils';



export default function HomePage() {
  const { data, error, isLoading } = useSWR<AnimeResponse<AnimeResponseData>>(
    '/api/home',
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
          <p className="text-gray-600">Memuat data...</p>
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

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">Tidak ada data tersedia</p>
      </div>
    );
  }

  return (
    <div className="mt-10">
      <AnimeHentai
        hentaiTerbaru={data.data.hentaiTerbaru}
        episodeTerbaru={data.data.episodeTerbaru}
      />
    </div>
  );
}