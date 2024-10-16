import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { useUser } from "../hooks/useUser";
import { TUser, TChat, TNotification } from "../types";

// Define the type for the chat context
interface ChatContextType {
  selectedChat: TChat | undefined;
  setSelectedChat: React.Dispatch<React.SetStateAction<TChat | undefined>>;
  user: TUser | undefined;
  setUser: React.Dispatch<React.SetStateAction<TUser | undefined>>;
  notification: TNotification[];
  setNotification: React.Dispatch<React.SetStateAction<TNotification[]>>;
  chats: TChat[] | undefined;
  setChats: React.Dispatch<React.SetStateAction<TChat[] | undefined>>;
}

// Create the chat context with a default value of `undefined`
const ChatContext = createContext<ChatContextType | undefined>(undefined);

interface ChatProviderProps {
  children: ReactNode;
}

const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const [selectedChat, setSelectedChat] = useState<TChat | undefined>();
  const [user, setUser] = useState<TUser | undefined>();
  const [notification, setNotification] = useState<TNotification[]>([]);
  const [chats, setChats] = useState<TChat[] | undefined>();

  const { userInfo } = useUser();

  useEffect(() => {
    setUser(userInfo);
  }, [userInfo]);

  return (
    <ChatContext.Provider
      value={{
        selectedChat,
        setSelectedChat,
        user,
        setUser,
        notification,
        setNotification,
        chats,
        setChats,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

// Custom hook to use the ChatContext
export const useChat = (): ChatContextType => {
  const context = useContext(ChatContext);

  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }

  return context;
};

export default ChatProvider;
