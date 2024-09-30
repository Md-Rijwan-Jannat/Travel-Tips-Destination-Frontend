"use client";

import { TPost } from "@/src/types";
import PostHeader from "./postHeader";
import PostContent from "./postContent";
import PostImage from "./postImages";
import PostActions from "./postActions";

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
          <PostImage images={post.images} altText={post.title} />
        )}

        <hr className="border-default-200 my-4" />

        {/* Post Actions */}
        <PostActions
          likes={post.likes.length}
          dislikes={post.dislikes.length}
          comments={post.comments.length}
        />
      </article>
    </div>
  );
}
