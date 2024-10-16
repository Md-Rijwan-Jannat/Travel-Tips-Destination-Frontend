'use client';

import React, { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { Card, CardBody } from '@nextui-org/card';
import { Avatar } from '@nextui-org/avatar';
import { ScrollShadow } from '@nextui-org/scroll-shadow';
import { motion, AnimatePresence } from 'framer-motion';
import MessageBar from './messageBar';
import { TMessage, TUser } from '@/src/types';
import { useChat } from '@/src/context/chatContext';
import {
  useGetUserMessagesQuery,
  useCreateMessageMutation,
} from '@/src/redux/features/message/messageApi';
import { io, Socket } from 'socket.io-client';
import { useUser } from '@/src/hooks/useUser';
import { useGetSingleChatQuery } from '@/src/redux/features/message/chatApi';
import { getSender } from '@/src/utils/chatLogics';

const ENDPOINT = 'http://localhost:5000';

export default function ChatContainer({ chatId }: { chatId: string }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<TMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const { userInfo: user } = useUser();

  const socket = useRef<Socket | null>(null);

  console.log(chatId);

  const { data: selectedChatsData, refetch } = useGetSingleChatQuery(chatId);
  const selectedChat = selectedChatsData?.data;

  console.log('selectedChat==>', selectedChat);

  const [createMessageFn] = useCreateMessageMutation();

  const sendMessage = async (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && newMessage) {
      socket.current?.emit('stop typing', chatId);
      try {
        setNewMessage('');

        const res = await createMessageFn({
          content: newMessage,
          chat: chatId,
        });

        console.log(res);

        const data = res?.data;

        socket.current?.emit('new message', data);
        setMessages((prevMessages) => [...prevMessages, data]);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const typingHandler = (e: React.ChangeEvent<HTMLInputElement>) => {};

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const selectedUser = getSender(selectedChat, user);

  console.log(selectedUser);

  return (
    <div className="h-[calc(100vh-100px)] flex flex-col">
      <div className="flex flex-col items-center justify-center gap-1">
        {!selectedChat?.isGroupChat ? (
          <>
            <div>
              <Avatar
                className="cursor-pointer text-[24px] font-bold z-20"
                name={selectedUser?.name?.charAt(0)?.toUpperCase()}
                size="md"
                src={selectedUser?.image || undefined}
              />
            </div>

            <h2 className="text-sm font-bold text-default-600">
              {selectedUser?.name}
            </h2>
          </>
        ) : (
          <>
            <div>
              <Avatar
                className="cursor-pointer text-[24px] font-bold z-20"
                name={selectedChat?.chatName?.charAt(0)?.toUpperCase()}
                size="lg"
                src={undefined}
              />
            </div>

            <h2 className="text-lg font-bold mt-2">{selectedChat?.chatName}</h2>
          </>
        )}
      </div>
      <ScrollShadow
        ref={scrollRef}
        className="flex-grow p-4 space-y-4 overflow-y-auto"
      >
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className={`flex ${message?.sender?._id === user?._id ? 'justify-end' : 'justify-start'}`}
            >
              <Card
                className={`max-w-[70%] ${message?.sender?._id === user?._id ? 'bg-primary' : 'dark:bg-default-800'}`}
              >
                <CardBody className="p-3">
                  <div className="flex items-start gap-3">
                    {message.sender._id !== user?._id && (
                      <Avatar
                        src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                        size="sm"
                        className="flex-shrink-0"
                      />
                    )}
                    <p className="text-sm">{message.content}</p>
                  </div>
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
        {isTyping && (
          <motion.div
            className="flex justify-start mb-2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="bg-default-100 dark:bg-default-800 max-w-[50%]">
              <CardBody className="p-3">
                <div className="flex items-center gap-2">
                  <p className="text-sm">...</p>
                </div>
              </CardBody>
            </Card>
          </motion.div>
        )}
      </ScrollShadow>
      <MessageBar onSendMessage={sendMessage} onTyping={typingHandler} />
    </div>
  );
}
