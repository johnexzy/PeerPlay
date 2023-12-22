import { io } from "socket.io-client";
export default function useSocket() {
  // start the socket server

  try {
    const socket = io("https://socket-server-9gzc.onrender.com");

    socket.on("connect", () => {
      console.log("Connected");
    });

    socket.on("disconnect", () => {
      console.log("Disconnected");
    });

    socket.on("connect_error", async (err) => {
      console.log(`connect_error due to ${err.message}`);
    });
    return socket;
  } catch (error) {}
}
