import { io } from "socket.io-client";
export default function useSocket(username?: string) {
  try {
    const socket = io(
      process.env.NEXT_PUBLIC_SOCKET || "http://localhost:4000",
      {
        query: { username } // Add username to socket connection
      }
    );

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
