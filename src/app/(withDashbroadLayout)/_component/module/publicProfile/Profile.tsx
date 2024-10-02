"use client";

import { TUser } from "@/src/types";
import React from "react";
import { GoVerified } from "react-icons/go";
import { Avatar } from "@nextui-org/avatar";
import { Divider } from "@nextui-org/divider";
import { motion } from "framer-motion";
import UpdateNameImageModal from "../posts/modal/updateUserModal";
import UserProfileTabs from "./userProfileTabs";
import { useUser } from "@/src/hooks/useUser";

interface TUserProps {
  user: TUser | undefined;
}

export default function Profile({ user }: TUserProps) {
  const { userInfo: currentUser } = useUser();

  if (!user) {
    return <div className="text-center">User not found.</div>;
  }

  const {
    _id,
    email,
    name,
    image,
    flower,
    flowing,
    verified,
    country,
    address,
  } = (user as TUser) || {};

  return (
    <motion.div
      className="w-full md:w-[500px] xl:w-[600px] mx-auto"
      initial={{ opacity: 0, y: 20 }} // Animating container on load
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Profile Section */}
      <div className="flex flex-col items-center relative">
        {currentUser?.email === email && (
          <div className="absolute right-2 top-0">
            <UpdateNameImageModal
              defaultImage={image}
              defaultName={name}
              userId={_id}
            />
          </div>
        )}

        <div>
          <Avatar
            className={`cursor-pointer text-[24px] font-bold z-20`}
            name={name?.charAt(0)?.toUpperCase()}
            size="lg"
            src={image || undefined}
          />
        </div>

        <h2 className="text-lg font-bold mt-2 flex items-center gap-2">
          {name} {verified && <GoVerified className="text-primaryColor" />}
        </h2>

        {currentUser?.email === email && (
          <>
            {!verified && (
              <motion.span
                whileHover={{ scale: 1.05 }}
                className="text-xs text-default-500 font-semibold flex items-center justify-center gap-1 border border-dashed border-primaryColor px-2 py-1 rounded-full cursor-pointer mt-1"
              >
                <GoVerified className="text-primaryColor" size={16} />
                Verify Now
              </motion.span>
            )}
          </>
        )}

        {/* Follower and Following Count */}
        <motion.div
          className="flex justify-around w-full mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="text-center">
            <h3 className="text-xs text-primaryColor">{flower?.length || 0}</h3>
            <p className="text-default-500 text-sm">Followers</p>
          </div>
          <div className="text-center">
            <h3 className="text-xs text-primaryColor">
              {flowing?.length || 0}
            </h3>
            <p className="text-default-500 text-sm">Following</p>
          </div>
        </motion.div>
        <div className="flex items-center gap-3 mt-3 text-start">
          <h2 className="text-default-500 text-xs rounded-full px-2 py-1 border border-default-100">
            {address && address}
          </h2>
          <h2 className="text-default-500 text-xs rounded-full px-2 py-1 border border-default-100">
            {country && country}
          </h2>
        </div>

        {/* Follow and Message Buttons */}

        {currentUser?.email === email ? (
          ""
        ) : (
          <motion.div
            className="flex gap-4 mt-4 justify-between w-full"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="px-4 py-1 bg-pink-500 text-white rounded-full"
            >
              Follow
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="px-4 py-1 border border-pink-500 text-pink-500 rounded-full"
            >
              Un Follow
            </motion.button>
          </motion.div>
        )}

        <Divider className="my-4 text-default-100" />

        {/* Tab Navigation */}
        <UserProfileTabs userId={user?._id} />
      </div>
    </motion.div>
  );
}
