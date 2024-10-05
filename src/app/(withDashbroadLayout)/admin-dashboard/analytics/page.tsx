import React, { Suspense } from "react";
import Analytics from "../../_component/module/adminDashboard/analytics";

export default function AnalyticsPage() {
  return (
    <Suspense fallback={<p>loading...</p>}>
      <Analytics />
    </Suspense>
  );
}
