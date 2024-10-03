"use client";

import React, { useState } from "react";
import PostCard from "./postCard/postCard";
import PostModal from "./modal/postingModal";

import { useGetAllPostsQuery } from "@/src/redux/features/post/postApi";
import { TPost, TUser } from "@/src/types";
import InfiniteScrollContainer from "@/src/components/ui/infiniteScrollerContainer";
import { useUser } from "@/src/hooks/useUser";
import Spinner from "@/src/components/ui/spinner";
import Empty from "@/src/components/ui/empty";

export default function Post() {
  const [page, setPage] = useState(1); // Track the current page
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const { data: postsData, isLoading, isFetching } = useGetAllPostsQuery(page);

  const posts = postsData?.data as TPost[];
  const { userInfo } = useUser();

  // Function to load more posts when scrolled to bottom
  const loadMorePosts = async () => {
    if (!isFetchingMore) {
      setIsFetchingMore(true);
      setPage((prevPage) => prevPage + 1);
      setIsFetchingMore(false);
    }
  };

  return (
    <InfiniteScrollContainer onBottomReached={loadMorePosts}>
      <div>
        <PostModal userInfo={userInfo as TUser | undefined} />
      </div>

      {posts?.length === 0 && <Empty message="No post available" />}

      <div className="grid grid-cols-1 gap-5 mt-5">
        {posts?.map((post) => <PostCard key={post?._id} post={post} />)}
      </div>

      {/* Show spinner when fetching more data */}
      {(isFetching || isFetchingMore) && (
        <div className="flex justify-center mt-5">
          <Spinner />
        </div>
      )}
    </InfiniteScrollContainer>
  );
}
