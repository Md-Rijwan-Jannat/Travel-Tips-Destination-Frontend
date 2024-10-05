import { Skeleton } from "@nextui-org/skeleton";
import React from "react";

export default function TableSkeleton() {
  return (
    <div className="flex items-center justify-center h-[80vh]">
      <div className="flex flex-col items-center justify-center gap-3">
        <Skeleton className="rounded-full w-[200px] h-4 md:h-6 mb-4" />
        <Skeleton className="rounded-full w-[130px] h-4 md:h-6 mb-4" />
      </div>
    </div>
  );
}
