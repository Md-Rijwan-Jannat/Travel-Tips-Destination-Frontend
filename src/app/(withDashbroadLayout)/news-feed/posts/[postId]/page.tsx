import React, { Suspense } from "react";
import PostDetails from "../../../_component/module/postDetails";
import PostDetailsSkeleton from "@/src/components/ui/skeleton/postDetailsSkeleton";

interface TPostDetailsPage {
  params: {
    postId: string;
  };
}

export default function PostDetailsPage({ params }: TPostDetailsPage) {
  const { postId } = params;

  return (
    <Suspense fallback={<PostDetailsSkeleton />}>
      <PostDetails postId={postId} />
    </Suspense>
  );
}
