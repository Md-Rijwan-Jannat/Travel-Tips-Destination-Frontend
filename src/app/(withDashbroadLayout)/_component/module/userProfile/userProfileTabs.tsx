"use client";

import React, { useState } from "react";
import {
  useGetMyPostsQuery,
  useGetMyPremiumPostsQuery,
} from "@/src/redux/features/post/postApi";
import { TPost } from "@/src/types";
import { Tab, Tabs } from "@nextui-org/tabs";
import { motion } from "framer-motion";
import PostCard from "../../module/posts/postCard/postCard";
import Spinner from "@/src/components/ui/spinner";
import InfiniteScrollContainer from "@/src/components/ui/infiniteScrollerContainer";
import Empty from "@/src/components/ui/empty";
import { useGetAllPremiumPostsQuery } from "@/src/redux/features/premiumPost/premiumPostApi";
import { PiCrownSimpleDuotone } from "react-icons/pi";
import { useUser } from "@/src/hooks/useUser";

export default function UserProfileTabs() {
  const [page, setPage] = useState(1);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const { data: myPostsData, isFetching: isFetchingMyPosts } =
    useGetMyPostsQuery(undefined);
  const myPosts = myPostsData?.data as TPost[];

  const { data: myPremiumPostsData, isFetching: isFetchingMyPremiumPosts } =
    useGetMyPremiumPostsQuery(undefined);
  const myPremiumPosts = myPremiumPostsData?.data as TPost[];

  const { data: allPremiumPostsData, isFetching: isFetchingAllPremiumPosts } =
    useGetAllPremiumPostsQuery(undefined);
  const allPremiumPosts = allPremiumPostsData?.data as TPost[];

  const { userInfo } = useUser();

  console.log(myPosts);

  const loadMorePosts = async () => {
    if (!isFetchingMore) {
      setIsFetchingMore(true);
      setPage((prevPage) => prevPage + 1);
      setIsFetchingMore(false);
    }
  };

  return (
    <motion.div
      className="flex flex-col w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4, duration: 0.4 }}
    >
      <Tabs aria-label="Options" className={`w-full md:w-[500px] xl:w-[600px]`}>
        <Tab key="dashboard" className="w-full" title="Dashboard">
          <InfiniteScrollContainer onBottomReached={loadMorePosts}>
            <motion.div className="grid grid-cols-1 gap-5">
              {/* <Dashboard /> */}
              <Empty message="There are no content available" />
            </motion.div>
          </InfiniteScrollContainer>
        </Tab>
        <Tab key="posts" className="w-full" title="Posts">
          <InfiniteScrollContainer onBottomReached={loadMorePosts}>
            {myPosts?.length === 0 && (
              <Empty message="There are no post available" />
            )}
            <motion.div className="grid grid-cols-1 gap-5">
              {isFetchingMyPosts && isFetchingMore ? (
                <div className="flex justify-center">
                  <Spinner />
                </div>
              ) : (
                myPosts?.map((post) => <PostCard key={post._id} post={post} />)
              )}
            </motion.div>
          </InfiniteScrollContainer>
        </Tab>

        <Tab key="my-premium-posts" className="w-full" title="Premium Posts">
          <InfiniteScrollContainer onBottomReached={loadMorePosts}>
            {myPremiumPosts?.length === 0 && (
              <Empty message="There are no premium post available" />
            )}
            <motion.div className="grid grid-cols-1 gap-5">
              {isFetchingMyPremiumPosts && isFetchingMore ? (
                <div className="flex justify-center">
                  <Spinner />
                </div>
              ) : (
                myPremiumPosts?.map((post) => (
                  <PostCard key={post._id} post={post} />
                ))
              )}
            </motion.div>
          </InfiniteScrollContainer>
        </Tab>

        <Tab
          key="my-subscribed-posts"
          className="w-full"
          title={
            <div className="flex items-center gap-1">
              Subscribed{" "}
              <PiCrownSimpleDuotone className="text-yellow-500" size={14} />{" "}
            </div>
          }
        >
          <InfiniteScrollContainer onBottomReached={loadMorePosts}>
            {allPremiumPosts?.length === 0 && (
              <Empty message="There are not subscribed post available" />
            )}
            {userInfo?.verified ? (
              <motion.div className="grid grid-cols-1 gap-5">
                {isFetchingAllPremiumPosts && isFetchingMore ? (
                  <div className="flex justify-center">
                    <Spinner />
                  </div>
                ) : (
                  allPremiumPosts?.map((post) => (
                    <PostCard key={post._id} post={post} />
                  ))
                )}
              </motion.div>
            ) : (
              <Empty message="Get like and verify your account" />
            )}
          </InfiniteScrollContainer>
        </Tab>
      </Tabs>
    </motion.div>
  );
}
