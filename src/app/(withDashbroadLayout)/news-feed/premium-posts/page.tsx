'use client';

import React from 'react';
import { TPost } from '@/src/types';
import TableSkeleton from '@/src/components/ui/skeleton/tableSkeleton';
import PremiumPostSuggestionCard from '../../_component/module/premiumPost/premiumPostSuggestionCard';
import { useGetAllPremiumPostsQuery } from '@/src/redux/features/premiumPost/premiumPostApi';
import PremiumCardSkeleton from '@/src/components/ui/skeleton/premiumCardSkeleton';

export default function PremiumPostsPage() {
  const { data: premiumPostData, isLoading } =
    useGetAllPremiumPostsQuery(undefined);

  const posts = premiumPostData?.data as TPost[];

  const skeletonArray = Array.from({ length: 15 });
  const className =
    'w-full mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5';

  if (isLoading) {
    return (
      <div>
        <h2 className="text-medium font-semibold text-default-700 my-3">
          All Premium Posts
        </h2>
        <div className={className}>
          {skeletonArray.map((_, index) => (
            <PremiumCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-medium font-semibold text-default-700 my-3">
        All Premium Posts
      </h2>
      <div className={className}>
        {posts &&
          posts.map((post) => (
            <PremiumPostSuggestionCard key={post?._id} post={post} />
          ))}
      </div>
    </div>
  );
}
