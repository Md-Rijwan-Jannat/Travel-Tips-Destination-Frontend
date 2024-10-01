"use client";

import React from "react";

import PremiumPostSuggestionCard from "./premiumPostSuggestionCard";

import { useGetAllPremiumPostsQuery } from "@/src/redux/features/premiumPost/premiumPostApi";
import { TPost } from "@/src/types";

export default function PremiumPosts() {
  const { data: premiumPostData } = useGetAllPremiumPostsQuery(undefined);
  const posts = premiumPostData?.data as TPost[];

  return (
    <div>
      <h2 className="text-[16px] text-default-700">Suggestions</h2>
      <div className="grid grid-cols-1 gap-5 mt-5">
        {posts &&
          posts.map((post) => (
            <PremiumPostSuggestionCard key={post?._id} post={post} />
          ))}
      </div>
    </div>
  );
}
