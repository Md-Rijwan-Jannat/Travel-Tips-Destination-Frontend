import React, { useState } from "react";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/modal";
import { TPost } from "@/src/types";
import { useUser } from "@/src/hooks/useUser";
import { Chip } from "@nextui-org/chip";
import { PiCrownSimpleDuotone } from "react-icons/pi";
import PostHeader from "../module/posts/postCard/postHeader";
import PostContent from "../module/posts/postCard/postContent";
import PostImage from "../module/posts/postCard/postImages";
import PostActions from "../module/posts/postActions/postActions";

interface TDetailsPageModalProps {
  post: TPost;
  isOpen: boolean;
  onClose: () => void;
}

export default function DetailsPageModal({
  post,
  isOpen,
  onClose,
}: TDetailsPageModalProps) {
  const { userInfo: currentUser } = useUser();

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="w-full md:w-[800px]">
      <ModalContent>
        <ModalHeader className="border-b border-default-200">
          <PostHeader post={post} />
        </ModalHeader>
        <ModalBody>
          <div className="space-y-4">
            {/* Post Content */}
            <PostContent post={post} />

            {/* Post Images */}
            {post?.images.length > 0 && <PostImage post={post} />}

            {/* Premium Chip */}
            {post.status === "PREMIUM" && (
              <Chip
                className="px-2"
                endContent={
                  <PiCrownSimpleDuotone
                    className="text-yellow-500 mb-0.5"
                    size={14}
                  />
                }
              >
                {currentUser?.verified ? "Subscribed" : "Premium"}
              </Chip>
            )}

            {/* Post Actions */}
            <PostActions post={post} />
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
