import { TChat, TMessage, TUser } from '../types';

export const isSameSenderMargin = (
  messages: TMessage[],
  m: { sender: TUser },
  i: number,
  userId: string
) => {
  if (
    i < messages.length - 1 &&
    messages[i + 1].sender._id === m.sender._id &&
    messages[i].sender._id !== userId
  )
    return 33;
  else if (
    (i < messages.length - 1 &&
      messages[i + 1].sender._id !== m.sender._id &&
      messages[i].sender._id !== userId) ||
    (i === messages.length - 1 && messages[i].sender._id !== userId)
  )
    return 0;
  else return 'auto';
};

export const isSameSender = (
  messages: TMessage[],
  m: { sender: TUser },
  i: number,
  userId: string
) => {
  return (
    i < messages.length - 1 &&
    (messages[i + 1].sender._id !== m.sender._id ||
      messages[i + 1].sender._id === undefined) &&
    messages[i].sender._id !== userId
  );
};

export const isLastMessage = (
  messages: TMessage[],
  i: number,
  userId: string
) => {
  return (
    i === messages.length - 1 &&
    messages[messages.length - 1].sender._id !== userId &&
    messages[messages.length - 1].sender._id
  );
};

export const isSameUser = (
  messages: TMessage[],
  m: { sender: TUser },
  i: number
) => {
  return i > 0 && messages[i - 1].sender._id === m.sender._id;
};

// get sender data
export const getSender = (
  selectedChat: TChat | undefined,
  user: TUser | undefined
): TUser | undefined => {
  if (!selectedChat || !user) return undefined;

  return selectedChat?.users?.find((u: TUser) => u._id !== user._id);
};

export const getSenderFull = (loggedUser: TUser, users: TUser) => {
  return users._id === loggedUser._id ? users : users;
};
