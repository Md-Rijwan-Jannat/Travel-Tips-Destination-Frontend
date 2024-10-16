import React, { useEffect } from 'react';
import { ScrollShadow } from '@nextui-org/scroll-shadow';
import AddFriendModal from '../../modal/addFriendModal';
import { useDisclosure } from '@nextui-org/modal';
import { Search } from 'lucide-react';
import { Input } from '@nextui-org/input';
import { useGetUserChatQuery } from '@/src/redux/features/message/chatApi';
import { TChat } from '@/src/types';
import MessageCard from './messageCard';
import Spinner from '@/src/components/ui/spinner';
import Empty from '@/src/components/ui/empty';

const MessageCardList: React.FC = () => {
  // Fetch user chat data from API
  const { data: userChatsData, isLoading } = useGetUserChatQuery(undefined);

  // If data exists, extract the chat array
  const userChats = userChatsData?.data || [];

  const {
    isOpen: isAddFriendOpen,
    onOpen: onAddFriendOpen,
    onOpenChange: onAddFriendChange,
  } = useDisclosure();

  return (
    <div className="w-full md:w-[500px] xl:w-[600px] mx-auto">
      <div className="p-0">
        <div className="flex items-center justify-between gap-3 mb-2 border-b border-default-200">
          <h3 className="p-4 text-lg font-semibold text-default-800">
            Messages
          </h3>

          <Input
            onClick={onAddFriendOpen}
            type="search"
            placeholder="Search friend ..."
            variant="bordered"
            radius="full"
            startContent={<Search className="text-default-400" />}
          />
        </div>

        <ScrollShadow className="h-[560px]">
          {isLoading ? (
            <div className="flex items-center justify-center w-full h-[300px]">
              <Spinner />
            </div>
          ) : userChats && userChats.length > 0 ? (
            // Filter userChats that have latestMessage and display them
            userChats.some((chat: TChat) => chat.latestMessage) ? (
              userChats.map((chat: TChat) => {
                return chat.latestMessage ? (
                  <MessageCard key={chat._id} chat={chat} />
                ) : null;
              })
            ) : (
              <Empty message="No chat available" />
            )
          ) : (
            <Empty message="No chat available" />
          )}
        </ScrollShadow>
      </div>

      <AddFriendModal
        isOpen={isAddFriendOpen}
        onOpenChange={onAddFriendChange}
      />
    </div>
  );
};

export default MessageCardList;
