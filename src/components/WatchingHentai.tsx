"use client";
import React, { useState } from "react";
import {
  Play,
  Clock,
  HardDrive,
  Building,
  AlertCircle,
  ChevronDown,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "@radix-ui/react-separator";
import { WatchinAnime } from "@/types";
import Image from "next/image";
import { Skeleton } from "./ui/skeleton";

export default function WatchAnime(props: WatchinAnime) {
  const {
    duration,
    genres,
    image,
    note,
    producer,
    sinopsis,
    size,
    sources_video,
    title,
  } = { ...props };

  const [selectedVideoIndex, setSelectedVideoIndex] = useState(0);
  const [isSourceDropdownOpen, setIsSourceDropdownOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header with better mobile spacing */}
      <div className="  bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 py-3 sm:py-4">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center text-slate-800 dark:text-slate-100 leading-tight">
            {title}
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
        {/* Mobile-first responsive grid */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 sm:gap-6 lg:gap-8">
          {/* Poster Section - Mobile: full width, Desktop: sidebar */}
          <div className="xl:col-span-4 2xl:col-span-3">
            <div className="overflow-hidden shadow-xl rounded-lg bg-white dark:bg-slate-800 sticky top-24">
              <div className="relative">
                {!loaded && <Skeleton className="absolute w-full h-full" />}
                {image && title && (
                  <Image
                    src={image}
                    alt={title}
                    width={400}
                    onLoad={() => setLoaded(true)}
                    height={600}
                    className="w-full h-[300px] sm:h-[400px] lg:h-[500px] xl:h-[600px] object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4">
                  <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-1 sm:mb-2 drop-shadow-lg leading-tight">
                    {title}
                  </h2>
                  {producer && (
                    <p className="text-xs sm:text-sm text-white/90 drop-shadow">
                      by {producer}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="xl:col-span-8 2xl:col-span-9 space-y-4 sm:space-y-6">
            {/* Video Player Card - Enhanced for mobile */}
            <div className="shadow-lg overflow-hidden rounded-lg bg-white dark:bg-slate-800">
              <div className="p-4 sm:p-6 pb-3 sm:pb-4 border-b border-slate-200 dark:border-slate-700">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                  <h3 className="flex items-center gap-2 text-lg sm:text-xl font-semibold">
                    <Play className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 flex-shrink-0" />
                    <span className="leading-tight">Watch Now</span>
                  </h3>

                  {/* Enhanced Video Source Selector */}
                  {sources_video && sources_video.length > 1 && (
                    <div className="relative">
                      <button
                        className="flex items-center gap-2 w-full sm:w-auto justify-between px-3 py-2 text-sm border rounded-md hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                        onClick={() =>
                          setIsSourceDropdownOpen(!isSourceDropdownOpen)
                        }
                      >
                        <span className="text-xs sm:text-sm">
                          Source {selectedVideoIndex + 1}
                        </span>
                        <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4" />
                      </button>

                      {isSourceDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-full sm:w-32 bg-white dark:bg-slate-800 border rounded-md shadow-lg z-20">
                          {sources_video.map((_, index) => (
                            <button
                              key={index}
                              className={`w-full px-3 py-2 text-left text-xs sm:text-sm hover:bg-slate-100 dark:hover:bg-slate-700 first:rounded-t-md last:rounded-b-md transition-colors ${
                                selectedVideoIndex === index
                                  ? "bg-slate-100 dark:bg-slate-700"
                                  : ""
                              }`}
                              onClick={() => {
                                setSelectedVideoIndex(index);
                                setIsSourceDropdownOpen(false);
                              }}
                            >
                              Source {index + 1}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="p-4 sm:p-6 pt-0">
                <div className="relative">
                  {/* Video Container with better aspect ratio handling */}
                  <div className="aspect-video bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden shadow-inner">
                    {sources_video &&
                    sources_video.length > 0 &&
                    sources_video[selectedVideoIndex] ? (
                      <iframe
                        key={selectedVideoIndex}
                        src={sources_video[selectedVideoIndex]}
                        className="w-full h-full border-0"
                        allowFullScreen
                        sandbox="allow-scripts allow-same-origin allow-presentation"
                        title={`Watch ${title} - Source ${
                          selectedVideoIndex + 1
                        }`}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="text-center p-4">
                          <Play className="h-8 w-8 sm:h-12 sm:w-12 mx-auto mb-2 text-slate-400" />
                          <p className="text-slate-600 text-sm sm:text-base">
                            No video sources available
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

          
                </div>

                {/* Video Source Info */}
                {sources_video && sources_video.length > 0 && (
                  <div className="mt-2 sm:mt-3 text-xs text-slate-500 text-center sm:text-left">
                    Current source: {selectedVideoIndex + 1} of{" "}
                    {sources_video.length}
                  </div>
                )}
              </div>
            </div>

            {/* Enhanced Info Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Details Card */}
              <Card className="shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                    <Building className="h-4 w-4 text-primary" />
                    Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-start gap-3">
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-400 flex-shrink-0">
                      Producer:
                    </span>
                    <span className="text-sm text-right break-words">
                      {producer || "N/A"}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center gap-3">
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-400 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      Duration:
                    </span>
                    <span className="text-sm">{duration || "N/A"}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center gap-3">
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-400 flex items-center gap-1">
                      <HardDrive className="h-3 w-3" />
                      Size:
                    </span>
                    <span className="text-sm">{size || "N/A"}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Genres Card */}
              {Array.isArray(genres) &&
                genres.length > 0 &&
                genres.some(
                  (genre) => genre && String(genre).trim() !== ""
                ) && (
                  <div className="shadow-md hover:shadow-lg transition-shadow rounded-lg bg-white dark:bg-slate-800">
                    <div className="p-4 sm:p-6 pb-3 border-b border-slate-200 dark:border-slate-700">
                      <h3 className="text-base sm:text-lg font-semibold">
                        Genres
                      </h3>
                    </div>
                    <div className="p-4 sm:p-6">
                      <div className="flex flex-wrap gap-2">
                        {genres
                          .filter(
                            (genre) => genre && String(genre).trim() !== ""
                          )
                          .map((genre, index) => (
                            <span
                              key={`genre-${index}`}
                              className="inline-block bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs px-2 py-1 rounded-full hover:bg-blue-500 hover:text-white transition-colors cursor-default"
                            >
                              {String(genre).trim()}
                            </span>
                          ))}
                      </div>
                    </div>
                  </div>
                )}
            </div>

            {/* Synopsis Card */}
            <div className="shadow-md hover:shadow-lg transition-shadow rounded-lg bg-white dark:bg-slate-800">
              <div className="p-4 sm:p-6 pb-3 sm:pb-4 border-b border-slate-200 dark:border-slate-700">
                <h3 className="text-base sm:text-lg font-semibold">Synopsis</h3>
              </div>
              <div className="p-4 sm:p-6">
                <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                  {sinopsis || "No synopsis available."}
                </p>
              </div>
            </div>

            {/* Note Card */}
            {note && (
              <div className="shadow-md border border-amber-200 bg-amber-50 dark:bg-amber-950 dark:border-amber-800 hover:shadow-lg transition-shadow rounded-lg">
                <div className="p-4 sm:p-6">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-amber-800 dark:text-amber-200 mb-1 text-sm sm:text-base">
                        Important Note
                      </p>
                      <p className="text-xs sm:text-sm text-amber-700 dark:text-amber-300 leading-relaxed">
                        {note}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
