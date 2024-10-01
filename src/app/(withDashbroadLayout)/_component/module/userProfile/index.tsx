"use client";

import React from "react";
import Profile from "./profile";
import { useGetMeQuery } from "@/src/redux/features/auth/authApi";
import { TUser } from "@/src/types";

export default function UserProfile() {
  const { data: userData } = useGetMeQuery(undefined);
  const user = userData?.data as TUser;

  return (
    <div>
      <Profile user={user} />
    </div>
  );
}
