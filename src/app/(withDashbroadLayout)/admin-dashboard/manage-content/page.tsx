import React, { Suspense } from "react";
import ManageContent from "../../_component/module/adminDashboard/manageContent";

export default function PostManagement() {
  return (
    <Suspense fallback={<p>loading...</p>}>
      <ManageContent />
    </Suspense>
  );
}
