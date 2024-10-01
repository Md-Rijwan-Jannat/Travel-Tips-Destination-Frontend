import React from "react";
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";

interface PostActionsProps {
  likes: number;
  dislikes: number;
  comments: number;
}

export default function PostActions({
  likes,
  dislikes,
  comments,
}: PostActionsProps) {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-4">
        {/* Like Button */}
        {/* <LikeButton postId={post.id} /> */}
        <button className="flex items-center text-sm text-default-600 hover:text-blue-500 gap-0.5">
          <AiOutlineLike size={16} />
          Like
        </button>
        <button className="flex items-center text-sm text-default-600 hover:text-red-500 gap-0.5">
          <AiOutlineDislike size={16} />
          Dislike
        </button>
      </div>

      {/* Comment Button */}
      <button className="flex items-center text-sm text-default-600 hover:text-blue-500 gap-0.5">
        <FaRegComment size={16} />
        Comment
      </button>

      {/* Bookmark Button */}
      <button className="flex items-center text-sm text-default-600 hover:text-blue-500">
        <svg
          className="h-5 w-5 mr-1"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5 6l7-3 7 3v14l-7-3-7 3V6z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Save
      </button>
    </div>
  );
}
