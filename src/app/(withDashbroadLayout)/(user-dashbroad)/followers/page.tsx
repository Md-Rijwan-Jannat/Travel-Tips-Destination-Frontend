"use client";

import React, { Suspense } from "react";
import TableSkeleton from "@/src/components/ui/skeleton/tableSkeleton";
import Followers from "../../_component/module/userProfile/followers";

export default function FollowersPage() {
  return (
    <Suspense fallback={<TableSkeleton />}>
      <Followers />
    </Suspense>
  );
}
