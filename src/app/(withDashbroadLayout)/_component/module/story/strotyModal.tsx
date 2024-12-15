'use client';

import { ReactionType, TAllUserStory, TStory } from '@/src/types';
import { Avatar } from '@nextui-org/avatar';
import { Button } from '@nextui-org/button';
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/modal';
import {
  useAddReactionMutation,
  useDeleteStoryMutation,
} from '@/src/redux/features/story/storyApi';
import {
  ThumbsUp,
  Heart,
  Laugh,
  Frown,
  Angry,
  Trash2,
  Eye,
} from 'lucide-react';
import { useUser } from '@/src/hooks/useUser';
import Link from 'next/link';
import { GoVerified } from 'react-icons/go';
import FollowForPost from '../userProfile/followForPost';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import {
  differenceInSeconds,
  formatDuration,
  intervalToDuration,
} from 'date-fns';

interface StoryModalProps {
  story: TAllUserStory | null;
  isOpen: boolean;
  onOpenChange: () => void;
}

export function StoryModal({ story, isOpen, onOpenChange }: StoryModalProps) {
  const { userInfo } = useUser();
  const [addReactionFn] = useAddReactionMutation();
  const [deleteStoryFn] = useDeleteStoryMutation();
  const {
    isOpen: isDeleteModalOpen,
    onOpen: onDeleteModalOpen,
    onClose: onDeleteModalClose,
  } = useDisclosure();

  if (!story) return null;

  const reactionIcons: Record<ReactionType, JSX.Element> = {
    like: <ThumbsUp size={20} />,
    love: <Heart size={20} />,
    laugh: <Laugh size={20} />,
    sad: <Frown size={20} />,
    angry: <Angry size={20} />,
  };

  const handleReaction = async (reaction: ReactionType) => {
    await addReactionFn({ storyId: story.stories[0]._id, reaction });
  };

  const handleDelete = async () => {
    await deleteStoryFn(story.stories[0]._id);
    onDeleteModalClose();
    onOpenChange();
  };

  const isOwnStory = userInfo?._id === story.user._id;

  console.log(story, userInfo?._id);

  const formatTimeRemaining = (expiresAt: string): string => {
    const currentTime = new Date();
    const expiresTime = new Date(expiresAt);

    const diffInSeconds = differenceInSeconds(expiresTime, currentTime);

    if (diffInSeconds <= 0) return 'Expired';

    const duration = intervalToDuration({
      start: 0,
      end: diffInSeconds * 1000,
    });
    return formatDuration(duration, { format: ['hours', 'minutes'] });
  };

  return (
    <>
      <Modal
        placement="center"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="2xl"
      >
        <ModalContent>
          <ModalBody className="p-0">
            <ModalHeader className="flex justify-between mt-5">
              <div className="flex items-center space-x-2">
                <Link href={`/profile/${story.stories[0]?.user?._id}`}>
                  <Avatar
                    className="w-12 h-12 rounded-full object-cover text-[22px] border-2 border-pink-500"
                    name={story.stories[0]?.user?.name?.charAt(0).toUpperCase()}
                    src={story?.user?.image || undefined}
                  />
                </Link>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Link
                      className="font-semibold text-default-700 text-lg flex items-center gap-1 whitespace-nowrap"
                      href={`/profile/${story?.user?._id}`}
                    >
                      {story?.user?.name}{' '}
                      {story?.user?.verified && (
                        <GoVerified className="text-pink-500" />
                      )}
                    </Link>
                    {!isOwnStory && <FollowForPost userId={story?.user?._id} />}
                  </div>
                  <p className="text-sm text-default-500">
                    {formatTimeRemaining(story.stories[0]?.expiresAt)} ago
                  </p>
                </div>
              </div>
              {isOwnStory && (
                <Button
                  isIconOnly
                  color="danger"
                  variant="flat"
                  aria-label="Delete"
                  onClick={onDeleteModalOpen}
                  className="bg-default-700/20 hover:bg-red-500/50"
                >
                  <Trash2 size={20} />
                </Button>
              )}
            </ModalHeader>
            <div>
              <Swiper
                modules={[Pagination]}
                pagination={{ clickable: true }}
                spaceBetween={10}
                slidesPerView={1}
              >
                {story.stories.map((singleStory) => (
                  <SwiperSlide key={singleStory._id}>
                    <Image
                      width={700}
                      height={700}
                      src={singleStory.media}
                      alt={story.user.name}
                      className="w-full h-[400px] object-cover"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <ModalFooter className="flex justify-center">
              <div className="flex justify-center space-x-4">
                {isOwnStory ? (
                  <p className="text-pink-500 text-lg font-semibold text-center">
                    Total Reactions: {story.stories[0].reactions?.length || 0}
                  </p>
                ) : (
                  <>
                    {Object.entries(reactionIcons).map(([key, icon]) => (
                      <Button
                        key={key}
                        isIconOnly
                        color="default"
                        variant="flat"
                        aria-label={key}
                        className="text-pink-500 bg-transparent"
                        onClick={() => handleReaction(key as ReactionType)}
                      >
                        {icon}
                        <span className="ml-1 text-sm">
                          {story.stories[0].reactions?.find(
                            (r) => r.reaction === key
                          )?.count || 0}
                        </span>
                      </Button>
                    ))}
                  </>
                )}
              </div>
            </ModalFooter>
          </ModalBody>
        </ModalContent>
      </Modal>

      <Modal isOpen={isDeleteModalOpen} onOpenChange={onDeleteModalClose}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Confirm Deletion
          </ModalHeader>
          <ModalBody>
            <p>
              Are you sure you want to delete this story? This action cannot be
              undone.
            </p>
          </ModalBody>
          <ModalFooter>
            <Button
              className="delete-button"
              color="danger"
              onPress={handleDelete}
            >
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
