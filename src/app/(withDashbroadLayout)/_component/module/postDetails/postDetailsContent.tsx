"use client";

import Link from "next/link";
import { TPost } from "@/src/types";
import { useEffect, useState } from "react";

interface PostDetailsContentProps {
  post: TPost;
}

export default function PostDetailsContent({ post }: PostDetailsContentProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Simulate fetching post content
  useEffect(() => {
    if (!post) {
      setError("Failed to load post.");
      setIsLoading(false);

      return;
    }
    setIsLoading(false);
  }, [post]);

  // Function to safely render HTML content
  const createMarkup = (html: string) => {
    return { __html: html };
  };

  // Function to style links in the description
  const styleLinksInDescription = (html: string) => {
    return html?.replace(
      /<a\s+(href="[^"]*")/g,
      `<a class="text-blue-500 hover:underline" $1`
    );
  };

  return (
    <div>
      <Link
        href={`/news-feed/posts/${post?._id}`}
        className="text-lg font-bold text-default-700"
      >
        {post?.title}
      </Link>
      <div
        className="text-xs md:text-sm text-default-600 mt-2"
        dangerouslySetInnerHTML={createMarkup(
          styleLinksInDescription(post?.description)
        )}
      />
    </div>
  );
}
