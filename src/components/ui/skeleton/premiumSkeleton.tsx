import { Skeleton } from '@nextui-org/skeleton';
import React from 'react';
import PremiumCardSkeleton from './premiumCardSkeleton';

export default function PremiumSkeleton() {
  // Create an array of length 10
  const skeletonArray = Array.from({ length: 8 });

  return (
    <div className="grid grid-cols-1 gap-5 mt-2">
      {skeletonArray.map((_, index) => (
        <PremiumCardSkeleton key={index} />
      ))}
    </div>
  );
}
