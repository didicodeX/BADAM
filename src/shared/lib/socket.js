// src/shared/lib/socket.js
import { io } from "socket.io-client";

export const socket = io(import.meta.env.VITE_API_URL, {
  withCredentials: true,
  // WebSocket uniquement : l'API tourne sur des Vercel Functions, où le
  // long-polling (qui exige des sessions persistantes) n'est pas fiable.
  transports: ["websocket"],
});
