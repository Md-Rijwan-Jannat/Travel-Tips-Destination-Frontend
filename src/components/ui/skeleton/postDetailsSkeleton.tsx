import { Skeleton } from '@nextui-org/skeleton';

export default function PostDetailsSkeleton() {
  return (
    <div className="w-full md:w-[500px] xl:w-[600px] mx-auto bg-default-50 rounded-md p-2 md:p-6">
      {/* Post Header Skeleton */}
      <div className="flex justify-between items-center gap-2">
        <div className="flex items-center space-x-4">
          <Skeleton className="rounded-full w-12 h-12" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </div>
        <div>
          <Skeleton className="rounded-full size-6" />
        </div>
      </div>

      {/* Post Content Skeleton */}
      <div className="mt-4 space-y-2">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-6 w-2/3" />
      </div>

      {/* Post Images Skeleton */}
      <div className="mt-4">
        <Skeleton className="w-full h-64 rounded-md" />
      </div>

      {/* Post Actions Skeleton */}
      <div className="mt-6 flex items-center justify-between">
        <Skeleton className="h-6 w-1/4" />
        <Skeleton className="h-6 w-1/4" />
        <Skeleton className="h-6 w-1/4" />
      </div>

      {/* Comments Section Skeleton */}
      <div className="mt-6 space-y-4">
        <div className="flex items-start space-x-3">
          <Skeleton className="rounded-full w-10 h-10" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-3 w-full" />
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <Skeleton className="rounded-full w-10 h-10" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-3 w-full" />
          </div>
        </div>

        <Skeleton className="h-10 w-full rounded-md" />
      </div>
    </div>
  );
}
