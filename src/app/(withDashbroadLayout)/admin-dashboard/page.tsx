import React, { Suspense } from "react";
import ProfileSkeleton from "@/src/components/ui/skeleton/profileSkeleton";
import AdminProfile from "../_component/module/adminDashboard/profile";

export default function AdminDashboard() {
  return (
    <Suspense fallback={<ProfileSkeleton />}>
      <AdminProfile />
    </Suspense>
  );
}
