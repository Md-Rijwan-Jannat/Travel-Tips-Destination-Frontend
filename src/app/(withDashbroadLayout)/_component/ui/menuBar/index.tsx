// src/components/MenuBar.tsx
"use client";

import React from "react";
import { FaBell, FaEnvelope, FaUsers } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa6";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { TbArrowAutofitContentFilled } from "react-icons/tb";
import { RiSecurePaymentFill } from "react-icons/ri";
import { FaFacebookMessenger } from "react-icons/fa6";
import { IoNotificationsOutline } from "react-icons/io5";
import { MdAnalytics } from "react-icons/md";
import { GoHome } from "react-icons/go";
import { useAppSelector } from "@/src/redux/hook";
import { useRouter } from "next/navigation";
import { useUser } from "@/src/hooks/useUser";
import MenubarButton from "./menubarButton";

interface TMenuBarProps {
  className: string;
}

export default function MenuBar({ className }: TMenuBarProps) {
  const { userInfo } = useUser();
  const router = useRouter();
  const token = useAppSelector((state) => state.auth?.token);

  if (!token) {
    router.push("/login");

    return null;
  }

  return (
    <div
      className={`${className} flex flex-row justify-between lg:justify-center lg:flex-col gap-4`}
    >
      {userInfo?.role === "USER" && (
        <>
          {/* Common Menu Items */}
          <MenubarButton
            href="/news-feed/posts"
            title="News Feed"
            icon={<GoHome className="text-[20px]" />}
          />
          <MenubarButton
            href="/friends"
            title="Friends"
            icon={<FaUsers className="text-[20px]" />}
          />
          <MenubarButton
            href="/flowing"
            title="Flowing"
            icon={<IoIosCheckmarkCircle className="text-[20px]" />}
          />
          <MenubarButton
            href="/#"
            title="Notifications"
            icon={<IoNotificationsOutline className="text-[20px]" />}
          />
          <MenubarButton
            href="/#"
            title="Messages"
            icon={<FaFacebookMessenger className="text-[20px]" />}
          />
          <MenubarButton
            href="/bookmarks"
            title="Bookmarks"
            icon={<FaBookmark className="text-[20px]" />}
          />
        </>
      )}

      {/* Admin-specific Menu Items */}
      {userInfo?.role === "ADMIN" && (
        <>
          <MenubarButton
            href="/news-feed/posts"
            title="News Feed"
            icon={<GoHome className="text-[20px]" />}
          />
          <MenubarButton
            href="/admin-dashboard/manage-users"
            title="Manage Users"
            icon={<FaUsers className="text-[20px]" />}
            delay={0.6}
          />
          <MenubarButton
            href="/admin-dashboard/manage-content"
            title="Manage Content"
            icon={<TbArrowAutofitContentFilled className="text-[20px]" />}
            delay={0.7}
          />
          <MenubarButton
            href="/admin-dashboard/payments"
            title="Manage Payments"
            icon={<RiSecurePaymentFill className="text-[20px]" />}
            delay={0.8}
          />
          <MenubarButton
            href="/admin-dashboard/analytics"
            title="View Analytics"
            icon={<MdAnalytics className="text-[20px]" />}
            delay={0.9}
          />
          <MenubarButton
            href="/#"
            title="Notifications"
            icon={<IoNotificationsOutline className="text-[20px]" />}
          />
          <MenubarButton
            href="/#"
            title="Messages"
            icon={<FaFacebookMessenger className="text-[20px]" />}
          />
        </>
      )}
    </div>
  );
}
