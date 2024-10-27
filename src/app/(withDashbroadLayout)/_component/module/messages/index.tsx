import React, { useEffect, useState } from 'react';
import { ScrollShadow } from '@nextui-org/scroll-shadow';
import AddFriendModal from '../../modal/addFriendModal';
import { useDisclosure } from '@nextui-org/modal';
import { Search } from 'lucide-react';
import { Input } from '@nextui-org/input';
import { useGetUserChatQuery } from '@/src/redux/features/message/chatApi';
import { TChat, TMessage } from '@/src/types';
import MessageCard from './messageCard';
import Empty from '@/src/components/ui/empty';
import MessageCardSkeleton from '@/src/components/ui/skeleton/messageSkeleton';
import { useAppDispatch } from '@/src/redux/hook';
import { addNotification } from '@/src/redux/features/message/notificationSlice';
import { useSocket } from '@/src/context/socketProvider';

const MessageCardList: React.FC = () => {
  const [newMessage, setNewMessage] = useState<TMessage>();
  const { data: userChatsData, isLoading } = useGetUserChatQuery(undefined);
  const userChats = userChatsData?.data || [];
  const socket = useSocket();
  const dispatch = useAppDispatch();

  const {
    isOpen: isAddFriendOpen,
    onOpen: onAddFriendOpen,
    onOpenChange: onAddFriendChange,
  } = useDisclosure();

  useEffect(() => {
    if (socket) {
      socket.on('message received', (newMessageReceived: TMessage) => {
        dispatch(addNotification(newMessageReceived));
        setNewMessage(newMessageReceived);
      });

      return () => {
        socket.off('message received');
      };
    }
  }, [socket, dispatch]);

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

        <ScrollShadow className="h-auto p-2">
          {isLoading ? (
            <MessageCardSkeleton />
          ) : userChats && userChats.length > 0 ? (
            userChats.some((chat: TChat) => chat.latestMessage) ? (
              userChats.map((chat: TChat) =>
                chat.latestMessage ? (
                  <MessageCard
                    key={chat._id}
                    chat={chat}
                    newMessage={
                      newMessage?.chat._id === chat?._id
                        ? newMessage
                        : undefined
                    }
                  />
                ) : null
              )
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
