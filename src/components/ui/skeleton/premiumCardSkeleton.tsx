import { Skeleton } from '@nextui-org/skeleton';
import React from 'react';

export default function PremiumCardSkeleton() {
  return (
    <div className="bg-default-50 rounded-md w-full h-[60px] flex items-center justify-between p-2">
      {' '}
      <div className="flex items-start gap-2">
        <Skeleton className="size-10 rounded-full" />
        <div className="flex items-start flex-col gap-2">
          <Skeleton className="h-5 w-[90px] rounded-lg" />
          <Skeleton className="h-3 w-[80px] rounded-lg" />
        </div>
      </div>
      <Skeleton className="h-6 w-[90px] rounded-full" />
    </div>
  );
}
