"use client";

import Image from "next/image";
import Link from "next/link";

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
          <span className="hidden sm:inline text-sm font-medium text-muted-foreground">
            DogePoi
          </span>
        </Link>

        <Link
          href={"/"}
          className="text-xl font-bold text-primary text-center absolute left-1/2 transform -translate-x-1/2"
        >
          Dogepoi
        </Link>

        <div className="w-[80px] sm:w-[100px]"></div>
      </div>
    </header>
  );
}
