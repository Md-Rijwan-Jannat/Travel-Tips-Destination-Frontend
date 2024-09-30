import React from "react";
import { Link } from "@nextui-org/link";
import { FaBell, FaEnvelope, FaUsers } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa6";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { GoHome } from "react-icons/go";

interface TMenuBarProps {
  className: string;
}

export default function MenuBar({ className }: TMenuBarProps) {
  return (
    <div
      className={`${className} flex flex-row justify-between lg:justify-center lg:flex-col gap-4 bg-default-50 py-2 lg:py-0`}
    >
      {/* Home div */}
      <div
        className="flex items-center justify-start gap-3 border border-default-200 rounded-full hover:bg-default-200 p-2 transition-colors-opacity duration-300"
        title="Home"
      >
        <Link className="flex items-center gap-2 text-pink-500" href="/">
          <GoHome className="text-[25px] lg:text-[20px]" />
          <span className="hidden lg:inline">Home</span>
        </Link>
      </div>

      {/* Flower div */}

      <div
        className="flex items-center justify-start gap-3 border border-default-200 rounded-full hover:bg-default-200 p-2 transition-colors-opacity duration-300"
        title="Friends"
      >
        <Link className="flex items-center gap-2 text-pink-500" href="/friends">
          <FaUsers className="text-[25px] lg:text-[20px]" />
          <span className="hidden lg:inline">Flowers</span>
        </Link>
      </div>

      {/* Flowing div */}
      <div
        className="flex items-center justify-start gap-3 border border-default-200 rounded-full hover:bg-default-200 p-2 transition-colors-opacity duration-300"
        title="Friends"
      >
        <Link className="flex items-center gap-2 text-pink-500" href="/friends">
          <IoIosCheckmarkCircle className="text-[25px] lg:text-[20px]" />
          <span className="hidden lg:inline">Flowing</span>
        </Link>
      </div>

      {/* Notifications div */}
      <div
        className="flex items-center justify-start gap-3 border border-default-200 rounded-full hover:bg-default-200 p-2 transition-colors-opacity duration-300"
        title="Notifications"
      >
        <Link
          className="flex items-center gap-2 text-pink-500"
          href="/notifications"
        >
          <FaBell className="text-[25px] lg:text-[20px]" />
          <span className="hidden lg:inline">Notifications</span>
        </Link>
      </div>

      {/* Messages div */}
      <div
        className="flex items-center justify-start gap-3 border border-default-200 rounded-full hover:bg-default-200 p-2 transition-colors-opacity duration-300"
        title="Messages"
      >
        <Link
          className="flex items-center gap-2 text-pink-500"
          href="/messages"
        >
          <FaEnvelope className="text-[25px] lg:text-[20px]" />
          <span className="hidden lg:inline">Messages</span>
        </Link>
      </div>

      {/* Bookmarks div */}
      <div
        className="flex items-center justify-start gap-3 border border-default-200 rounded-full hover:bg-default-200 p-2 transition-colors-opacity duration-300"
        title="Bookmarks"
      >
        <Link
          className="flex items-center gap-2 text-pink-500"
          href="/bookmarks"
        >
          <FaBookmark className="text-[25px] lg:text-[20px]" />
          <span className="hidden lg:inline">Bookmarks</span>
        </Link>
      </div>
    </div>
  );
}
