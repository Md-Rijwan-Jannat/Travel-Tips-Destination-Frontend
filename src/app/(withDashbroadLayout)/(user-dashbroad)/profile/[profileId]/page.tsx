import React, { Suspense } from "react";
import PublicProfile from "../../../_component/module/publicProfile";
import ProfileSkeleton from "@/src/components/ui/skeleton/profileSkeleton";

interface TPublicProfilePageProps {
  params: {
    profileId: string;
  };
}

export default function PublicProfilePage({ params }: TPublicProfilePageProps) {
  const userId = params.profileId;

  return (
    <Suspense fallback={<ProfileSkeleton />}>
      <PublicProfile userId={userId} />
    </Suspense>
  );
}
