"use client";

import { TPost } from "@/src/types";
import { Tab, Tabs } from "@nextui-org/tabs";
import { motion } from "framer-motion";
import React, { useState } from "react";
import PostCard from "../../module/posts/postCard/postCard";
import { useGetSingleUserPostsQuery } from "@/src/redux/features/user/userApi";
import Empty from "@/src/components/ui/empty";
import InfiniteScrollContainer from "@/src/components/ui/infiniteScrollerContainer";
import Spinner from "@/src/components/ui/spinner";

interface TUserProfileTabsProps {
  userId: string;
}

export default function UserProfileTabs({ userId }: TUserProfileTabsProps) {
  const [page, setPage] = useState(1);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const { data: myPostsData } = useGetSingleUserPostsQuery(userId);
  const myPosts = myPostsData?.data as TPost[];

  console.log(myPosts);

  // Function to load more posts when scrolled to bottom
  const loadMorePosts = async () => {
    if (!isFetchingMore) {
      setIsFetchingMore(true);
      setPage((prevPage) => prevPage + 1);
      setIsFetchingMore(false);
    }
  };

  return (
    <motion.div
      className="flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4, duration: 0.4 }}
    >
      <Tabs aria-label="Options" className="w-full md:w-[520px] xl:w-[600px]">
        <Tab key="posts" className="w-full" title="Posts">
          <InfiniteScrollContainer onBottomReached={loadMorePosts}>
            {isFetchingMore ? (
              <div className="flex justify-center">
                <Spinner />
              </div>
            ) : (
              <motion.div className="grid grid-cols-1 gap-5 p-2">
                {!myPosts?.length && (
                  <Empty message="There are not post available" />
                )}
                {myPosts?.map((post) => (
                  <PostCard key={post._id} post={post} />
                ))}
              </motion.div>
            )}
          </InfiniteScrollContainer>
        </Tab>

        {/* <Tab key="my-premium-posts" className="w-full" title="My Premium Posts">
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
        </Tab> */}
      </Tabs>
    </motion.div>
  );
}
