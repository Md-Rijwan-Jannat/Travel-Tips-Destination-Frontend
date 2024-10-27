// src/components/MenuBar.tsx
'use client';

import React from 'react';
import { FaBell, FaUsers } from 'react-icons/fa';
import { IoIosCheckmarkCircle } from 'react-icons/io';
import { TbArrowAutofitContentFilled } from 'react-icons/tb';
import { RiSecurePaymentFill } from 'react-icons/ri';
import { FaFacebookMessenger } from 'react-icons/fa6';
import { MdAnalytics, MdDynamicFeed } from 'react-icons/md';
import { useAppSelector } from '@/src/redux/hook';
import { useRouter } from 'next/navigation';
import { useUser } from '@/src/hooks/useUser';
import MenubarButton from './menubarButton';

interface TMenuBarProps {
  className: string;
}

export default function MenuBar({ className }: TMenuBarProps) {
  const { userInfo } = useUser();
  const router = useRouter();
  const token = useAppSelector((state) => state.auth?.token);

  if (!token) {
    router.push('/login');
  }

  return (
    <div
      className={`${className} flex flex-row justify-between lg:justify-center lg:flex-col gap-4`}
    >
      {userInfo?.role === 'USER' && (
        <>
          {/* Common Menu Items */}
          <MenubarButton
            href="/news-feed/posts"
            title="News Feed"
            icon={<MdDynamicFeed className="text-[20px]" />}
          />
          <MenubarButton
            href="/followers"
            title="Followers"
            icon={<FaUsers className="text-[20px]" />}
          />
          <MenubarButton
            href="/following"
            title="Flowing"
            icon={<IoIosCheckmarkCircle className="text-[20px]" />}
          />
          <MenubarButton
            href="/notifications"
            title="Notifications"
            icon={<FaBell className="text-[20px]" />}
          />
          <MenubarButton
            href="/messages"
            title="Messages"
            icon={<FaFacebookMessenger className="text-[20px]" />}
          />
        </>
      )}

      {/* Admin-specific Menu Items */}
      {userInfo?.role === 'ADMIN' && (
        <>
          <MenubarButton
            href="/news-feed/posts"
            title="News Feed"
            icon={<MdDynamicFeed className="text-[20px]" />}
          />
          <MenubarButton
            href="/admin-dashboard/manage-users"
            title="Manage Users"
            icon={<FaUsers className="text-[20px]" />}
          />
          <MenubarButton
            href="/admin-dashboard/manage-content"
            title="Manage Content"
            icon={<TbArrowAutofitContentFilled className="text-[20px]" />}
          />
          <MenubarButton
            href="/admin-dashboard/payments"
            title="Payments"
            icon={<RiSecurePaymentFill className="text-[20px]" />}
          />
          <MenubarButton
            href="/admin-dashboard/analytics"
            title="View Analytics"
            icon={<MdAnalytics className="text-[20px]" />}
          />
          <MenubarButton
            href="/notifications"
            title="Notifications"
            icon={<FaBell className="text-[20px]" />}
          />
          <MenubarButton
            href="/messages"
            title="Messages"
            icon={<FaFacebookMessenger className="text-[20px]" />}
          />
        </>
      )}
    </div>
  );
}
