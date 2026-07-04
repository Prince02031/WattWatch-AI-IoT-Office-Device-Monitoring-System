import { io } from 'socket.io-client';
import { api } from './api.js';

// Initialize the socket client with dynamic backend url matching the REST client
export const initSocket = () => {
  const backendUrl = api.getBackendUrl();
  return io(backendUrl, {
    transports: ['websocket', 'polling'],
    autoConnect: true,
    reconnection: true,
    reconnectionAttempts: Infinity,
    reconnectionDelay: 1000
  });
};
