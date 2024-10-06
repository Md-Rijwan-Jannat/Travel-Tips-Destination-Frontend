import { Avatar } from "@nextui-org/avatar";
import Link from "next/link";

import { TPost } from "@/src/types";
import PostDropdown from "../postActions/postDropdown";
import { GoVerified } from "react-icons/go";

interface PostHeaderProps {
  post: TPost;
}

export default function PostHeader({ post }: PostHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-3">
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
            className="font-semibold text-default-900 hover:underline flex items-center gap-1 mt-0.5"
            href={`/profile/${post?.user?._id}`}
          >
            {post?.user?.name}{" "}
            {post?.user?.verified && (
              <GoVerified className="text-primaryColor" />
            )}
          </Link>
          <Link
            suppressHydrationWarning
            className="block text-xs text-default-500 hover:underline"
            href={`/news-feed/posts/${post?._id}`}
          >
            {new Date(post?.createdAt).toLocaleDateString()}
          </Link>
        </div>
      </div>
      <PostDropdown postData={post} userInfo={post?.user} />
    </div>
  );
}
