'use client';

import React, { Suspense } from 'react';
import Following from '../../_component/module/userProfile/following';
import FollowerSkeleton from '@/src/components/ui/skeleton/followerSkeleton';

export default function FollowingPage() {
  return (
    <Suspense fallback={<FollowerSkeleton />}>
      <Following />
    </Suspense>
  );
}
