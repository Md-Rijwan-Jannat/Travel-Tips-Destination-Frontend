"use client";

import { Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/modal";
import { toast } from "sonner";
import GlassLoader from "@/src/components/shared/glassLoader";
import { useState } from "react";
import { useDeleteCommentsForPostsMutation } from "@/src/redux/features/post/commentApi";
import CButton from "@/src/components/ui/CButton/CButton";
import { primaryColor, secondaryColor } from "@/src/styles/button";

interface CommentDeleteModalProps {
  commentId: string;
  isOpen: boolean;
  onOpenChange: () => void;
}

export default function CommentDeleteModal({
  commentId,
  isOpen,
  onOpenChange,
}: CommentDeleteModalProps) {
  const [deleteCommentFn, { isLoading }] = useDeleteCommentsForPostsMutation();
  const [isError, setIsError] = useState<string>("");

  const handleDelete = async () => {
    try {
      await deleteCommentFn(commentId);
      toast.success("Comment deleted successfully");
      setIsError("");
      onOpenChange();
    } catch (error) {
      setIsError("Failed to delete comment");
      toast.error("Failed to delete comment");
    }
  };

  return (
    <Modal
      size="md"
      placement="center"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      {isLoading && <GlassLoader />}
      <ModalContent className="m-2">
        <ModalHeader>Confirm Delete</ModalHeader>
        <ModalBody>
          {isError && <p className="text-center text-red-500">{isError}</p>}
          <p>Are you sure you want to delete this comment?</p>
        </ModalBody>
        <div className="flex items-center gap-3 justify-end mt-10 mb-5">
          <CButton
            size="md"
            onClick={handleDelete}
            bgColor={primaryColor}
            text="Yes, Delete"
          />
          <CButton
            size="md"
            onClick={onOpenChange}
            bgColor={secondaryColor}
            text="Cancel"
          />
        </div>
      </ModalContent>
    </Modal>
  );
}
