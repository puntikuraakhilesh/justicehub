import { io } from "socket.io-client";

const socket = io("http://localhost:8800", {
  withCredentials: true, // Ensures auth headers are included
  transports: ["websocket"], // Force WebSockets (prevents polling issues)
});

export default socket;
