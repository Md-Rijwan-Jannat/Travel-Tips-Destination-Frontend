'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  useFollowMutation,
  useGetSingleUserQuery,
  useUnFollowMutation,
} from '@/src/redux/features/user/userApi';
import { Button } from '@nextui-org/button';
import { useUser } from '@/src/hooks/useUser';
import { UserPlus, X } from 'lucide-react';

interface TFollowProps {
  userId: string;
}

export default function Follow({ userId }: TFollowProps) {
  const [followFn, { isLoading: followIsLoading }] = useFollowMutation();
  const [unFollowFn, { isLoading: unFollowIsLoading }] = useUnFollowMutation();
  const { data: userData } = useGetSingleUserQuery(userId);
  const user = userData?.data;
  const { userInfo: currentUser } = useUser();
  const currentUserId = currentUser?._id;
  const exists = user?.follower?.includes(currentUserId);

  const followHandler = async () => {
    try {
      await followFn(userId);
    } catch (error) {
      console.error('Follow failed===>', error);
    }
  };

  const unFollowHandler = async () => {
    try {
      await unFollowFn(userId);
    } catch (error) {
      console.error('Unfollow failed===>', error);
    }
  };

  return (
    <motion.div
      className="mt-3"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.4 }}
    >
      {exists ? (
        <Button
          className="flex-1 secondary-button"
          radius="full"
          size="sm"
          variant="flat"
          isLoading={unFollowIsLoading}
          onClick={unFollowHandler}
          disabled={unFollowIsLoading}
          startContent={<X size={18} />}
        >
          Disconnect
        </Button>
      ) : (
        <Button
          className="flex-1 primary-button"
          radius="full"
          size="sm"
          variant="flat"
          isLoading={followIsLoading}
          onClick={followHandler}
          disabled={followIsLoading}
          startContent={<UserPlus size={18} />}
        >
          Connect
        </Button>
      )}
    </motion.div>
  );
}
