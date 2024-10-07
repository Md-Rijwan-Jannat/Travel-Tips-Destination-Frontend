import React from "react";
import PublicProfile from "../../../_component/module/publicProfile";

interface TPublicProfilePageProps {
  params: {
    profileId: string;
  };
}

export default function PublicProfilePage({ params }: TPublicProfilePageProps) {
  const userId = params.profileId;

  return (
    <div>
      <PublicProfile userId={userId} />
    </div>
  );
}
