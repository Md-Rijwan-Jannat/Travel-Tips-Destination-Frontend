"use client";

import { useFollowingQuery } from "@/src/redux/features/user/userApi";
import { TUser } from "@/src/types";
import React from "react";
import FollowerCard from "./followerCard";
import Empty from "@/src/components/ui/empty";

export default function Following() {
  const { data: followingData } = useFollowingQuery(undefined);
  const following = followingData?.data as TUser[];

  console.log(following);

  return (
    <>
      {" "}
      {following?.length === 0 && <Empty message="You have no following" />}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full md:w-[500px] xl:w-[600px] mx-auto">
        {following?.map((follower: TUser) => (
          <FollowerCard key={follower?._id} user={follower} />
        ))}
      </div>
    </>
  );
}
