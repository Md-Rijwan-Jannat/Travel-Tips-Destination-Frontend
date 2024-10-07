"use client";

import { useEffect } from "react";
import Link from "next/link";
import { TPost } from "@/src/types";
import { FaFilePdf } from "react-icons/fa6";
import { Button } from "@nextui-org/button";
import { generatePDF } from "@/src/utils/generatePDF";

interface PostContentProps {
  post: TPost;
}

export default function PostContent({ post }: PostContentProps) {
  useEffect(() => {
    if (!post) {
      return;
    }
  }, [post]);

  // Function to safely render HTML content
  const createMarkup = (html: string) => {
    return { __html: html };
  };

  // Function to style links in the description
  const styleLinksInDescription = (html: string) => {
    return html.replace(
      /<a\s+(href="[^"]*")/g,
      `<a class="text-pink-500 hover:underline" $1`
    );
  };

  // Function to truncate description to a specified length
  const truncateDescription = (html: string, maxLength: number) => {
    const plainText = html.replace(/<[^>]+>/g, ""); // Remove HTML tags

    return plainText.length > maxLength
      ? { truncated: `${plainText.slice(0, maxLength)}...`, isTruncated: true }
      : { truncated: plainText, isTruncated: false };
  };

  const { truncated, isTruncated } = truncateDescription(post?.description, 60);

  // Title, description pdf creations
  const downloadPDF = async () => {
    generatePDF(post);
  };

  return (
    <div>
      <Link
        href={`/news-feed/posts/${post?._id}`}
        className="text-lg font-bold text-default-700"
      >
        {post?.title}
      </Link>
      <div className="flex items-center gap-1">
        <div
          className="text-xs md:text-sm text-default-600 mt-2 line-clamp-3 flex gap-1"
          dangerouslySetInnerHTML={createMarkup(
            styleLinksInDescription(isTruncated ? truncated : post?.description)
          )}
        />
        {isTruncated && (
          <Link
            href={`/news-feed/posts/${post?._id}`}
            className="text-pink-500 hover:underline mt-2 inline-block text-xs md:text-sm whitespace-nowrap"
          >
            Read More
          </Link>
        )}
      </div>

      {/* Button to download the description and images as a PDF */}
      <div className="flex w-full items-end justify-end">
        <Button
          className="mt-3 text-pink-500"
          startContent={<FaFilePdf size={18} />}
          size="sm"
          onClick={downloadPDF}
        >
          Download
        </Button>
      </div>
    </div>
  );
}
