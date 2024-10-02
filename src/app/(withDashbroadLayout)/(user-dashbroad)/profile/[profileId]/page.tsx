import React, { Suspense } from "react";
import PublicProfile from "../../../_component/module/publicProfile";

interface TPublicProfilePageProps {
  params: {
    profileId: string;
  };
}

export default function PublicProfilePage({ params }: TPublicProfilePageProps) {
  const userId = params.profileId;

  return (
    <Suspense fallback={<p>loading...</p>}>
      <PublicProfile userId={userId} />
    </Suspense>
  );
}
