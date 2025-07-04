"use client";

import Image from "next/image";
import Link from "next/link";
import SearchBar from "./SearchBar";

export default function Navbar() {
  return (
    <header className=" bg-background shadow-sm">
      <div className="container mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-2 dark:bg-gray-800 rounded-t-xl">
        {/* Logo + Title */}
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/shiba.png"
            alt="Logo"
            width={40}
            height={40}
            className="rounded-full"
          />
          <span className="text-base font-semibold text-muted-foreground hidden sm:inline">
            DogePoi
          </span>
        </Link>

        {/* Search bar */}
        <div className="flex-1 min-w-[200px] max-w-md">
          <SearchBar />
        </div>
      </div>
    </header>
  );
}
