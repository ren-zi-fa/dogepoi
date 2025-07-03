import SearchResultPage from "@/components/SearchResult";
import { Suspense } from "react";

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="text-center py-10">Loading hasil pencarian...</div>}>
      <SearchResultPage />
    </Suspense>
  );
}
