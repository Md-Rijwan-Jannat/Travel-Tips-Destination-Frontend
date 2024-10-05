import React, { Suspense } from "react";
import ManagePayments from "../../_component/module/adminDashboard/payment";
import TableSkeleton from "@/src/components/ui/skeleton/tableSkeleton";

export default function Payment() {
  return (
    <Suspense fallback={<TableSkeleton />}>
      <ManagePayments />
    </Suspense>
  );
}
