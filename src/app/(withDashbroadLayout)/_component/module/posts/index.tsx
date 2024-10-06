"use client";

import React, { useState, useEffect } from "react";
import PostCard from "./postCard/postCard";
import PostModal from "../../modal/postingModal";
import { useGetAllPostsQuery } from "@/src/redux/features/post/postApi";
import { TPost, TUser } from "@/src/types";
import InfiniteScrollContainer from "@/src/components/ui/infiniteScrollerContainer";
import { useUser } from "@/src/hooks/useUser";
import Spinner from "@/src/components/ui/spinner";
import Empty from "@/src/components/ui/empty";
import PremiumPostsMarquee from "../premiumPost/premiumPostsMarquee";
import { MdLockReset } from "react-icons/md";
import { categoriesList } from "@/src/constants";
import { useAppSelector } from "@/src/redux/hook";
import { useRouter } from "next/navigation";
import DropdownFilter from "./postFilter/dropdownFilter";

export default function Post() {
  const [page, setPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [filterOption, setFilterOption] = useState<string>("all");
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [selectedTab, setSelectedTab] = useState<string>("forYou");
  const token = useAppSelector((state) => state.auth.token);
  const router = useRouter();

  const {
    data: postsData,
    isFetching,
    isSuccess,
  } = useGetAllPostsQuery({
    searchTerm: selectedCategory || "",
    page,
  });

  const posts = postsData?.data as TPost[];
  const { userInfo } = useUser();

  const loadMorePosts = async () => {
    if (!isFetchingMore && isSuccess && postsData?.hasMore) {
      setIsFetchingMore(true);
      setTimeout(() => {
        setPage((prevPage) => prevPage + 1); // Fetch new page of data
        setIsFetchingMore(false); // Turn off spinner
      }, 1000); // Simulate 1-second loading
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setIsFetchingMore(false); // Reset spinner when new data arrives
    }
  }, [isSuccess]);

  // Filter posts based on selected filter option and tab
  const filteredPosts = () => {
    let filtered = posts;

    if (filterOption === "popular") {
      filtered = filtered
        .filter((post) => post.likes.length > 0)
        .sort((a, b) => b.likes.length - a.likes.length);
    }
    if (filterOption === "poor") {
      filtered = filtered.filter((post) => post.likes.length === 0);
    }

    if (selectedTab === "following") {
      filtered = filtered.filter((post) =>
        userInfo?.following.includes(post?.user?._id)
      );
    }

    return filtered;
  };

  if (!token) {
    router.push("/");

    return null;
  }

  return (
    <InfiniteScrollContainer
      className="w-full md:w-[500px] xl:w-[600px] mx-auto"
      onBottomReached={loadMorePosts}
      isFetchingMore={isFetchingMore} // Pass fetching status to the container
    >
      {/* Post Modal */}
      <div>
        <PostModal userInfo={userInfo as TUser | undefined} />
      </div>

      <div className="mt-4 mb-6 flex flex-wrap gap-3">
        {categoriesList.map((category) => (
          <button
            key={category}
            className={`px-4 text-xs py-1 rounded-full border border-default-200 focus:outline-none ${
              selectedCategory === category
                ? "bg-default-100 text-primaryColor"
                : "bg-default-50 text-default-700"
            } hover:bg-default-100 hover:text-primaryColor hover:transition-colors duration-500`}
            onClick={() =>
              setSelectedCategory(category === selectedCategory ? "" : category)
            }
          >
            {category}
          </button>
        ))}
        <button
          className={`px-4 py-1 rounded-full border border-default-200 bg-default-50 focus:outline-none hover:bg-default-100 hover:text-primaryColor hover:transition-colors duration-500`}
          onClick={() => setSelectedCategory("")}
        >
          <MdLockReset />
        </button>
      </div>

      {/* Dropdown for Post Filtering */}
      <DropdownFilter
        filterOption={filterOption}
        setFilterOption={setFilterOption}
      />

      {/* Premium Posts (only for mobile view) */}
      <div className="block lg:hidden">
        <PremiumPostsMarquee posts={filteredPosts()} />
      </div>

      {/* Tabs for For You and Following */}
      <div className="flex my-5 w-full">
        <button
          className={`px-4 py-2 rounded-l-full border border-default-200 w-full ${
            selectedTab === "forYou"
              ? "bg-default-100 text-primaryColor"
              : "bg-default-50 text-default-700"
          }  hover:text-primaryColor transition-colors duration-700 ease-in-out`}
          onClick={() => setSelectedTab("forYou")}
        >
          For You
        </button>
        <button
          className={`px-4 py-2 rounded-r-full border border-default-200 w-full ${
            selectedTab === "following"
              ? "bg-default-100 text-primaryColor"
              : "bg-default-50 text-default-700"
          }  hover:text-primaryColor transition-colors duration-700 ease-in-out`}
          onClick={() => setSelectedTab("following")}
        >
          Following
        </button>
      </div>

      {/* Animated Tab Content */}
      <div key={selectedTab} className="grid grid-cols-1 gap-5 mt-5">
        {filteredPosts()?.length === 0 && <Empty message="No post available" />}

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
