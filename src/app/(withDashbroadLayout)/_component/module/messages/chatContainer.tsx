'use client';

import React, {
  useState,
  useRef,
  useEffect,
  KeyboardEvent,
  ChangeEvent,
} from 'react';
import { Avatar } from '@nextui-org/avatar';
import { io, Socket } from 'socket.io-client';
import { useUser } from '@/src/hooks/useUser';
import {
  useGetUserMessagesQuery,
  useCreateMessageMutation,
} from '@/src/redux/features/message/messageApi';
import { useGetSingleChatQuery } from '@/src/redux/features/message/chatApi';
import { getSender } from '@/src/utils/chatLogics';
import ScrollableChat from './scrollableChat';
import { TChat, TMessage } from '@/src/types';
import MessageBar from './messageBar';
import TableSkeleton from '@/src/components/ui/skeleton/tableSkeleton';

const endpoint = process.env.NEXT_PUBLIC_SOCKET_HOST;

let selectedChatCompare: TChat;

export default function ChatContainer({ chatId }: { chatId: string }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<TMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [socketConnected, setSocketConnected] = useState<boolean>(false);
  const [typing, setTyping] = useState<boolean>(false);
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const [socket, setSocket] = useState<Socket | null>(null);

  // Current user
  const { userInfo: user } = useUser();

  // Get chat and messages
  const { data: selectedChatsData } = useGetSingleChatQuery(chatId);
  const { data: userMessagesData, isLoading } = useGetUserMessagesQuery(chatId);
  const selectedChat = selectedChatsData?.data;
  const userMessages = userMessagesData?.data;

  // Create message mutation
  const [createMessageFn] = useCreateMessageMutation();

  // Create message and save database
  const sendMessage = async (
    message: string,
    event?: KeyboardEvent<HTMLInputElement>
  ) => {
    if (event) event.preventDefault();

    if (message.trim()) {
      try {
        const res = await createMessageFn({
          content: message,
          chat: chatId,
        });
        if (res?.data?.success) {
          const data = res.data.data;
          setMessages((prevMessages) => [...prevMessages, data]);

          // Ensure socket is initialized before emitting message
          if (socket) {
            socket.emit('new message', data);
            socket.emit('stop typing', chatId);
          }

          // Clear input after sending
          setNewMessage('');
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  // Initialize socket connection
  useEffect(() => {
    if (endpoint) {
      const newSocket = io(endpoint);
      setSocket(newSocket);

      newSocket.emit('setup', user);

      newSocket.on('connected', () => setSocketConnected(true));
      newSocket.on('typing', () => setIsTyping(true));
      newSocket.on('stop typing', () => setIsTyping(false));

      // Clean up on component unmount
      return () => {
        newSocket.disconnect();
      };
    } else {
      console.error('Socket endpoint is undefined');
    }
  }, [user]);

  // Error Handling for Socket Connection
  useEffect(() => {
    if (socket) {
      socket.on('connect_error', (error) => {
        console.error('Socket connection error:', error);
      });
    }
  }, [socket]);

  // Update messages
  useEffect(() => {
    if (userMessages) {
      setMessages(userMessages);
    }

    if (socket) {
      socket.emit('join chat', chatId);
      selectedChatCompare = selectedChat;
    }
  }, [userMessages, selectedChat, socket]);

  // Message received
  useEffect(() => {
    if (socket) {
      socket.on('message received', (newMessageReceived: TMessage) => {
        if (
          !selectedChatCompare ||
          selectedChatCompare._id === newMessageReceived.chat._id
        ) {
          setMessages((prevMessages) => [...prevMessages, newMessageReceived]);
        } else {
          // If it's not the selected chat, give a notification
          // Add your notification logic here
        }
      });

      // Clean up the event listener when the component unmounts
      return () => {
        socket.off('message received');
      };
    }
  }, [socket, selectedChat]);

  // On typing Handler
  const typingHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);

    if (!socket || !socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit('typing', chatId);
    }

    let lastTypingTime = new Date().getTime();
    const timeLength = 3000;

    setTimeout(() => {
      const timeNow = new Date().getTime();
      const timeDifference = timeNow - lastTypingTime;

      if (timeDifference >= timeLength && typing) {
        socket.emit('stop typing', chatId);
        setTyping(false);
      }
    }, timeLength);
  };

  // Scroll to bottom on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const selectedUser = getSender(selectedChat, user);

  return (
    <div className="w-full md:w-[500px] xl:w-[600px] mx-auto">
      {isLoading && <TableSkeleton />}
      <ScrollableChat
        messages={messages}
        currentUser={user}
        scrollRef={scrollRef}
        selectedChat={selectedChat}
        selectedUser={selectedUser}
        isTyping={isTyping}
      />

      <MessageBar onSendMessage={sendMessage} typingHandler={typingHandler} />
    </div>
  );
}
