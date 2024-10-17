'use client';

import React from 'react';
import { TPost } from '@/src/types';
import TableSkeleton from '@/src/components/ui/skeleton/tableSkeleton';
import PremiumPostSuggestionCard from '../../_component/module/premiumPost/premiumPostSuggestionCard';
import { useGetAllPremiumPostsQuery } from '@/src/redux/features/premiumPost/premiumPostApi';

export default function PremiumPostsPage() {
  const { data: premiumPostData, isLoading } =
    useGetAllPremiumPostsQuery(undefined);

  const posts = premiumPostData?.data as TPost[];

  return (
    <div className="w-full md:w-[500px] xl:w-[600px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
      {isLoading && <TableSkeleton />}
      {posts &&
        posts.map((post) => (
          <PremiumPostSuggestionCard key={post?._id} post={post} />
        ))}
    </div>
  );
}
