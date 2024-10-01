"use client";

import { TPost, TUser } from "@/src/types";
import React from "react";
import { Image } from "@nextui-org/image";
import { Image as NextImage } from "@nextui-org/image";
import { GoVerified } from "react-icons/go";
import { Avatar } from "@nextui-org/avatar";
import { Divider } from "@nextui-org/divider";
import { Tab, Tabs } from "@nextui-org/tabs";
import {
  useGetMyPostsQuery,
  useGetMyPremiumPostsQuery,
} from "@/src/redux/features/post/postApi";
import PostCard from "../posts/postCard/postCard";

interface TUserProps {
  user: TUser | undefined;
}

export default function Profile({ user }: TUserProps) {
  const { data: myPostsData } = useGetMyPostsQuery(undefined);
  const myPosts = myPostsData?.data as TPost[];
  const { data: myPremiumPostsData } = useGetMyPremiumPostsQuery(undefined);
  const myPremiumPosts = myPremiumPostsData?.data as TPost[];

  if (!user) {
    return <div className="text-center">User not found.</div>;
  }

  const { name, image, flower, flowing, role, verified } =
    (user as TUser) || {};

  return (
    <div className="w-full md:w-[600px] mx-auto">
      {/* Profile Section */}
      <div className="flex flex-col items-center">
        <div className="">
          <Avatar
            className={`cursor-pointer text-[24px] font-bold z-20 -mt-5`}
            name={user?.name?.charAt(0)?.toUpperCase()}
            size="lg"
            src={user?.image || undefined}
          />
        </div>
        {verified ? (
          <h2 className="text-lg font-bold mt-2 flex items-center gap-1">
            {name} <GoVerified />
          </h2>
        ) : (
          <h2 className="text-lg font-bold mt-2">{name}</h2>
        )}
        {!verified ? (
          <span className="text-green-500 text-sm font-semibold flex items-center gap-1 border-dashed border-primaryColor p-z-2 py-1 rounded-full">
            Verified <GoVerified />
          </span>
        ) : (
          <span className="text-xs text-default-500 font-semibold flex items-center gap-1 border border-dashed border-primaryColor px-2 py-1 rounded-full cursor-pointer">
            {" "}
            <GoVerified className="text-primaryColor" />
            Verify Now
          </span>
        )}

        {/* Follower and Following Count */}
        <div className="flex justify-around w-full mt-4">
          <div className="text-center">
            <h3 className="font-semibold text-lg">{flower?.length || 0}</h3>
            <p className="text-gray-500 text-sm">Followers</p>
          </div>
          <div className="text-center">
            <h3 className="font-semibold text-lg">{flowing?.length || 0}</h3>
            <p className="text-gray-500 text-sm">Following</p>
          </div>
        </div>

        {/* Follow and Message Buttons */}
        <div className="flex gap-4 mt-4 justify-between w-full">
          <button className="px-4 py-1 bg-pink-500 text-white rounded-full">
            Follow
          </button>
          <button className="px-4 py-1 border border-pink-500 text-pink-500 rounded-full">
            Un Follow
          </button>
        </div>
        <Divider className="my-4 text-default-100" />
        {/* Tab Navigation */}
        <div className="flex flex-col">
          <Tabs aria-label="Options" className=" w-full md:w-[600px]">
            <Tab key="posts" className="w-full" title="My Posts">
              <div className="grid grid-cols-1 gap-5 p-2 bg-default-50">
                {myPosts?.map((post) => (
                  <PostCard key={post._id} post={post} />
                ))}
              </div>
            </Tab>
            <Tab
              key="my-premium-posts"
              className="w-full"
              title="My Premium Posts"
            >
              <div className="grid grid-cols-1 gap-5 p-2 bg-default-50">
                {myPremiumPosts?.map((post) => (
                  <PostCard key={post._id} post={post} />
                ))}
              </div>
            </Tab>
            <Tab
              className="w-full"
              key="my-subscribed-posts"
              title="My Subscribed Posts"
            >
              <div className="grid grid-cols-1 gap-5 p-2 bg-default-50">
                {myPremiumPosts?.map((post) => (
                  <PostCard key={post._id} post={post} />
                ))}
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
