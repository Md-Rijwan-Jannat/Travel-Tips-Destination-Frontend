'use client';

import { useFollowingQuery } from '@/src/redux/features/user/userApi';
import { TUser } from '@/src/types';
import React from 'react';
import Empty from '@/src/components/ui/empty';
import FollowingCard from './followCard/followingCard';
import FollowerSkeleton from '@/src/components/ui/skeleton/followerSkeleton';

export default function Following() {
  const { data: followingData, isLoading } = useFollowingQuery(undefined);
  const following = followingData?.data as TUser[];

  return (
    <>
      {' '}
      {following?.length === 0 && <Empty message="You have no following" />}
      {isLoading && <FollowerSkeleton />}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full md:w-[500px] xl:w-[600px] mx-auto">
        {following?.map((follower: TUser) => (
          <FollowingCard key={follower?._id} user={follower} />
        ))}
      </div>
    </>
  );
}
