import React, { createContext, useContext, useEffect } from 'react';
import { io } from 'socket.io-client';

export const SocketContext = createContext();

// Custom hook to use socket instance
export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ uri, options, children }) => {
  const socket = io(uri, { transports: ['websocket'] });

  useEffect(() => {
    return () => {
      socket.disconnect();
    };
  }, [socket]);

  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};
