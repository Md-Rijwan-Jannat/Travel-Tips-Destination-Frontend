import React from "react";
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import { FaRegComment, FaShare } from "react-icons/fa";
import { MdOutlineContentCopy } from "react-icons/md"; // Copy icon
import {
  useLikeMutation,
  useUnLikeMutation,
  useDisLikeMutation,
  useUnDislikeMutation,
} from "@/src/redux/features/post/postApi";
import { useUser } from "@/src/hooks/useUser";
import { TPost } from "@/src/types";
import { motion } from "framer-motion";
import Comment from "./postComments/comment";

interface PostActionsProps {
  post: TPost;
}

export default function PostActions({ post }: PostActionsProps) {
  const { userInfo: currentUser } = useUser();
  const userId = currentUser?._id;

  const { _id, likes, dislikes, comments } = (post as TPost) || {};

  const [likeFn] = useLikeMutation();
  const [unLikeFn] = useUnLikeMutation();
  const [disLikeFn] = useDisLikeMutation();
  const [unDislikeFn] = useUnDislikeMutation();

  const likeExists = likes.includes(userId);
  const dislikeExists = dislikes.includes(userId);

  // Handle Like Action
  const handleLike = async () => {
    try {
      if (likeExists) {
        // User already liked the post, so unlike it
        await unLikeFn(_id);
      } else {
        // User hasn't liked the post, like it and remove dislike if necessary
        await likeFn(_id);
        if (dislikeExists) {
          await unDislikeFn(_id); // Remove dislike if user had disliked the post
        }
      }
    } catch (error) {
      console.error("Error liking the post:", error);
    }
  };

  // Handle Dislike Action
  const handleDislike = async () => {
    try {
      if (dislikeExists) {
        // User already disliked the post, so undislike it
        await unDislikeFn(_id);
      } else {
        // User hasn't disliked the post, dislike it and remove like if necessary
        await disLikeFn(_id);
        if (likeExists) {
          await unLikeFn(_id); // Remove like if user had liked the post
        }
      }
    } catch (error) {
      console.error("Error disliking the post:", error);
    }
  };

  return (
    <div className="flex flex-col items-start">
      <div className="flex justify-between border-t border-b border-default-200 py-2 w-full">
        <div className="text-xs flex items-center gap-1">
          <AiOutlineLike
            className={` ${
              likes.length > 0 ? "text-blue-500" : "text-default-600"
            }`}
            size={16}
          />{" "}
          {likes.length}
        </div>
        <div className="text-xs flex items-center gap-1">
          <AiOutlineDislike
            className={` ${
              dislikes.length > 0 ? "text-red-500" : "text-default-600"
            }`}
            size={16}
          />{" "}
          {dislikes.length}
        </div>
        <div className="text-xs flex items-center gap-1">
          <FaRegComment size={16} /> {comments.length}
        </div>
        <div className="text-xs flex items-center gap-1">
          <FaShare size={16} /> {0}
        </div>
      </div>

      <div className="flex items-center justify-between gap-2 py-2 w-full">
        {/* Like Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className={`flex items-center text-sm gap-1 rounded px-2 py-1 transition-colors ${
            likeExists
              ? "text-blue-500"
              : "text-default-600 hover:text-blue-500"
          }`}
          onClick={handleLike}
        >
          <AiOutlineLike size={16} />
          Like
        </motion.button>

        {/* Dislike Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className={`flex items-center text-sm gap-1 rounded px-2 py-1 transition-colors ${
            dislikeExists
              ? "text-red-500"
              : "text-default-600 hover:text-red-500"
          }`}
          onClick={handleDislike}
        >
          <AiOutlineDislike size={16} />
          Dislike
        </motion.button>

        {/* Comment Button */}
        <Comment />

        {/* Copy Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center text-sm text-default-600 hover:text-blue-500 gap-1 rounded px-2 py-1"
        >
          <MdOutlineContentCopy size={16} />
          Copy
        </motion.button>

        {/* Share Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center text-sm text-default-600 hover:text-blue-500 gap-1 rounded px-2 py-1"
        >
          <FaShare size={16} />
          Share
        </motion.button>
      </div>
    </div>
  );
}
