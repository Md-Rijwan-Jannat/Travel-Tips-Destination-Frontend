"use client";

import React from "react";
import { useGetMeQuery } from "@/src/redux/features/auth/authApi";
import { TUser } from "@/src/types";
import Profile from "./Profile";
import { useGetSingleUserQuery } from "@/src/redux/features/user/userApi";

interface TPublicProfileProps {
  userId: string;
}

export default function PublicProfile({ userId }: TPublicProfileProps) {
  const { data: userData } = useGetSingleUserQuery(userId);
  const user = userData?.data as TUser;

  console.log(user);

  return (
    <div>
      <Profile user={user} />
    </div>
  );
}
