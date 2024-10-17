import React from 'react';
import { Card, CardBody } from '@nextui-org/card';
import { Avatar } from '@nextui-org/avatar';
import Link from 'next/link';
import { useChat } from '@/src/context/chatContext';
import { TChat } from '@/src/types';
import { useCreateChatMutation } from '@/src/redux/features/message/chatApi';
import { getSender } from '@/src/utils/chatLogics';
import { useUser } from '@/src/hooks/useUser';

const MessageCard = ({ chat }: { chat: TChat }) => {
  const [createChatFn] = useCreateChatMutation();
  const { userInfo: user } = useUser();

  // Create chat handler
  const createChatHandler = async (userId: string | undefined) => {
    if (!userId) return; // Ensure userId is present
    try {
      const res = await createChatFn({ user: userId });

      if (res?.data?.success) {
        const newChat = res.data.data;
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Safely destructure the latest message and sender
  const latestMessage = chat?.latestMessage || {};
  const sender = latestMessage?.sender || {
    _id: '',
    name: 'Unknown',
    image: '',
  };

  const message = {
    id: sender._id || chat?._id,
    senderName: sender.name || 'Unknown',
    avatar: sender.image || '/default-avatar.png',
    content: latestMessage.content || 'No messages yet',
    timestamp: latestMessage.createdAt
      ? new Date(latestMessage.createdAt).toLocaleTimeString()
      : 'Unknown time',
  };

  const selectedUser = getSender(chat, user);

  return (
    <Card
      onClick={() => createChatHandler(message.id)}
      as={Link}
      href={`/messages/${chat._id}`}
      className="w-full mb-2 cursor-pointer hover:bg-default-50 transition-colors h-18 border border-default-50"
    >
      <CardBody className="flex flex-row items-center p-2 gap-2">
        {/* Conditional rendering based on isGroupChat */}
        {!chat?.isGroupChat ? (
          <>
            <div>
              <Avatar
                className="cursor-pointer text-[24px] font-bold z-20"
                name={selectedUser?.name?.charAt(0)?.toUpperCase()}
                size="md"
                src={selectedUser?.image || undefined}
              />
            </div>
          </>
        ) : (
          <>
            <div>
              <Avatar
                className="cursor-pointer text-[24px] font-bold z-20"
                name={chat?.chatName?.charAt(0)?.toUpperCase()}
                size="lg"
                src={undefined} // No image for group chat avatar
              />
            </div>
          </>
        )}

        {/* Display the latest message details */}
        <div className="flex-grow">
          <div className="text-sm font-medium text-default-700">
            {selectedUser?.name}
          </div>
          <div className="text-xs text-default-500 truncate">
            {message.content}
          </div>
        </div>
        <div className="text-xs text-default-400">{message.timestamp}</div>
      </CardBody>
    </Card>
  );
};

export default MessageCard;
