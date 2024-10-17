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
        <ModalContent className="m-2">
          <ModalHeader>Confirm Delete</ModalHeader>
          <ModalBody>
            {isError && <p className="text-center text-red-500">{isError}</p>}
            <p>Are you sure you want to delete this post?</p>
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
    </>
  );
};

export default DeletePostModal;
