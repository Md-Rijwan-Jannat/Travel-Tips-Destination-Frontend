'use client';

import React, { useState } from 'react';
import PremiumPostSuggestionCard from './premiumPostSuggestionCard';
import { useGetAllPremiumPostsQuery } from '@/src/redux/features/premiumPost/premiumPostApi';
import { TPost } from '@/src/types';
import PremiumSkeleton from '@/src/components/ui/skeleton/premiumSkeleton';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function PremiumPosts() {
  const { data: premiumPostData, isLoading } =
    useGetAllPremiumPostsQuery(undefined);
  const posts = premiumPostData?.data as TPost[];

  // get premium page pathname
  const pathname = usePathname();
  const hide = pathname === '/news-feed/premium-posts';

  if (hide) {
    return null;
  }

  return (
    <aside className="hidden lg:block md:sticky top-0 pt-20 h-screen w-1/4">
      <div>
        <h2 className="text-[16px] text-default-700">Suggestions</h2>

        <div className="grid grid-cols-1 gap-5 mt-5 overflow-y-auto">
          {isLoading && <PremiumSkeleton />}
          {posts &&
            posts
              .slice(0, 8)
              .map((post) => (
                <PremiumPostSuggestionCard key={post?._id} post={post} />
              ))}
        </div>

        {/* Load More Link */}
        {posts && posts.length > 8 && (
          <div className="mt-5 flex justify-start">
            <Link
              href={'/news-feed/premium-posts'}
              className="hover:underline text-pink-400 hover:text-pink-400 text-xs"
            >
              Load More
            </Link>
          </div>
        )}
      </div>
    </aside>
  );
}
