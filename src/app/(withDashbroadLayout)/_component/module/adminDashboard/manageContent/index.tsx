"use client";

import React, { useState } from "react";
import { Tabs, Tab } from "@nextui-org/tabs";
import { Pagination } from "@nextui-org/pagination";
import { TPost } from "@/src/types";
import {
  useGetAllManagePostsQuery,
  useGetAllPremiumManagePostsQuery,
} from "@/src/redux/features/adminManagement/managePostApi";
import ContentTable from "./contentTable";
import Empty from "@/src/components/ui/empty";

export default function ManageContent() {
  const [page, setPage] = useState(1);
  const limit = 10;

  const queryParams = {
    sort: "-createdAt",
    limit: limit.toString(),
    page: page.toString(),
  };

  // Fetch all posts and premium posts with pagination
  const {
    data: allPostsData,
    isLoading: isLoadingAllPosts,
    isError: isErrorAllPosts,
  } = useGetAllManagePostsQuery(queryParams);

  const {
    data: premiumPostsData,
    isLoading: isLoadingPremiumPosts,
    isError: isErrorPremiumPosts,
  } = useGetAllPremiumManagePostsQuery({ page, limit });

  // Destructure post data
  const allPosts: TPost[] = allPostsData?.data || [];
  const premiumPosts: TPost[] = premiumPostsData?.data || [];
  const meta1 = allPostsData?.meta;
  const meta2 = premiumPostsData?.meta;

  // Handle page change
  const handlePageChange = (newPage: number) => {
    setPage(newPage); // Update page state
  };

  console.log(meta1, meta2);

  return (
    <div className="flex w-full flex-col">
      {isErrorAllPosts || isErrorPremiumPosts ? (
        <Empty />
      ) : (
        <>
          <Tabs aria-label="Post Categories">
            <Tab key="premium" title="Premium Posts">
              <ContentTable
                posts={premiumPosts}
                isLoading={isLoadingPremiumPosts}
              />
            </Tab>
            <Tab key="normal" title="All Posts">
              <ContentTable posts={allPosts} isLoading={isLoadingAllPosts} />
            </Tab>
          </Tabs>

          {/* Pagination for Posts */}
          {meta1?.total > meta1?.limit || meta2?.total > meta2?.limit ? (
            <div className="mt-10 flex justify-center items-start">
              <Pagination
                color="default"
                variant="flat"
                showControls
                total={meta1?.totalPage || meta2?.totalPage || 1}
                page={page}
                className="mb-5 px-5 py-1 mx-3 border-none shadow-none rounded-full bg-default-50"
                onChange={handlePageChange}
              />
            </div>
          ) : null}
        </>
      )}
    </div>
  );
}
