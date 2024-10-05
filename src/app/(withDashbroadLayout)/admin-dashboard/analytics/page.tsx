import React, { Suspense } from "react";
import Analytics from "../../_component/module/adminDashboard/analytics";
import TableSkeleton from "@/src/components/ui/skeleton/tableSkeleton";

export default function AnalyticsPage() {
  return (
    <Suspense fallback={<TableSkeleton />}>
      <Analytics />
    </Suspense>
  );
}
