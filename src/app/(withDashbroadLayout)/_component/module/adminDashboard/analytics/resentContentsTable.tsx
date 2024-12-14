'use client';

import React, { useState } from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from '@nextui-org/table';
import { Avatar } from '@nextui-org/avatar';
import { Chip } from '@nextui-org/chip';
import Link from 'next/link';
import { TPost } from '@/src/types';
import { Tooltip } from '@nextui-org/tooltip';
import { Button } from '@nextui-org/button';
import { BsTrash } from 'react-icons/bs';
import { PiCrownSimpleDuotone } from 'react-icons/pi';
import DeletePostModal from '../../../modal/deletePostModal';
import { useDisclosure } from '@nextui-org/modal';

type ResentContentTableProps = {
  posts: TPost[];
  isLoading: boolean;
};

const ResentContentTable: React.FC<ResentContentTableProps> = ({ posts }) => {
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onOpenChange: onDeleteChange,
  } = useDisclosure();

  const [postToDelete, setPostToDelete] = useState<string>('');

  const handleDeleteClick = (postId: string) => {
    setPostToDelete(postId);
    onDeleteOpen();
  };

  return (
    <>
      <Table className="overflow-x-auto" aria-label="Post Table">
        <TableHeader>
          <TableColumn>Profile</TableColumn>
          <TableColumn>Title</TableColumn>
          <TableColumn>Description</TableColumn>
          <TableColumn>Category</TableColumn>
          <TableColumn>Actions</TableColumn>
        </TableHeader>
        <TableBody>
          {posts?.map((post) => (
            <TableRow key={post._id}>
              <TableCell>
                <div className="flex gap-1">
                  <Tooltip content={post.user?.name}>
                    <Avatar
                      as={Link}
                      href={`/profile/${post.user?._id}`}
                      name={post.user?.name?.charAt(0)?.toUpperCase()}
                      src={post.user?.image || undefined}
                      size="sm"
                    />
                  </Tooltip>
                </div>
              </TableCell>

              <TableCell>
                <Link
                  href={`/news-feed/posts/${post._id}`}
                  className="whitespace-nowrap hover:underline"
                >
                  {post.title?.length > 15
                    ? post.title.slice(0, 15) + '...'
                    : post.title}
                </Link>
              </TableCell>
              <TableCell>
                <div
                  className="max-w-xs overflow-hidden text-ellipsis whitespace-nowrap"
                  title={post.description.replace(/<[^>]+>/g, '')} // Show full description on hover
                >
                  {post.description.replace(/<[^>]+>/g, '').length > 40
                    ? post.description.replace(/<[^>]+>/g, '').slice(0, 40) +
                      '...'
                    : post.description.replace(/<[^>]+>/g, '')}
                </div>
              </TableCell>

              <TableCell>
                <Chip className="w-[100px]" size="sm" variant="bordered">
                  {post.category}
                </Chip>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Button
                    size="sm"
                    as={Link}
                    href="/admin-dashboard/manage-content"
                    className="secondary-button"
                  >
                    Manage content
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* Modal for deleting the post */}
      <DeletePostModal
        isOpen={isDeleteOpen}
        onOpenChange={onDeleteChange}
        postId={postToDelete}
      />
    </>
  );
};

export default ResentContentTable;
