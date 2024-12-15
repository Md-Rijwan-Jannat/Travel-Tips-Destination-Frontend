'use client';

import { TAllUserStory } from '@/src/types';
import { Avatar } from '@nextui-org/avatar';
import { Card, CardBody } from '@nextui-org/card';
import Image from 'next/image';
import { useAddViewMutation } from '@/src/redux/features/story/storyApi';
import { useDisclosure } from '@nextui-org/modal';
import { StoryModal } from './strotyModal';
import { Button } from '@nextui-org/button';

interface StoryCardProps {
  story: TAllUserStory;
}

export function StoryCard({ story }: StoryCardProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [addView] = useAddViewMutation();

  const handleClick = async () => {
    const response = await addView({ storyId: story?.stories?.[0]._id });
    onOpen();

    console.log(response, 'story view response');
  };

  return (
    <>
      <Button
        onClick={handleClick}
        id="story"
        className="hidden"
        onPress={onOpen}
      >
        View
      </Button>
      <label htmlFor="story">
        {' '}
        <Card className="w-28 h-48 cursor-pointer overflow-hidden border border-default-100">
          <CardBody className="p-0 relative">
            <Image
              width={600}
              height={600}
              src={story?.stories?.[0].media}
              alt={story?.user.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0" />
            <p className="absolute bottom-2 left-2 text-white text-xs font-semibold">
              {story?.user?.name}
            </p>
          </CardBody>
          <Avatar
            name={story?.user?.name?.charAt(0).toUpperCase()}
            src={story?.user?.image || undefined}
            className="absolute top-2 left-2 border-2 border-pink-500"
            size="sm"
          />
        </Card>
      </label>

      <div className="z-[99999]">
        <StoryModal story={story} isOpen={isOpen} onOpenChange={onOpenChange} />
      </div>
    </>
  );
}
