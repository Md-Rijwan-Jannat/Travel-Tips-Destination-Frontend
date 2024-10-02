"use client";

import PostHeader from "./postHeader";
import PostContent from "./postContent";
import PostImage from "./postImages";
import PostActions from "./postActions";

import { TPost } from "@/src/types";
import { motion } from "framer-motion";

interface TPostCardProps {
  post: TPost;
}

export default function PostCard({ post }: TPostCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7 }}
      className="w-full md:w-[500px] xl:w-[600px] mx-auto"
    >
      <article className="group/post space-y-4 rounded-lg border border-default-200 bg-default-50 p-6 duration-300 ease-in-out">
        {/* Post Header */}
        <PostHeader post={post} />

        {/* Post Content */}
        <PostContent post={post} />

        {/* Post Image */}
        {post?.images.length > 0 && (
          <PostImage altText={post.title} images={post.images} />
        )}

        <hr className="border-default-200 my-4" />

        {/* Post Actions */}
        <PostActions post={post} />
      </article>
    </motion.div>
  );
}
