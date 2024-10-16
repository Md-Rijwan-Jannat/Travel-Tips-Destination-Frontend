"use client";

import React, { useState } from "react";
import PremiumPostSuggestionCard from "./premiumPostSuggestionCard";
import { useGetAllPremiumPostsQuery } from "@/src/redux/features/premiumPost/premiumPostApi";
import { TPost } from "@/src/types";
import { useRouter } from "next/navigation";
import PremiumSkeleton from "@/src/components/ui/skeleton/premiumSkeleton";
import Link from "next/link";

export default function PremiumPosts() {
  const { data: premiumPostData, isLoading } =
    useGetAllPremiumPostsQuery(undefined);
  const posts = premiumPostData?.data as TPost[];
  const [visiblePosts, setVisiblePosts] = useState(7);
  const router = useRouter();

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

      {/* Load More Link */}
      {posts && posts.length > visiblePosts && (
        <div className="mt-5 flex justify-start">
          <Link
            href={"/news-feed/premium-posts"}
            className="hover:underline text-pink-400 hover:text-pink-400 text-xs"
          >
            Load More
          </Link>
        </div>
      )}
    </div>
  );
}
