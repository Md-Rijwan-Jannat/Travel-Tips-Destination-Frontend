import React, { Suspense } from "react";

import Post from "../../_component/module/posts";
import PostDetailsSkeleton from "@/src/components/ui/skeleton/postDetailsSkeleton";

export default function PostsPage() {
  return (
    <Suspense fallback={<PostDetailsSkeleton />}>
      <Post />
    </Suspense>
  );
}
