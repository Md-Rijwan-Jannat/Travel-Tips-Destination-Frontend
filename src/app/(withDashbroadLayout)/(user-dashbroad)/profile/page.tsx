import React, { Suspense } from "react";
import UserProfile from "../../_component/module/userProfile";

export default function Profile() {
  return (
    <Suspense fallback={<p>loading...</p>}>
      <UserProfile />
    </Suspense>
  );
}
