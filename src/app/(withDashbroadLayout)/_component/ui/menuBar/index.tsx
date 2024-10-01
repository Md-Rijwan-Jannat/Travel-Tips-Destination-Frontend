import React from "react";
import { FaBell, FaEnvelope, FaUsers } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa6";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { GoHome } from "react-icons/go";
import Link from "next/link";

interface TMenuBarProps {
  className: string;
}

export default function MenuBar({ className }: TMenuBarProps) {
  return (
    <div
      className={`${className} flex flex-row justify-between lg:justify-center lg:flex-col gap-4`}
    >
      {/* Home div */}
      <Link
        className="flex items-center justify-start gap-3 border border-default-200 bg-default-50 rounded-full hover:bg-default-200 p-2 transition-colors-opacity duration-300 cursor-pointer"
        href="/news-feed/posts"
        title="Home"
      >
        <div className="flex items-center gap-2 text-pink-500">
          <GoHome className="text-[25px] lg:text-[20px]" />
          <span className="hidden lg:inline">News Feed</span>
        </div>
      </Link>

      {/* Flower div */}

      <Link
        className="flex items-center justify-start gap-3 border border-default-200 bg-default-50 rounded-full hover:bg-default-200 p-2 transition-colors-opacity duration-300 cursor-pointer"
        href="/friends"
        title="Friends"
      >
        <div className="flex items-center gap-2 text-pink-500">
          <FaUsers className="text-[25px] lg:text-[20px]" />
          <span className="hidden lg:inline">Flowers</span>
        </div>
      </Link>

      {/* Flowing div */}
      <Link
        className="flex items-center justify-start gap-3 border border-default-200 bg-default-50 rounded-full hover:bg-default-200 p-2 transition-colors-opacity duration-300 cursor-pointer"
        href="/friends"
        title="Friends"
      >
        <div className="flex items-center gap-2 text-pink-500">
          <IoIosCheckmarkCircle className="text-[25px] lg:text-[20px]" />
          <span className="hidden lg:inline">Flowing</span>
        </div>
      </Link>

      {/* Notifications div */}
      <Link
        className="flex items-center justify-start gap-3 border border-default-200 bg-default-50 rounded-full hover:bg-default-200 p-2 transition-colors-opacity duration-300 cursor-pointer"
        href="/notifications"
        title="Notifications"
      >
        <div className="flex items-center gap-2 text-pink-500">
          <FaBell className="text-[25px] lg:text-[20px]" />
          <span className="hidden lg:inline">Notifications</span>
        </div>
      </Link>

      {/* Messages div */}
      <Link
        className="flex items-center justify-start gap-3 border border-default-200 bg-default-50 rounded-full hover:bg-default-200 p-2 transition-colors-opacity duration-300 cursor-pointer"
        href="/messages"
        title="Messages"
      >
        <div className="flex items-center gap-2 text-pink-500">
          <FaEnvelope className="text-[25px] lg:text-[20px]" />
          <span className="hidden lg:inline">Messages</span>
        </div>
      </Link>

      {/* Bookmarks div */}
      <Link
        className="flex items-center justify-start gap-3 border border-default-200 bg-default-50 rounded-full hover:bg-default-200 p-2 transition-colors-opacity duration-300 cursor-pointer"
        href="/bookmarks"
        title="Bookmarks"
      >
        <div className="flex items-center gap-2 text-pink-500">
          <FaBookmark className="text-[25px] lg:text-[20px]" />
          <span className="hidden lg:inline">Bookmarks</span>
        </div>
      </Link>
    </div>
  );
}
