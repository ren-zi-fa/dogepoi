"use client";

import Image from "next/image";
import Link from "next/link";
import SearchBar from "./SearchBar";

export default function Navbar() {
  return (
    <header className="w-full bg-background shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/shiba.png"
            alt="Logo"
            width={100}
            height={100}
            className="rounded-full"
          />
          <span className="hidden text-sm font-medium text-muted-foreground md:inline">
            DogePoi
          </span>
        </Link>

        <SearchBar />

        <div className="w-[80px] sm:w-[100px]"></div>
      </div>
    </header>
  );
}
