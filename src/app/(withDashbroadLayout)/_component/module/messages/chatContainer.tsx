'use client';

import React, { useState, useRef, useEffect, KeyboardEvent } from 'react';
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

const endpoint = process.env.NEXT_PUBLIC_SOCKET_HOST || 'http://localhost:5000';

let socket: Socket, selectedChatCompare: TChat;

export default function ChatContainer({ chatId }: { chatId: string }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<TMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [socketConnected, setSocketConnected] = useState<boolean>();

  // Current user
  const { userInfo: user } = useUser();

  // Get chat and messages
  const { data: selectedChatsData } = useGetSingleChatQuery(chatId);
  const { data: userMessagesData } = useGetUserMessagesQuery(chatId);
  const selectedChat = selectedChatsData?.data;
  const userMessages = userMessagesData?.data;

  // Create message mutation
  const [createMessageFn] = useCreateMessageMutation();

  // UseEffect for socket io
  useEffect(() => {
    if (endpoint) {
      socket = io(endpoint);
      socket.emit('setup', user);
      socket.on('connection', () => {
        setSocketConnected(true);
      });
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
  }, []);

  // Update the sendMessage function to accept a message input parameter
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
          socket.emit('new message', data);

          // Clear input after sending
          setNewMessage('');
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  // On typing
  const typingHandler = () => {};

  // Update messages
  useEffect(() => {
    if (userMessages) {
      setMessages(userMessages);
    }
    socket.emit('join chat', chatId);
    selectedChatCompare = selectedChat;
  }, [userMessages, selectedChat]);

  useEffect(() => {
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

    return () => {
      // Clean up the event listener when the component unmounts
      socket.off('message received');
    };
  }, [messages, selectedChat]);

  // Scroll to bottom on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const selectedUser = getSender(selectedChat, user);

  return (
    <div className="flex flex-col">
      <ScrollableChat
        messages={messages}
        currentUser={user}
        scrollRef={scrollRef}
        selectedChat={selectedChat}
        selectedUser={selectedUser}
      />

      <MessageBar onSendMessage={sendMessage} onTyping={typingHandler} />
    </div>
  );
}
