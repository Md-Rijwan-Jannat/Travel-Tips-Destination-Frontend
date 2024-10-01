"use client";

import React from "react";

import PostCard from "./postCard/postCard";
import PostModal from "./modal/postingModal";

import { useGetAllPostsQuery } from "@/src/redux/features/post/postApi";
import { TPost, TUser } from "@/src/types";
import InfiniteScrollContainer from "@/src/components/ui/infiniteScrollerContainer";
import { useUser } from "@/src/hooks/useUser";

export default function Post() {
  const { data: postsData } = useGetAllPostsQuery(undefined);

  console.log(postsData);
  const posts = postsData?.data as TPost[];
  const { userInfo, isFetching } = useUser();

  return (
    <InfiniteScrollContainer onBottomReached={() => ""}>
      <div>
        <PostModal userInfo={userInfo as TUser | undefined} />
      </div>
      <div className="grid grid-cols-1 gap-5 mt-5">
        {posts?.map((post) => <PostCard key={post?._id} post={post} />)}
      </div>
    </InfiniteScrollContainer>
  );
}
