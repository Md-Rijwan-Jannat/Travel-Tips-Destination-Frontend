import { createContext, useContext, useEffect, useRef, ReactNode } from "react";
import { io, Socket } from "socket.io-client";
import { useUser } from "../hooks/useUser";

interface ISocketContext {
  socket: Socket | null;
}

const SocketContext = createContext<ISocketContext | null>(null);

export const useSocket = (): Socket | null => {
  const context = useContext(SocketContext);

  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }

  return context.socket;
};

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const socket = useRef<Socket | null>(null);
  const { userInfo } = useUser();

  useEffect(() => {
    if (userInfo?._id) {
      const HOST =
        process.env.NEXT_PUBLIC_SOCKET_HOST || "http://localhost:5000";

      socket.current = io(HOST, {
        withCredentials: true,
        query: { userId: userInfo._id },
      });

      socket.current.on("connect", () => {
        console.log("Connected to socket server");
      });

      return () => {
        socket.current?.disconnect();
      };
    }
  }, [userInfo]);

  return (
    <SocketContext.Provider value={{ socket: socket.current }}>
      {children}
    </SocketContext.Provider>
  );
};
