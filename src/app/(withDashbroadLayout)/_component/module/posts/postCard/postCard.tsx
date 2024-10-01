"use client";

import PostHeader from "./postHeader";
import PostContent from "./postContent";
import PostImage from "./postImages";
import PostActions from "./postActions";

import { TPost } from "@/src/types";

interface TPostCardProps {
  post: TPost;
}

export default function PostCard({ post }: TPostCardProps) {
  return (
    <div className="w-full md:w-[600px] mx-auto">
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
        <PostActions
          comments={post.comments.length}
          dislikes={post.dislikes.length}
          likes={post.likes.length}
        />
      </article>
    </div>
  );
}
