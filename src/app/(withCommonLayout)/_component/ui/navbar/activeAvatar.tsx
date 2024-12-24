'use client';

import React from 'react';
import { Avatar, AvatarProps } from '@nextui-org/avatar';
import { Badge } from '@nextui-org/badge';
import { useSocket } from '@/src/context/socketProvider';

interface ActiveAvatarProps extends AvatarProps {
  showConnectionStatus?: boolean;
}

export const ActiveAvatar: React.FC<ActiveAvatarProps> = ({
  showConnectionStatus = true,
  ...props
}) => {
  return (
    <Badge
      content=""
      color="success"
      shape="circle"
      placement="bottom-right"
      isInvisible={!showConnectionStatus || true}
    >
      <Avatar {...props} />
    </Badge>
  );
};
