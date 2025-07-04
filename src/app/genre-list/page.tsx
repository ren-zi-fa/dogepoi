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
          <Loader2 className="h-8 w-8 animate-spin text-blue-500 dark:text-blue-400" />
          <p className="text-gray-600 dark:text-gray-300">
            Memuat halaman data...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-500 text-lg dark:text-red-400">
            Gagal memuat data
          </p>
          <p className="text-gray-500 text-sm mt-2 dark:text-gray-400">
            Silakan coba refresh
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl py-6 container px-4 mx-auto shadow-sm border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
      <h1 className="mb-10 text-3xl font-bold text-center uppercase text-gray-900 dark:text-white">
        Genre List
      </h1>

      <div className="min-h-screen grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {data?.data.map((item, idx) => {
          const decoded = decodeURIComponent(item.name);
          const lower = decoded.toLowerCase();
          const slug = lower.replace(/\s+/g, "-");

          return (
            <Link href={`/genre/${slug}`} key={idx}>
              <div className="bg-slate-100 dark:bg-slate-800 dark:hover:bg-blue-600 hover:bg-blue-500 hover:text-white dark:hover:text-white text-center px-3 py-2 text-sm rounded-lg transition text-gray-800 dark:text-gray-200">
                {item.name}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
