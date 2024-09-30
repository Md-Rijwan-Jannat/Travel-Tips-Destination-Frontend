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
        <Link href={`/users/${post?.user?.name}`}>
          <Avatar
            name={post?.user?.name.charAt(0).toUpperCase()}
            src={post?.user?.image || undefined}
            className="w-10 h-10 rounded-full object-cover text-[22px]"
          />
        </Link>
        <div>
          <Link
            href={`/users/${post?.user?.name}`}
            className="block font-semibold text-default-900 hover:underline"
          >
            {post?.user?.name}
          </Link>
          <Link
            href={`/posts/${post?._id}`}
            className="block text-sm text-default-500 hover:underline"
            suppressHydrationWarning
          >
            {new Date(post?.createdAt).toLocaleDateString()}
          </Link>
        </div>
      </div>
    </div>
  );
}
