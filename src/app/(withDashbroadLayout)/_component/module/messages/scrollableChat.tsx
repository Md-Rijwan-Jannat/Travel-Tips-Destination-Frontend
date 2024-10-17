import React, { forwardRef, useEffect, useState } from 'react';
import { TChat, TMessage, TUser } from '@/src/types';
import { Avatar } from '@nextui-org/avatar';
import { ScrollShadow } from '@nextui-org/scroll-shadow';
import {
  format,
  isSameDay,
  isSameMinute,
  isSameYear,
  isSameMonth,
} from 'date-fns';

interface ScrollableChatProps {
  messages: TMessage[];
  currentUser: TUser | undefined;
  scrollRef: React.RefObject<HTMLDivElement>;
  selectedChat: TChat;
  selectedUser: TUser | undefined;
}

const ScrollableChat = forwardRef<HTMLDivElement, ScrollableChatProps>(
  ({ messages, currentUser, scrollRef, selectedChat, selectedUser }) => {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentTime(new Date());
      }, 1000);

      return () => clearInterval(interval);
    }, []);

    // Automatically scroll to the bottom when messages change
    useEffect(() => {
      const scrollElement = scrollRef?.current;
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight; // Scroll to bottom
      }
    }, [messages, scrollRef]);

    // Utility for date formatting, e.g., 'Today', 'Yesterday', or specific date
    const formatDate = (date: Date) => {
      const today = new Date();
      if (isSameDay(date, today)) {
        return 'Today';
      } else if (isSameDay(date, new Date(today.getTime() - 86400000))) {
        return 'Yesterday';
      }
      return format(date, 'MMMM dd, yyyy');
    };

    return (
      <ScrollShadow
        size={50}
        ref={scrollRef}
        className="h-[calc(100vh-190px)] flex-grow p-2 pt-5 space-y-4 overflow-auto scrollbar-hide"
      >
        <div className="flex flex-col items-center justify-center gap-1">
          {!selectedChat?.isGroupChat ? (
            <>
              <Avatar
                name={selectedUser?.name?.charAt(0)?.toUpperCase()}
                size="md"
                src={selectedUser?.image || undefined}
              />
              <h2 className="text-sm font-medium text-default-600">
                {selectedUser?.name}
              </h2>
            </>
          ) : (
            <>
              <Avatar
                name={selectedChat?.chatName?.charAt(0)?.toUpperCase()}
                size="lg"
              />
              <h2 className="text-lg font-medium mt-2">
                {selectedChat?.chatName}
              </h2>
            </>
          )}
        </div>

        {messages.map((message, index) => {
          const isCurrentUser = message.sender._id === currentUser?._id;
          const nextMessage = messages[index + 1];
          const isLastMessageFromSameUser =
            nextMessage && nextMessage.sender._id === message.sender._id;

          const isSeen =
            message?.readBy?.some(
              (user: TUser) => user?._id === currentUser?._id
            ) || false;

          const shouldShowAvatar =
            !isCurrentUser &&
            (!isLastMessageFromSameUser || index === messages.length - 1);

          // Determine whether to show the timestamp for this message
          const currentMessageTime = new Date(message.createdAt);
          const nextMessageTime = nextMessage
            ? new Date(nextMessage.createdAt)
            : null;

          const showTime =
            !nextMessageTime ||
            !isSameMinute(currentMessageTime, nextMessageTime);

          // Show a date separator if the day changes
          const previousMessage = messages[index - 1];
          const shouldShowDateSeparator =
            !previousMessage ||
            !isSameDay(currentMessageTime, new Date(previousMessage.createdAt));

          return (
            <div key={message._id}>
              {/* Date Separator */}
              {shouldShowDateSeparator && (
                <div className="text-[10px] text-center text-default-500 my-3 border-b border-default-100 w-1/3 mx-auto pb-3">
                  {formatDate(currentMessageTime)}
                </div>
              )}

              {/* Message bubble */}
              <div
                className={`flex w-full ${
                  isCurrentUser ? 'justify-end' : 'justify-start'
                } items-start`}
              >
                <div
                  className={`flex flex-col items-start gap-1 ${
                    isCurrentUser ? 'items-end' : 'items-start'
                  }`}
                >
                  <div className="flex">
                    {!isCurrentUser && (
                      <div className="flex items-end mr-2">
                        {shouldShowAvatar && (
                          <Avatar
                            name={message.sender.name.charAt(0).toUpperCase()}
                            src={message.sender.image || undefined}
                            className="w-7 h-7"
                          />
                        )}
                      </div>
                    )}
                    <p
                      className={`max-w-xs px-4 py-2 text-xs rounded-lg ${
                        isCurrentUser
                          ? 'bg-pink-500 text-white'
                          : 'bg-default-200 text-default-800'
                      } ${!shouldShowAvatar && 'ml-7'}`}
                    >
                      {message.content}
                    </p>
                  </div>

                  {/* Show message timestamp only if it's the last in a group */}
                  {showTime && (
                    <p className="text-[10px] text-gray-400 ml-10">
                      {format(currentMessageTime, 'h:mm a')}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </ScrollShadow>
    );
  }
);

export default ScrollableChat;
