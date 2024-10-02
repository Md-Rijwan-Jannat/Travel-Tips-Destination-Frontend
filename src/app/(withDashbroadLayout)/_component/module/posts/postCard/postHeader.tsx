import { Avatar } from "@nextui-org/avatar";
import Link from "next/link";

import { TPost } from "@/src/types";

interface PostHeaderProps {
  post: TPost;
}

export default function PostHeader({ post }: PostHeaderProps) {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-3">
        <Link href={`/profile/${post?.user?._id}`}>
          <Avatar
            className="w-10 h-10 rounded-full object-cover text-[22px]"
            name={post?.user?.name?.charAt(0).toUpperCase()}
            src={post?.user?.image || undefined}
          />
        </Link>
        <div>
          <Link
            className="block font-semibold text-default-900 hover:underline"
            href={`/profile/${post?.user?._id}`}
          >
            {post?.user?.name}
          </Link>
          <Link
            suppressHydrationWarning
            className="block text-sm text-default-500 hover:underline"
            href={`/posts/${post?._id}`}
          >
            {new Date(post?.createdAt).toLocaleDateString()}
          </Link>
        </div>
      </div>
    </div>
  );
}
