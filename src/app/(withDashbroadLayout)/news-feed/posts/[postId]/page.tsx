"use client";

import React from "react";
import PostDetails from "../../../_component/module/postDetails";

interface TPostDetailsPage {
  params: {
    postId: string;
  };
}

export default function PostDetailsPage({ params }: TPostDetailsPage) {
  const { postId } = params;

  console.log("post id=>>", postId);

  return (
    <div>
      <PostDetails postId={postId} />
    </div>
  );
}
