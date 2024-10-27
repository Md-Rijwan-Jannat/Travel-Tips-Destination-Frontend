import React, { useState } from 'react';
import {
  useGetMyPostsQuery,
  useGetMyPremiumPostsQuery,
} from '@/src/redux/features/post/postApi';
import { TPost } from '@/src/types';
import { Tab, Tabs } from '@nextui-org/tabs';
import { motion } from 'framer-motion';
import PostCard from '../../module/posts/postCard/postCard';
import InfiniteScrollContainer from '@/src/components/ui/infiniteScrollerContainer';
import Empty from '@/src/components/ui/empty';
import { useGetAllPremiumPostsQuery } from '@/src/redux/features/premiumPost/premiumPostApi';
import { PiCrownSimpleDuotone } from 'react-icons/pi';
import { useUser } from '@/src/hooks/useUser';
import TableSkeleton from '@/src/components/ui/skeleton/tableSkeleton';
import PostDetailsSkeleton from '@/src/components/ui/skeleton/postDetailsSkeleton';

export default function UserProfileTabs() {
  const [page, setPage] = useState(1);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const {
    data: myPostsData,
    isFetching: isFetchingMyPosts,
    isLoading: myPostLoading,
  } = useGetMyPostsQuery({ page });
  const myPosts = myPostsData?.data as TPost[];

  const {
    data: myPremiumPostsData,
    isFetching: isFetchingMyPremiumPosts,
    isLoading: myPremiumPostLoading,
  } = useGetMyPremiumPostsQuery({ page });
  const myPremiumPosts = myPremiumPostsData?.data as TPost[];

  const {
    data: allPremiumPostsData,
    isFetching: isFetchingAllPremiumPosts,
    isLoading: allPremiumPostLoading,
  } = useGetAllPremiumPostsQuery({ page });
  const allPremiumPosts = allPremiumPostsData?.data as TPost[];

  const { userInfo } = useUser();

  const loadMorePosts = async () => {
    if (!isFetchingMore) {
      setIsFetchingMore(true);
      setPage((prevPage) => prevPage + 1);
      setIsFetchingMore(false);
    }
  };

  return (
    <motion.div
      className="flex flex-col w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4, duration: 0.4 }}
    >
      <Tabs aria-label="Options" className="w-full md:w-[500px] xl:w-[600px]">
        <Tab key="posts" className="w-full" title="Posts">
          <InfiniteScrollContainer
            onBottomReached={loadMorePosts}
            isFetchingMore={isFetchingMore}
          >
            {myPosts?.length === 0 && (
              <Empty message="There are no posts available" />
            )}
            <motion.div className="grid grid-cols-1 gap-5">
              {isFetchingMyPosts || myPostLoading || isFetchingMore ? (
                <div className="flex justify-center">
                  <PostDetailsSkeleton />
                </div>
              ) : (
                myPosts?.map((post) => <PostCard key={post._id} post={post} />)
              )}
            </motion.div>
          </InfiniteScrollContainer>
        </Tab>
        <Tab key="my-premium-posts" className="w-full" title="Premium Posts">
          <InfiniteScrollContainer
            onBottomReached={loadMorePosts}
            isFetchingMore={isFetchingMore}
          >
            {myPremiumPosts?.length === 0 && (
              <Empty message="There are no premium posts available" />
            )}
            <motion.div className="grid grid-cols-1 gap-5">
              {isFetchingMyPremiumPosts ||
              myPremiumPostLoading ||
              isFetchingMore ? (
                <div className="flex justify-center">
                  <TableSkeleton />
                </div>
              ) : (
                myPremiumPosts?.map((post) => (
                  <PostCard key={post._id} post={post} />
                ))
              )}
            </motion.div>
          </InfiniteScrollContainer>
        </Tab>
        <Tab
          key="my-subscribed-posts"
          className="w-full"
          title={
            <div className="flex items-center gap-1">
              Subscribed{' '}
              <PiCrownSimpleDuotone className="text-yellow-500" size={14} />
            </div>
          }
        >
          <InfiniteScrollContainer
            onBottomReached={loadMorePosts}
            isFetchingMore={isFetchingMore}
          >
            {allPremiumPosts?.length === 0 && (
              <Empty message="There are no subscribed posts available" />
            )}
            {userInfo?.verified ? (
              <motion.div className="grid grid-cols-1 gap-5">
                {isFetchingAllPremiumPosts ||
                allPremiumPostLoading ||
                isFetchingMore ? (
                  <div className="flex justify-center">
                    <TableSkeleton />
                  </div>
                ) : (
                  allPremiumPosts?.map((post) => (
                    <PostCard key={post._id} post={post} />
                  ))
                )}
              </motion.div>
            ) : (
              <Empty message="Get likes and verify your account" />
            )}
          </InfiniteScrollContainer>
        </Tab>
        {/* Dashboard */}
        <Tab key="dashboard" className="w-full" title="Dashboard">
          <InfiniteScrollContainer
            onBottomReached={loadMorePosts}
            isFetchingMore={isFetchingMore}
          >
            <motion.div className="grid grid-cols-1 gap-5">
              {/* Add Dashboard content */}
              <Empty message="There is no content available" />
            </motion.div>
          </InfiniteScrollContainer>
        </Tab>
      </Tabs>
    </motion.div>
  );
}
