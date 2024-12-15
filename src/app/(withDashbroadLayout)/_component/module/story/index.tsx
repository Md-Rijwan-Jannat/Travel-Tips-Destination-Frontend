'use client';

import { TAllUserStory, TStory } from '@/src/types';
import {
  useGetAllUserStoriesQuery,
  useGetUserStoriesQuery,
} from '@/src/redux/features/story/storyApi';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import { CreateStoryCard } from './createStoryCard';
import { StoryCard } from './storyCard';
import { Card } from '@nextui-org/card';
import { Skeleton } from '@nextui-org/skeleton';
import { PiEmptyFill } from 'react-icons/pi';

export default function Stories() {
  const { data, isLoading, error } = useGetAllUserStoriesQuery();

  if (isLoading)
    return (
      <div className="my-10 flex flex-row gap-2">
        {Array.from({ length: 5 }).map((_, index) => (
          <Card
            className="w-28 h-48 space-y-2 border border-default-100"
            radius="lg"
          >
            <Skeleton className="h-full w-full rounded-lg">
              <div className="h-full w-full bg-default-300" />
            </Skeleton>
            <div className="absolute top-2 left-2">
              <Skeleton className="rounded-full">
                <div className="h-8 w-8 bg-default-300" />
              </Skeleton>
            </div>
            <div className="absolute bottom-2 left-2 w-3/4">
              <Skeleton className="rounded-lg">
                <div className="h-3 bg-default-300" />
              </Skeleton>
            </div>
          </Card>
        ))}
      </div>
    );

  const stories = data?.data as TAllUserStory[];

  if (!stories || stories.length === 0) {
    return (
      <div className="my-10 flex flex-row gap-2">
        <div>
          <CreateStoryCard />
        </div>
        <div className="flex items-center justify-center flex-col w-full text-pink-500 border border-default-100 rounded-md h-48 bg-pink-50/5">
          <PiEmptyFill size={50} /> No stories
        </div>
      </div>
    );
  }

  return (
    <div className="my-10 flex flex-row items-center justify-center">
      <Swiper
        slidesPerView="auto"
        spaceBetween={8}
        freeMode={true}
        modules={[FreeMode]}
        className="w-full"
      >
        <SwiperSlide className="!w-auto">
          <CreateStoryCard />
        </SwiperSlide>
        {stories?.map((story) => (
          <SwiperSlide key={story?.stories?.[0]?._id} className="!w-auto">
            <StoryCard story={story} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
