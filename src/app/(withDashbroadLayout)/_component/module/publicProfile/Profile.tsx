"use client";

import { TUser } from "@/src/types";
import React from "react";
import { GoVerified } from "react-icons/go";
import { Avatar } from "@nextui-org/avatar";
import { Divider } from "@nextui-org/divider";
import { motion } from "framer-motion";
import UpdateNameImageModal from "../../modal/updateUserModal";
import UserProfileTabs from "./userProfileTabs";
import { useUser } from "@/src/hooks/useUser";
import Follow from "./follow";
import VerifiedForPayment from "../userProfile/VerifiedForPayment.tsx";
import { ActiveAvatar } from "@/src/app/(withCommonLayout)/_component/ui/navbar/activeAvatar";

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
    bio,
    follower,
    following,
    verified,
    country,
    address,
  } = (user as TUser) || {};

  return (
    <motion.div
      className="w-full"
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
              country={country}
              address={address}
              userId={_id}
              bio={bio}
            />
          </div>
        )}

        <div>
          <ActiveAvatar
            className={`cursor-pointer text-[24px] font-bold z-20`}
            name={name?.charAt(0)?.toUpperCase()}
            size="lg"
            src={image || undefined}
            userId={_id as string}
          />
        </div>

        <h2 className="text-lg font-bold mt-2 flex items-center gap-2">
          {name} {verified && <GoVerified className="text-primaryColor" />}
        </h2>
        {bio && <p className="text-default-600 text-xs">( {bio} ) </p>}

        {/* Follower and Following Count */}
        <motion.div
          className="flex justify-around w-full mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="text-center">
            <h3 className="text-xs text-primaryColor">
              {follower?.length || 0}
            </h3>
            <p className="text-gray-500 text-sm">Followers</p>
          </div>
          <div className="text-center">
            <h3 className="text-xs text-primaryColor">
              {following?.length || 0}
            </h3>
            <p className="text-gray-500 text-sm">Following</p>
          </div>
        </motion.div>

        {!verified && user.email === currentUser?.email && (
          <VerifiedForPayment user={user} />
        )}

        <div className="flex items-center gap-3 mt-5 text-start">
          {address && (
            <h2 className="text-default-500 text-xs rounded-full px-2 py-1 border border-default-100">
              {address}
            </h2>
          )}
          {country && (
            <h2 className="text-default-500 text-xs rounded-full px-2 py-1 border border-default-100">
              {country}
            </h2>
          )}
        </div>
        <Divider className="my-4 text-default-100" />

        {/* Tab Navigation */}
        <UserProfileTabs userId={user?._id} />
      </div>
    </motion.div>
  );
}
