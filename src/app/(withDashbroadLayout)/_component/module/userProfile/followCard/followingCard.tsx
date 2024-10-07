"use client";

import { TUser } from "@/src/types";
import { Avatar } from "@nextui-org/avatar";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Follow from "../follow";
import { useUser } from "@/src/hooks/useUser";

interface TFollowerProps {
  user: TUser;
}

export default function FollowingCard({ user }: TFollowerProps) {
  const { image, name, _id } = (user as unknown as TUser) || {};

  const { userInfo } = useUser();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7 }}
      className="bg-default-50 border border-default-200 rounded-md p-2 duration-300 ease-in-out"
    >
      <div className="flex flex-col items-center justify-center gap-3">
        <Avatar
          as={Link}
          href={`/profile/${_id}`}
          alt="premium post"
          className="text-[20px] text-primaryColor"
          name={name.charAt(0).toUpperCase()}
          size="md"
          src={image || undefined}
        />
        <div className="flex flex-col items-center justify-center gap-2">
          <Link
            href={`/profile/${_id}`}
            className="font-semibold text-default-900 text-[12px] whitespace-nowrap
            "
          >
            {name}
          </Link>
          <p className="text-default-500 text-[10px] bg-pink-500/10 rounded-full px-2">
            Friends
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          className={` flex items-center gap-1 rounded-full px-3 py-1 border border-default-200 hover:bg-default-100 transition-colors-opacity duration-500 ease-in-out text-xs text-default-500`}
        >
          Followed by you
        </motion.button>
      </div>
    </motion.div>
  );
}
