import React, { Suspense } from "react";
import UserProfile from "../../_component/module/userProfile";
import ProfileSkeleton from "@/src/components/ui/skeleton/profileSkeleton";

export default function Profile() {
  return (
    <Suspense fallback={<ProfileSkeleton />}>
      <UserProfile />
    </Suspense>
  );
}
