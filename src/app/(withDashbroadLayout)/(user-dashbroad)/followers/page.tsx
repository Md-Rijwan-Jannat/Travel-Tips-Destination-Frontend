'use client';

import React, { Suspense } from 'react';
import Followers from '../../_component/module/userProfile/followers';
import FollowerSkeleton from '@/src/components/ui/skeleton/followerSkeleton';

export default function FollowersPage() {
  return (
    <Suspense fallback={<FollowerSkeleton />}>
      <Followers />
    </Suspense>
  );
}
