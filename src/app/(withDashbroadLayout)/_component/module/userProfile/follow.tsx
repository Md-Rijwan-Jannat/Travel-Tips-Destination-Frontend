"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  useFollowMutation,
  useGetSingleUserQuery,
  useUnFollowMutation,
} from "@/src/redux/features/user/userApi";
import { Button } from "@nextui-org/button";
import { useUser } from "@/src/hooks/useUser";

interface TFollowProps {
  userId: string | undefined;
}

export default function Follow({ userId }: TFollowProps) {
  const [followFn, { isLoading: followIsLoading }] = useFollowMutation();
  const [unFollowFn, { isLoading: unFollowIsLoading }] = useUnFollowMutation();
  const { data: userData } = useGetSingleUserQuery(userId);
  const user = userData?.data;
  const { userInfo: currentUser } = useUser();
  const currentUserId = currentUser?._id;
  const exists = user?.follower?.includes(currentUserId);

  const followHandler = async () => {
    try {
      await followFn(userId);
    } catch (error) {
      console.error("Follow failed===>", error);
    }
  };

  const unFollowHandler = async () => {
    try {
      await unFollowFn(userId);
    } catch (error) {
      console.error("Unfollow failed===>", error);
    }
  };

  return (
    <motion.div
      className="flex gap-4 mt-4 justify-center w-full"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.4 }}
    >
      {exists ? (
        <Button
          className="px-5 py-1 bg-default-50 text-default-700"
          radius="full"
          size="sm"
          onClick={unFollowHandler}
          disabled={unFollowIsLoading}
        >
          {unFollowIsLoading ? "Unfollowing..." : "Unfollow"}
        </Button>
      ) : (
        <Button
          className="px-5 py-1 bg-pink-500 text-white"
          radius="full"
          size="sm"
          onClick={followHandler}
          disabled={followIsLoading}
        >
          {followIsLoading ? "Following..." : "Follow"}
        </Button>
      )}
    </motion.div>
  );
}
