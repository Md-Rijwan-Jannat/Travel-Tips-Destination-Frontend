import { TChat } from './chat.type';
import { TUser } from './user.type';

export interface TMessage {
  _id: string;
  sender: TUser;
  content: string;
  chat: TChat;
  readBy: [TUser];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface TNotification {
  id: string;
  message: string;
  type: string;
}
