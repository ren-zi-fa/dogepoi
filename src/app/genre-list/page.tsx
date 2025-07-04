"use client";

import { fetcher } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import useSWR from "swr";
interface GenreItem {
  name: string;
  slug: string;
  url: string;
}

type GenreResponse = {
  data: GenreItem[];
};
export default function GenreListPage() {
  const { data, isLoading, error } = useSWR<GenreResponse>(
    "/api/genre-list",
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
          <p className="text-gray-600">Memuat halaman data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-500 text-lg">Gagal memuat data</p>
          <p className="text-gray-500 text-sm mt-2">Silakan coba refresh</p>
        </div>
      </div>
    );
  }
  return (
    <div className="max-w-6xl px-4 py-6 bg-white border-2 shadow-sm grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mx-auto">
      {data?.data.map((item, idx) => {
        const decoded = decodeURIComponent(item.name); 
        const lower = decoded.toLowerCase();
        const slug = lower.replace(/\s+/g, "-");
        return (
          <Link href={`/genre/${slug}`} key={idx}>
            <div className="bg-slate-100 hover:bg-blue-500 hover:text-white text-center px-3 py-2 text-sm rounded-lg transition">
              {item.name}
            </div>
          </Link>
        );
      })}
    </div>
  );
}
