'use client';

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '@nextui-org/modal';
import { toast } from 'sonner';
import GlassLoader from '@/src/components/shared/glassLoader';
import { useState } from 'react';
import { useDeleteCommentsForPostsMutation } from '@/src/redux/features/post/commentApi';
import CButton from '@/src/components/ui/CButton/CButton';
import { primaryColor, secondaryColor } from '@/src/styles/button';
import { Button } from '@nextui-org/button';

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
  const [isError, setIsError] = useState<string>('');

  const handleDelete = async () => {
    try {
      await deleteCommentFn(commentId);
      toast.success('Comment deleted successfully');
      setIsError('');
      onOpenChange();
    } catch (error) {
      setIsError('Failed to delete comment');
      toast.error('Failed to delete comment');
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

        <ModalFooter>
          <Button
            className="delete-button"
            isLoading={isLoading}
            size="md"
            onClick={handleDelete}
          >
            Yes, Delete
          </Button>
          <Button className="cancel-button" size="md" onClick={onOpenChange}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
