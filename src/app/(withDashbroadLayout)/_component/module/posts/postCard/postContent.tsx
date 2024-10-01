import Link from "next/link";

import { TPost } from "@/src/types";

interface PostContentProps {
  post: TPost;
}

export default function PostContent({ post }: PostContentProps) {
  return (
    <div>
      <Link href={`/posts/${post?._id}`}>
        <h2 className="text-lg font-bold text-default-700">{post?.title}</h2>
        <p className="text-sm text-default-600 mt-2 line-clamp-3">
          {post?.description}
        </p>
      </Link>
    </div>
  );
}
