import React, { createContext, useContext, useEffect, useState } from 'react';

interface SocketContextType {
  socket: WebSocket | null;
  connected: boolean;
}

interface SocketProviderProps {
  children: React.ReactNode;
}

// Create the context for WebSocket
const SocketContext = createContext<SocketContextType | undefined>(undefined);

const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [connected, setConnected] = useState(false);
  const baseURL = process.env.NEXT_PUBLIC_API_SPORT || 'ws://localhost:5058'; // WebSocket URL

  useEffect(() => {
    // Initialize WebSocket connection
    const socketConnection = new WebSocket(baseURL);
    setSocket(socketConnection);

    // Connection event
    socketConnection.onopen = () => {
      console.log('[INFO] Connected to WebSocket server.');
      setConnected(true);
    };

    // Disconnection event
    socketConnection.onclose = () => {
      console.log('[INFO] WebSocket connection closed.');
      setConnected(false);
    };

    // Error handling
    socketConnection.onerror = (error) => {
      console.error('[ERROR] WebSocket error:', error);
    };

    // Cleanup on component unmount
    return () => {
      socketConnection.close();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, connected }}>
      {children}
    </SocketContext.Provider>
  );
};

// Custom hook to access socket context
const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};

export { SocketProvider, useSocket };
