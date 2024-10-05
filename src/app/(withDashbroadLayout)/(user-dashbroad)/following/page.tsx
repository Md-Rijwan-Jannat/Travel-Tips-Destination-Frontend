"use client";

import TableSkeleton from "@/src/components/ui/skeleton/tableSkeleton";
import React, { Suspense } from "react";
import Following from "../../_component/module/userProfile/following";

export default function FollowingPage() {
  return (
    <Suspense fallback={<TableSkeleton />}>
      <Following />
    </Suspense>
  );
}
