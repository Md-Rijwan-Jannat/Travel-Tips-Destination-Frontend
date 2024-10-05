import React, { Suspense } from "react";
import ManageContent from "../../_component/module/adminDashboard/manageContent";
import TableSkeleton from "@/src/components/ui/skeleton/tableSkeleton";

export default function PostManagement() {
  return (
    <Suspense fallback={<TableSkeleton />}>
      <ManageContent />
    </Suspense>
  );
}
