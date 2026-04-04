import React from "react";

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = "" }: SkeletonProps) {
  return (
    <div className={`bg-white/5 animate-pulse rounded-md ${className}`} />
  );
}

export function MovieCardSkeleton() {
  return (
    <div className="aspect-[2/3] rounded-xl overflow-hidden glass border border-white/5 flex flex-col">
      <Skeleton className="flex-grow w-full" />
    </div>
  );
}

export function GridSkeleton({ count = 5 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <MovieCardSkeleton key={i} />
      ))}
    </div>
  );
}
