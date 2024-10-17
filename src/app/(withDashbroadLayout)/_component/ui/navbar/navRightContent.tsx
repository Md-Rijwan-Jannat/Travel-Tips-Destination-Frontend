'use client';

import { Bell } from 'lucide-react';
import React from 'react';
import { Badge } from '@nextui-org/badge';
import NavDropdown from '@/src/app/(withCommonLayout)/_component/ui/navbar/navDropdown';
import Link from 'next/link';
import { useAppSelector } from '@/src/redux/hook';
import { getNotifications } from '@/src/redux/features/message/notificationSlice';

export default function NavRightContent() {
  const notifications = useAppSelector(getNotifications);

  return (
    <div className="flex items-center justify-center gap-5">
      <Badge
        as={Link}
        href="/notifications"
        size="md"
        color="danger"
        content={notifications?.length || 0}
        shape="circle"
      >
        <Bell />
      </Badge>
      <NavDropdown />
    </div>
  );
}
