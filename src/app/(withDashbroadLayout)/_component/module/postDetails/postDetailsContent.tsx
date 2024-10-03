"use client";

import Link from "next/link";
import { TPost } from "@/src/types";

interface PostDetailsContentProps {
  post: TPost;
}

export default function PostDetailsContent({ post }: PostDetailsContentProps) {
  return (
    <div>
      <Link href={`/news-feed/posts/${post?._id}`}>
        <h2 className="text-lg font-bold text-default-700">{post?.title}</h2>
        <div
          className="text-sm text-default-600 mt-2 line-clamp-3"
          dangerouslySetInnerHTML={{
            __html: post?.description,
          }}
        />
      </Link>
    </div>
  );
}
