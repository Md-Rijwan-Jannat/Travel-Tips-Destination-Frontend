"use client";

import React from "react";
import { FaBell, FaEnvelope, FaUsers } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa6";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { GoHome } from "react-icons/go";
import Link from "next/link";
import { motion } from "framer-motion";

interface TMenuBarProps {
  className: string;
}

export default function MenuBar({ className }: TMenuBarProps) {
  // Define animation variants
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div
      className={`${className} flex flex-row justify-between lg:justify-center lg:flex-col gap-4`}
    >
      {/* Home div */}
      <motion.div
        initial="hidden"
        animate="visible"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
        variants={itemVariants}
      >
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
      </motion.div>

      {/* Flower div */}
      <motion.div
        initial="hidden"
        animate="visible"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        variants={itemVariants}
      >
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
      </motion.div>

      {/* Flowing div */}
      <motion.div
        initial="hidden"
        animate="visible"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        variants={itemVariants}
      >
        <Link
          className="flex items-center justify-start gap-3 border border-default-200 bg-default-50 rounded-full hover:bg-default-200 p-2 transition-colors-opacity duration-300 cursor-pointer"
          href="/flowing"
          title="Flowing"
        >
          <div className="flex items-center gap-2 text-pink-500">
            <IoIosCheckmarkCircle className="text-[25px] lg:text-[20px]" />
            <span className="hidden lg:inline">Flowing</span>
          </div>
        </Link>
      </motion.div>

      {/* Notifications div */}
      <motion.div
        initial="hidden"
        animate="visible"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3, delay: 0.3 }}
        variants={itemVariants}
      >
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
      </motion.div>

      {/* Messages div */}
      <motion.div
        initial="hidden"
        animate="visible"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3, delay: 0.4 }}
        variants={itemVariants}
      >
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
      </motion.div>

      {/* Bookmarks div */}
      <motion.div
        initial="hidden"
        animate="visible"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3, delay: 0.5 }}
        variants={itemVariants}
      >
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
      </motion.div>
    </div>
  );
}
