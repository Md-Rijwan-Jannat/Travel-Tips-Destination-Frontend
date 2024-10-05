// LikeDislikeButtons.js
import React from "react";
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import { FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import {
  useLikeMutation,
  useUnLikeMutation,
  useDisLikeMutation,
  useUnDislikeMutation,
} from "@/src/redux/features/post/postApi";

interface TPostReactsProps {
  postId: string;
  likes: string[];
  dislikes: string[];
  currentUserId: string | undefined;
  setFeedback: (message: string) => void; // For feedback messages
}

const PostReacts: React.FC<TPostReactsProps> = ({
  postId,
  likes,
  dislikes,
  currentUserId,
  setFeedback,
}) => {
  const [likeFn] = useLikeMutation();
  const [unLikeFn] = useUnLikeMutation();
  const [disLikeFn] = useDisLikeMutation();
  const [unDislikeFn] = useUnDislikeMutation();

  const likeExists = likes?.includes(currentUserId!);
  const dislikeExists = dislikes?.includes(currentUserId!);

  const handleLike = async () => {
    try {
      if (likeExists) {
        await unLikeFn(postId);
        setFeedback("You unliked this post.");
      } else {
        await likeFn(postId);
        if (dislikeExists) {
          await unDislikeFn(postId);
          setFeedback("You un-disliked this post.");
        } else {
          setFeedback("You liked this post.");
        }
      }
    } catch (error) {
      console.error("Error liking the post:", error);
      setFeedback("Failed to update like status. Please try again.");
    }
  };

  const handleDislike = async () => {
    try {
      if (dislikeExists) {
        await unDislikeFn(postId);
        setFeedback("You un-disliked this post.");
      } else {
        await disLikeFn(postId);
        if (likeExists) {
          await unLikeFn(postId);
          setFeedback("You unliked this post.");
        } else {
          setFeedback("You disliked this post.");
        }
      }
    } catch (error) {
      console.error("Error disliking the post:", error);
      setFeedback("Failed to update dislike status. Please try again.");
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        className={`flex items-center gap-1 ${likeExists ? "text-blue-500" : "text-default-600 hover:text-blue-500"}`}
        onClick={handleLike}
      >
        {likeExists ? <FaThumbsUp size={16} /> : <AiOutlineLike size={16} />}
        {likes?.length}
      </button>
      <button
        className={`flex items-center gap-1 ${dislikeExists ? "text-red-500" : "text-default-600 hover:text-red-500"}`}
        onClick={handleDislike}
      >
        {dislikeExists ? (
          <FaThumbsDown size={16} />
        ) : (
          <AiOutlineDislike size={16} />
        )}
        {dislikes?.length}
      </button>
    </div>
  );
};

export default PostReacts;
