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
import PremiumPostsMarquee from "../premiumPost/premiumPostsMarquee";
import { MdLockReset } from "react-icons/md";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";
import { Button } from "@nextui-org/button";

const categoriesList = [
  "Adventure",
  "Exploration",
  "Business Travel",
  "Other",
  "Culture",
  "Wildlife",
  "Beaches",
  "Mountaineering",
  "Sports",
  "Road Trip",
  "City Tours",
  "Photography",
];

export default function Post() {
  const [page, setPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [filterOption, setFilterOption] = useState<string>("all");
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const {
    data: postsData,
    isLoading,
    isFetching,
  } = useGetAllPostsQuery({
    searchTerm: selectedCategory || "",
  });

  const posts = postsData?.data as TPost[];
  const { userInfo } = useUser();

  const loadMorePosts = async () => {
    if (!isFetchingMore) {
      setIsFetchingMore(true);
      setPage((prevPage) => prevPage + 1);
      setIsFetchingMore(false);
    }
  };

  // Filter posts based on selected filter option
  const filteredPosts = () => {
    if (filterOption === "popular") {
      return posts
        ?.filter((post) => post.likes.length > 0)
        .sort((a, b) => b.likes.length - a.likes.length);
    }
    if (filterOption === "poor") {
      return posts?.filter((post) => post.likes.length === 0);
    }

    return posts;
  };

  return (
    <InfiniteScrollContainer onBottomReached={loadMorePosts}>
      {/* Post Modal */}
      <div>
        <PostModal userInfo={userInfo as TUser | undefined} />
      </div>

      {/* Category Filter - Flex Box Buttons */}
      <div className="mt-4 mb-6 flex flex-wrap gap-3">
        {categoriesList.map((category) => (
          <button
            key={category}
            className={`px-4 py-1 rounded-full border border-default-200 focus:outline-none ${
              selectedCategory === category
                ? "bg-default-100 text-primaryColor"
                : "bg-default-50 text-default-700"
            } hover:bg-default-100 hover:text-primaryColor  hover:transition-colors duration-500`}
            onClick={() =>
              setSelectedCategory(category === selectedCategory ? "" : category)
            }
          >
            {category}
          </button>
        ))}
        <button
          className={`px-4 py-1 rounded-full border border-default-200  bg-default-50 focus:outline-none hover:bg-default-100 hover:text-primaryColor  hover:transition-colors duration-500`}
          onClick={() => setSelectedCategory("")}
        >
          <MdLockReset />
        </button>
      </div>

      {/* Dropdown for Post Filtering */}
      <div className="mb-6 -mx-3 flex items-center justify-end w-full">
        <Dropdown>
          <DropdownTrigger>
            <Button variant="bordered" className="capitalize">
              {filterOption === "popular"
                ? "Popular Posts"
                : filterOption === "poor"
                  ? "Poor Posts"
                  : "All Posts"}
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Post filtering options"
            selectionMode="single"
            selectedKeys={new Set([filterOption])}
            onSelectionChange={(key) =>
              setFilterOption(Array.from(key)[0] as string)
            }
          >
            <DropdownItem key="all">All Posts</DropdownItem>
            <DropdownItem key="popular">Popular Posts</DropdownItem>
            <DropdownItem key="poor">Poor Posts</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>

      {/* Premium Posts (only for mobile view) */}
      <div className="block lg:hidden">
        <PremiumPostsMarquee posts={filteredPosts()} />
      </div>

      {/* Posts */}
      {filteredPosts()?.length === 0 && <Empty message="No post available" />}

      <div className="grid grid-cols-1 gap-5 mt-5">
        {filteredPosts()?.map((post) => (
          <PostCard key={post?._id} post={post} />
        ))}
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
