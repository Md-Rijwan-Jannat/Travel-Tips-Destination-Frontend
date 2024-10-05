"use-client";

import React from "react";
import { useFollowersQuery } from "@/src/redux/features/user/userApi";
import { TUser } from "@/src/types";
import FollowerCard from "./followerCard";
import Empty from "@/src/components/ui/empty";

export default function Followers() {
  const { data: followersData } = useFollowersQuery(undefined);
  const followers = followersData?.data as TUser[];

  return (
    <>
      {" "}
      {followers?.length === 0 && <Empty message="You have no followers" />}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-center w-full md:w-[500px] xl:w-[600px] mx-auto">
        {followers?.map((follower: TUser) => (
          <FollowerCard key={follower?._id} user={follower} />
        ))}
      </div>
    </>
  );
}
