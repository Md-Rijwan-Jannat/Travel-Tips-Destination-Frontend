"use client";

import React, { useState } from "react";
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import {
  FaRegComment,
  FaShare,
  FaThumbsDown,
  FaThumbsUp,
} from "react-icons/fa";
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
import { copyToClipboard } from "@/src/utils/copyToClipboard";
import { RiShareForwardLine } from "react-icons/ri";

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

  const [localLikes, setLocalLikes] = useState(likes || []);
  const [localDislikes, setLocalDislikes] = useState(dislikes || []);

  const likeExists = localLikes.includes(userId);
  const dislikeExists = localDislikes.includes(userId);

  // Copy handler
  const handleCopyLink = () => {
    const postUrl = `${window.location.origin}/posts/${_id}`;

    copyToClipboard(postUrl);
  };

  // Handle Like Action
  const handleLike = async () => {
    try {
      if (likeExists) {
        // User already liked the post, so unlike it
        setLocalLikes((prevLikes) => prevLikes.filter((id) => id !== userId));
        await unLikeFn(_id);
      } else {
        // User hasn't liked the post, like it and remove dislike if necessary
        setLocalLikes((prevLikes) => [...prevLikes, userId]);
        await likeFn(_id);
        if (dislikeExists) {
          setLocalDislikes((prevDislikes) =>
            prevDislikes.filter((id) => id !== userId)
          );
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
        setLocalDislikes((prevDislikes) =>
          prevDislikes.filter((id) => id !== userId)
        );
        await unDislikeFn(_id);
      } else {
        setLocalDislikes((prevDislikes) => [...prevDislikes, userId]);
        await disLikeFn(_id);
        if (likeExists) {
          setLocalLikes((prevLikes) => prevLikes.filter((id) => id !== userId));
          await unLikeFn(_id);
        }
      }
    } catch (error) {
      console.error("Error disliking the post:", error);
    }
  };

  return (
    <div className="flex flex-col items-start">
      <div className="flex justify-between border-t border-b border-default-200 py-2 w-full mt-5">
        <div className="text-xs flex items-center gap-1">
          {localLikes.length > 0 ? (
            <FaThumbsUp className={`text-blue-500`} size={16} />
          ) : (
            <AiOutlineLike className={`text-default-500`} size={16} />
          )}
          {localLikes.length}
        </div>
        <div className="text-xs flex items-center gap-1">
          {localDislikes.length > 0 ? (
            <FaThumbsDown className={`text-red-500`} size={16} />
          ) : (
            <AiOutlineDislike className={`text-default-500`} size={16} />
          )}
          {localDislikes.length}
        </div>
        <div className="text-xs flex items-center gap-1 text-default-500 ">
          <FaRegComment size={16} /> {comments?.length}
        </div>
        <div className="text-xs flex items-center gap-1 text-default-500 ">
          <RiShareForwardLine size={18} /> {0}
        </div>
      </div>

      <div className="flex items-center justify-between gap-2 py-2 w-full border-t border-default-100">
        {/* Like Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className={`flex items-center text-xs md:text-sm gap-1 rounded py-1 transition-colors ${
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
          className={`flex items-center text-xs md:text-sm gap-1 rounded py-1 transition-colors ${
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
        <Comment _id={post?._id} />

        {/* Copy Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center text-xs md:text-sm text-default-600 hover:text-blue-500 gap-1 rounded py-1"
          onClick={handleCopyLink}
        >
          <MdOutlineContentCopy size={16} />
          Copy
        </motion.button>

        {/* Share Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center text-xs md:text-sm text-default-600 hover:text-blue-500 gap-1 rounded py-1"
        >
          <RiShareForwardLine size={18} />
          Share
        </motion.button>
      </div>
    </div>
  );
}
