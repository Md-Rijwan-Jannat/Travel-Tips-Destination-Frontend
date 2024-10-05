"use client";

import React from "react";
import PostContent from "../posts/postCard/postContent";
import PostImage from "../posts/postCard/postImages";
import PostActions from "../posts/postCard/postActions/postActions";
import { useGetSinglePostQuery } from "@/src/redux/features/post/postApi";
import PostDetailsHeader from "./postDetailsHeader";
import PostDetailsContent from "./postDetailsContent";
import DetailsCommentCard from "../posts/postCard/postActions/postComments/detailsCommentCard";
import PostImages from "./postImages";

interface TPostDetailsProps {
  postId: string;
}

export default function PostDetails({ postId }: TPostDetailsProps) {
  const { data: postData, isError: error } = useGetSinglePostQuery(postId);

  const post = postData?.data;

  // Render error state
  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="w-full md:w-[500px] xl:w-[600px] mx-auto bg-default-50 rounded-md p-2 md:p-6">
      {/* Post Header */}
      <PostDetailsHeader post={post} />

      {/* Post Content */}
      <PostDetailsContent post={post} />

      {/* Post Images */}
      {post?.images.length > 0 && <PostImages post={post} />}

      {/* Post Actions */}
      <PostActions post={post} />

      <DetailsCommentCard postId={post?._id} />
    </div>
  );
}
