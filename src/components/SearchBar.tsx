"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import Select from "react-select";
import debounce from "lodash.debounce";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState, useRef } from "react";
import Image from "next/image";
import type { SearchResult } from "@/types/index";
import Link from "next/link";
import {  X } from "lucide-react";
import { Button } from "./ui/button";

interface Option {
  label: string;
  value: string;
  image: string;
}

const CustomOption = (props: any) => {
  const { data, innerRef, innerProps } = props;
  return (
    <div
      ref={innerRef}
      {...innerProps}
      className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 cursor-pointer"
    >
      <Link href={`/watch/${data.value}`}>
        <div className="w-12 h-12 relative bg-gray-200 rounded-lg overflow-hidden z-30">
          <Image
            src={data.image}
            alt={data.label}
            fill
            referrerPolicy="no-referrer"
            unoptimized
            className="object-cover"
            sizes="48px"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = "none";
            }}
          />
        </div>
      </Link>
      <div className="text-sm text-gray-800 flex-1 truncate">{data.label}</div>
    </div>
  );
};

export default function SearchBar() {
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState<Option[]>([]);
  const [loading, setLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const selectRef = useRef<any>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const fetchResults = useCallback(
    debounce(async (query: string) => {
      if (!query) {
        setOptions([]);
        return;
      }

      setLoading(true);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/api/search?q=${encodeURIComponent(
            query
          )}`
        );
        const data = await res.json();
        const results: SearchResult[] = data.data || [];

        setOptions(
          results.map((item) => ({
            label: item.title,
            value: item.link,
            image: item.image,
          }))
        );
      } catch (err) {
        console.error("Search error:", err);
        setOptions([]);
      } finally {
        setLoading(false);
      }
    }, 500),
    []
  );

  useEffect(() => {
    if (isMounted) {
      fetchResults(inputValue);
    }
  }, [inputValue, fetchResults, isMounted]);

  useEffect(() => {
    return () => {
      fetchResults.cancel();
    };
  }, [fetchResults]);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && inputValue.trim()) {
      event.preventDefault();
      router.push(`/search?q=${encodeURIComponent(inputValue.trim())}`);
    }
  };

  

  const handleClear = () => {
    setInputValue("");
    setOptions([]);
    // Clear input field secara langsung
    if (selectRef.current?.inputRef) {
      selectRef.current.inputRef.value = "";
    }
    // Focus kembali ke input
    if (selectRef.current?.focus) {
      selectRef.current.focus();
    }
  };

  if (!isMounted) {
    return (
      <div className="w-full max-w-md mx-auto">
        <div className="h-12 bg-gray-100 rounded-lg animate-pulse"></div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto relative">
      {/* Tombol X */}
      {inputValue.length > 0 && (
        <Button
          onClick={handleClear}
          variant="destructive"
          className="absolute z-20 size-auto p-2 right-2 top-1/2 -translate-y-1/2 text-white"
          type="button"
        >
          <X size={16} />
        </Button>
      )}


      <Select
        ref={selectRef}
        className="pl-8"
        inputValue={inputValue}
        onInputChange={(value) => setInputValue(value)}
        onKeyDown={handleKeyDown}
        options={options}
        isLoading={loading}
        placeholder="enter untuk search...."
        noOptionsMessage={() =>
          loading
            ? "Mencari..."
            : inputValue
            ? "Tidak ditemukan"
            : "Mulai ketik..."
        }
        onChange={(selected) => {
          if (selected) {
            const url = new URL(selected.value);
            const slug = url.pathname.split("/").filter(Boolean).pop();
            router.push(`/watch/${slug}`);
          }
        }}
        components={{ Option: CustomOption, DropdownIndicator: () => null }}
        isClearable={false}
        styles={{
          control: (base) => ({
            ...base,
            borderRadius: "0.5rem",
            borderColor: "#e5e7eb",
            minHeight: "1rem",
            backgroundColor: "#ffffff",
          }),
          input: (base) => ({
            ...base,
            color: "#1f2937",
          }),
          placeholder: (base) => ({
            ...base,
            color: "#6b7280",
          }),
          singleValue: (base) => ({
            ...base,
            color: "#1f2937",
          }),
          menu: (base) => ({
            ...base,
            zIndex: 9999,
          }),
        }}
        instanceId="search-select"
        classNamePrefix="react-select"
        menuPortalTarget={
          typeof document !== "undefined" ? document.body : null
        }
        menuPosition="fixed"
      />
    </div>
  );
}
