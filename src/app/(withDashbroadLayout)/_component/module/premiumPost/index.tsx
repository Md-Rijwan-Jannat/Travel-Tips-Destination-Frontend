"use client";

import React, { useState } from "react";
import PremiumPostSuggestionCard from "./premiumPostSuggestionCard";
import { useGetAllPremiumPostsQuery } from "@/src/redux/features/premiumPost/premiumPostApi";
import { TPost } from "@/src/types";
import { useRouter } from "next/navigation";
import PremiumSkeleton from "@/src/components/ui/skeleton/premiumSkeleton";

export default function PremiumPosts() {
  const { data: premiumPostData, isLoading } =
    useGetAllPremiumPostsQuery(undefined);
  const posts = premiumPostData?.data as TPost[];
  const [visiblePosts, setVisiblePosts] = useState(10);
  const router = useRouter();

  const handleLoadMore = () => {
    router.push("/premium-posts");
  };

  return (
    <div>
      <h2 className="text-[16px] text-default-700">Suggestions</h2>

      <div className="grid grid-cols-1 gap-5 mt-5">
        {isLoading && <PremiumSkeleton />}
        {posts &&
          posts
            .slice(0, visiblePosts)
            .map((post) => (
              <PremiumPostSuggestionCard key={post?._id} post={post} />
            ))}
      </div>

      {/* Load More button */}
      {posts && posts.length > visiblePosts && (
        <div className="mt-5 flex justify-center">
          <button
            onClick={handleLoadMore}
            className="px-4 py-2 bg-primaryColor text-white rounded-md"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}
