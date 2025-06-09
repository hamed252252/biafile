import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="min-h-screen bg-background font-[Vazirmatn]" dir="rtl">
      <div className="container mx-auto px-4 py-6">
        <Skeleton className="h-6 w-96 mb-6" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <Skeleton className="aspect-[3/4] w-full rounded-lg" />
            <Skeleton className="h-4 w-48 mx-auto" />
          </div>

          <div className="space-y-6">
            <div>
              <Skeleton className="h-8 w-3/4 mb-4" />
              <div className="flex gap-2 mb-4">
                {[...Array(4)].map((_, i) => (
                  <Skeleton key={i} className="h-6 w-16" />
                ))}
              </div>
              <Skeleton className="h-4 w-48 mb-6" />
            </div>

            <div className="space-y-4">
              <Skeleton className="h-6 w-32" />
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-4 w-full" />
              ))}
            </div>

            <Skeleton className="h-px w-full" />

            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <Skeleton className="h-12 flex-1" />
                <Skeleton className="h-12 flex-1" />
              </div>
            </div>

            <div className="flex gap-4">
              <Skeleton className="h-9 w-32" />
              <Skeleton className="h-9 w-32" />
            </div>

            <Skeleton className="h-16 w-full rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}
