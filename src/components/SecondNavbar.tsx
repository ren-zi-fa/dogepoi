"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { Bookmark } from "lucide-react";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Hentai", href: "/category/hentai" },
  { name: "2D animation", href: "/category/2d-animation" },
  { name: "3D Hentai", href: "/category/3d-hentai" },
  { name: "Genre List", href: "/genre-list" },
  { name: "Coming Soon Hentai", href: "/coming-soon" },
];

export default function SecondNavbar() {
  const pathname = usePathname();

  return (
    <div className="container mx-auto px-4 py-3 shadow-sm flex justify-between items-center flex-wrap dark:bg-gray-900 bg-gray-100 rounded-b-xl">
      {/* Kiri: Nav items */}
      <div className="flex flex-wrap gap-2 items-center">
        {navItems.map((item, index) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={index}
              href={item.href}
              className={clsx(
                "text-sm font-medium transition-colors px-3 py-1 rounded-md",
                {
                  "text-blue-600 font-bold bg-white shadow": isActive,
                  "text-slate-800 dark:text-slate-200 hover:text-blue-500":
                    !isActive,
                }
              )}
            >
              {item.name}
            </Link>
          );
        })}
      </div>

      {/* Kanan: Bookmark link */}
      <div>
        <Link
          href="/bookmark"
          className={clsx(
            "flex items-center gap-1 px-3 py-1 rounded-md text-sm font-medium transition-colors",
            {
              "text-blue-600 font-bold bg-white shadow":
                pathname === "/bookmark",
              "text-slate-800 dark:text-slate-200 hover:text-blue-500":
                pathname !== "/bookmark",
            }
          )}
        >
          <Bookmark className="w-4 h-4" />
          My Bookmark
        </Link>
      </div>
    </div>
  );
}
