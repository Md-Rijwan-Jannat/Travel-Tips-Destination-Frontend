"use client";

import {
  useGetMyPostsQuery,
  useGetMyPremiumPostsQuery,
} from "@/src/redux/features/post/postApi";
import { TPost } from "@/src/types";
import { Tab, Tabs } from "@nextui-org/tabs";
import { motion } from "framer-motion";
import React from "react";
import PostCard from "../../module/posts/postCard/postCard";

export default function ProfileTabs() {
  const { data: myPostsData } = useGetMyPostsQuery(undefined);
  const myPosts = myPostsData?.data as TPost[];
  const { data: myPremiumPostsData } = useGetMyPremiumPostsQuery(undefined);
  const myPremiumPosts = myPremiumPostsData?.data as TPost[];

  return (
    <motion.div
      className="flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4, duration: 0.4 }}
    >
      <Tabs aria-label="Options" className="w-full md:w-[500px] xl:w-[600px]]">
        <Tab key="posts" className="w-full" title="My Posts">
          <motion.div className="grid grid-cols-1 gap-5 p-2 bg-default-50">
            {myPosts?.map((post) => <PostCard key={post._id} post={post} />)}
          </motion.div>
        </Tab>

        <Tab key="my-premium-posts" className="w-full" title="My Premium Posts">
          <motion.div className="grid grid-cols-1 gap-5 p-2 bg-default-50">
            {myPremiumPosts?.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </motion.div>
        </Tab>

        <Tab
          key="my-subscribed-posts"
          className="w-full"
          title="My Subscribed Posts"
        >
          <motion.div className="grid grid-cols-1 gap-5 p-2 bg-default-50">
            {myPremiumPosts?.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </motion.div>
        </Tab>
      </Tabs>
    </motion.div>
  );
}
