import { Skeleton } from "@nextui-org/skeleton";
import React from "react";

export default function PremiumSkeleton() {
  // Create an array of length 10
  const skeletonArray = Array.from({ length: 9 });

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 gap-5 mt-5">
        {skeletonArray.map((_, index) => (
          <Skeleton key={index} className="rounded-md w-full h-[54px]" />
        ))}
      </div>
    </div>
  );
}
