import React, { Suspense } from "react";
import PostDetails from "../../../_component/module/postDetails";

interface TPostDetailsPage {
  params: {
    postId: string;
  };
}

export default function PostDetailsPage({ params }: TPostDetailsPage) {
  const { postId } = params;

  return (
    <Suspense fallback={<p>loading ...</p>}>
      <PostDetails postId={postId} />
    </Suspense>
  );
}
