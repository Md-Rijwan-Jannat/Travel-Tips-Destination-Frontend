import React, { Suspense } from "react";
import AllUsers from "../../_component/module/adminDashboard/manageUser";

export default function UserManagement() {
  return (
    <Suspense fallback={<p>loading...</p>}>
      <AllUsers />
    </Suspense>
  );
}
