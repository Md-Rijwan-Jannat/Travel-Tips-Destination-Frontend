'use client';

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '@nextui-org/modal';
import { Button } from '@nextui-org/button';
import { useDisclosure } from '@nextui-org/modal';
import { toast } from 'sonner';
import { useState } from 'react';
import { useSoftDeletePostMutation } from '@/src/redux/features/post/postApi';
import GlassLoader from '@/src/components/shared/glassLoader';
import CButton from '@/src/components/ui/CButton/CButton';
import { primaryColor, secondaryColor } from '@/src/styles/button';

interface TDeletePostModalProps {
  postId: string;
  isOpen: boolean;
  onOpenChange: () => void;
}

const DeletePostModal = ({
  isOpen,
  onOpenChange,
  postId,
}: TDeletePostModalProps) => {
  const [postDeleteFn, { isLoading }] = useSoftDeletePostMutation();
  const [isError, setIsError] = useState<string>('');

  const handleDelete = async () => {
    try {
      const res = await postDeleteFn(postId);

      toast.success('Post deleted successfully');
      setIsError('');
      onOpenChange(); // Close the modal
    } catch (error: any) {
      setIsError('Failed to delete post');
      toast.error('Failed to delete post');
    }
  };

  return (
    <>
      <Modal
        size="md"
        placement="center"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        {isLoading && <GlassLoader />}
        <ModalContent className="overflow-hidden">
          <ModalHeader>Confirm Delete</ModalHeader>
          <ModalBody>
            {isError && <p className="text-center text-red-500">{isError}</p>}
            <p>Are you sure you want to delete this post?</p>
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
    </>
  );
};

export default DeletePostModal;
