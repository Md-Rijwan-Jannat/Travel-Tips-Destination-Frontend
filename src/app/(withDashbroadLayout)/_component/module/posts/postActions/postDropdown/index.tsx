'use client';

import { Button } from '@nextui-org/button';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/dropdown';
import React from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import UpdatePostModal from '../../../../modal/updatepostModal';
import DeletePostModal from '../../../../modal/deletePostModal';
import { TPost, TUser } from '@/src/types';
import { useDisclosure } from '@nextui-org/modal';
import { useUser } from '@/src/hooks/useUser';
import { copyToClipboard } from '@/src/utils/copyToClipboard';
import ReportModal from '../../../../modal/reportModal';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface TPostDropdownProps {
  userInfo: TUser;
  postData: TPost;
}

export default function PostDropdown({
  userInfo,
  postData,
}: TPostDropdownProps) {
  const { userInfo: currentUser } = useUser();

  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onOpenChange: onEditChange,
  } = useDisclosure();
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onOpenChange: onDeleteChange,
  } = useDisclosure();

  const {
    isOpen: isReportOpen,
    onOpen: onReportOpen,
    onOpenChange: onReportChange,
  } = useDisclosure();

  const handleCopyLink = () => {
    const postUrl = `${window.location.origin}/posts/${postData?._id}`;

    copyToClipboard(postUrl);
  };

  const pathname = usePathname();

  return (
    <>
      <Dropdown>
        <DropdownTrigger>
          <Button
            isIconOnly
            size="sm"
            className="bg-default-100 hover:bg-default-200"
            radius="full"
            startContent={<BsThreeDotsVertical />}
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="Post Actions">
          <DropdownItem key="copy-link" onClick={handleCopyLink}>
            Copy link
          </DropdownItem>
          <DropdownItem
            className={`${pathname === `/news-feed/posts/${postData?._id}` && 'hidden'}`}
            key="copy-link"
            as={Link}
            href={`/news-feed/posts/${postData?._id}`}
          >
            View details
          </DropdownItem>

          <DropdownItem
            className={`${userInfo?.email !== currentUser?.email && 'hidden'}`}
            key="edit-post"
            onClick={onEditOpen}
          >
            Edit post
          </DropdownItem>
          <DropdownItem
            className={`text-danger ${userInfo?.email === currentUser?.email && 'hidden'}`}
            key="copy-link"
            onClick={onReportOpen}
          >
            Report a post
          </DropdownItem>
          <DropdownItem
            key="delete-post"
            className={`text-danger ${userInfo?.email !== currentUser?.email && 'hidden'}`}
            color="danger"
            onClick={onDeleteOpen}
          >
            Delete
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>

      {/* Modal for editing the post */}
      <UpdatePostModal
        isOpen={isEditOpen}
        onOpenChange={onEditChange}
        postData={postData}
        userInfo={userInfo}
      />

      {/* Modal for deleting the post */}
      <DeletePostModal
        isOpen={isDeleteOpen}
        onOpenChange={onDeleteChange}
        postId={postData?._id}
      />

      {/* Report modal */}
      <ReportModal
        isOpen={isReportOpen}
        onOpenChange={onReportChange}
        post={postData}
      />
    </>
  );
}
