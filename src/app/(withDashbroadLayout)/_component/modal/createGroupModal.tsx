import React, { useState } from 'react';
import { Select, SelectItem } from '@nextui-org/select';
import { Modal, ModalContent, ModalHeader, ModalBody } from '@nextui-org/modal';
import { Chip } from '@nextui-org/chip';
import { Avatar } from '@nextui-org/avatar';
import { GoVerified } from 'react-icons/go';
import { TUser } from '@/src/types'; // Assuming you have a TUser type
import { useGetAllNormalForAnalyticsUsersQuery } from '@/src/redux/features/user/userApi';
import { useCreateGroupChatMutation } from '@/src/redux/features/message/groupChatApi';
import { useChat } from '@/src/context/chatContext';
import { Input } from '@nextui-org/input';
import CButton from '@/src/components/ui/CButton/CButton';
import { primaryColor } from '@/src/styles/button';

interface TCreateGroupModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
}

export default function CreateGroupModal({
  isOpen,
  onOpenChange,
}: TCreateGroupModalProps) {
  const [chatName, setChatName] = useState<string>('');
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());
  const { chats, setChats, setSelectedChat } = useChat();
  const { data: allUsersData } =
    useGetAllNormalForAnalyticsUsersQuery(undefined);
  const [createGroupChatFn] = useCreateGroupChatMutation();

  const allUsers = allUsersData?.data || [];

  // Handler for selection change
  const handleSelectionChange = (keys: Iterable<string>) => {
    setSelectedKeys(new Set(keys)); // Update selected users
  };

  // Create group chat handler
  const createGroupHandler = async () => {
    if (!chatName || selectedKeys.size === 0) return;

    const requestData = {
      chatName,
      users: Array.from(selectedKeys),
    };

    try {
      const res = await createGroupChatFn({
        users: requestData.users,
        chatName: requestData.chatName,
        isGroup: true,
      });

      if (res?.data?.success) {
        const newChat = res.data.data;

        setSelectedChat(newChat);
        if (chats && !chats.find((c) => c._id === newChat._id)) {
          setChats([newChat, ...chats]);
        }
        // Reset input and selected users
        onOpenChange();
        setSelectedKeys(new Set());
        setChatName('');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal
      placement="center"
      size="md"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <Chip color="danger" variant="dot">
                Create Group
              </Chip>
            </ModalHeader>
            <ModalBody>
              {/* Group Name Input */}
              <div className="mt-4">
                <Input
                  label="Chat Name"
                  variant="bordered"
                  placeholder="Enter group name..."
                  size="md"
                  radius="full"
                  value={chatName}
                  onChange={(e) => setChatName(e.target.value)}
                />
              </div>

              {/* Multi-Select Users */}
              <div className="mt-4">
                <Select
                  label="Select Users"
                  variant="bordered"
                  selectionMode="multiple"
                  placeholder="Select users"
                  selectedKeys={selectedKeys}
                  onSelectionChange={(keys) =>
                    handleSelectionChange(keys as Iterable<string>)
                  } // Ensure correct type
                >
                  {allUsers.map((user: TUser) => (
                    <SelectItem key={user._id} textValue={user.name}>
                      <div className="flex items-center gap-2">
                        <Avatar
                          className="w-6 h-6 rounded-full object-cover text-[14px]"
                          name={user?.name?.charAt(0).toUpperCase()}
                          src={user?.image || undefined}
                        />
                        <div className="flex items-center gap-1">
                          {user?.name}{' '}
                          {user?.verified && (
                            <GoVerified className="text-primaryColor" />
                          )}
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </Select>
              </div>

              {/* Create Group Button */}
              <div className="my-8">
                <CButton
                  text="Create group"
                  bgColor={primaryColor}
                  onClick={createGroupHandler}
                />
              </div>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
