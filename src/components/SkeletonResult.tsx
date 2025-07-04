import { Card } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

export default function LoadingSkeleton() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-4">
      <Skeleton className="h-8 w-1/2" />
      {[...Array(3)].map((_, i) => (
        <Card key={i} className="flex flex-col md:flex-row overflow-hidden">
          <Skeleton className="w-full md:w-48 h-48" />
          <div className="flex-1 p-4 space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-1/3" />
          </div>
        </Card>
      ))}
    </div>
  );
}