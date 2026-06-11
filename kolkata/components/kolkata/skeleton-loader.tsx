'use client';

export function SkeletonLoader() {
  return (
    <div className="animate-pulse">
      <div className="h-12 bg-muted rounded mb-4" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-card rounded-lg p-4 space-y-3">
            <div className="h-40 bg-muted rounded" />
            <div className="h-4 bg-muted rounded w-3/4" />
            <div className="h-4 bg-muted rounded w-1/2" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function CardSkeletonLoader() {
  return (
    <div className="animate-pulse bg-card rounded-lg p-4">
      <div className="h-48 bg-muted rounded mb-4" />
      <div className="h-6 bg-muted rounded mb-2 w-3/4" />
      <div className="h-4 bg-muted rounded mb-3 w-1/2" />
      <div className="h-4 bg-muted rounded w-full" />
    </div>
  );
}
