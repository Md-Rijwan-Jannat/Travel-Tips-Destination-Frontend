import React from "react";
import Image from "next/image";
import { Avatar } from "@nextui-org/avatar";
import { PiCrownSimpleDuotone } from "react-icons/pi";
import { Button } from "@nextui-org/button";

import { TPost } from "@/src/types";

interface TPremiumPostSuggestionCardProps {
  post: TPost;
}

export default function PremiumPostSuggestionCard({
  post,
}: TPremiumPostSuggestionCardProps) {
  const truncatedTitle =
    post?.title.length > 5 ? post?.title.slice(0, 5) + "..." : post?.title;

  return (
    <div className="bg-default-50 border border-default-200 rounded-md p-2 duration-300 ease-in-out">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Avatar
            alt="premium post"
            className="text-[20px] text-primaryColor"
            name={post?.title.charAt(0).toUpperCase()}
            size="md"
            src={post.images && post.images[0]}
          />
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-default-900 text-[12px]">
              {truncatedTitle}
            </h3>
            <p className=" text-default-500 text-[10px] bg-pink-500/10 rounded-full px-2">
              Recommended
            </p>
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <div className="flex items-center gap-1 rounded-full px-3 py-1 border border-default-200 hover:bg-default-100 transition-colors-opacity duration-500 ease-in-out text-xs text-default-500 cursor-pointer">
            Premium
            <PiCrownSimpleDuotone className="text-yellow-500" size={16} />
          </div>
        </div>
      </div>
    </div>
  );
}
