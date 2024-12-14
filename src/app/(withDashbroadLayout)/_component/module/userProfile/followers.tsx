'use-client';

import React from 'react';
import { useFollowersQuery } from '@/src/redux/features/user/userApi';
import { TUser } from '@/src/types';
import Empty from '@/src/components/ui/empty';
import FollowerCard from './followCard/followerCard';
import FollowerSkeleton from '@/src/components/ui/skeleton/followerSkeleton';

export default function Followers() {
  const { data: followersData, isLoading } = useFollowersQuery(undefined);
  const followers = followersData?.data as TUser[];

  return (
    <>
      {' '}
      {followers?.length === 0 && <Empty message="You have no followers" />}
      {isLoading && <FollowerSkeleton />}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full justify-center mx-auto">
        {followers?.map((follower: TUser) => (
          <FollowerCard
            key={follower?._id}
            follower={follower}
            followers={followers}
          />
        ))}
      </div>
    </>
  );
}
