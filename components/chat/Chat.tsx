import React, { useEffect, useState } from "react";
import ActiveUsers from "./ActiveUsers";

interface IMsgDataTypes {
  roomId: String | number;
  user: String;
  msg: String;
  type: "chat";
  time: String;
}

const ChatPage = ({ socket, username, roomId }: any) => {
  const [currentMsg, setCurrentMsg] = useState("");
  const [chat, setChat] = useState<IMsgDataTypes[]>([]);
  const [activeUsers, setActiveUsers] = useState<{ username: string; id: string }[]>([]);

  const sendData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (currentMsg !== "") {
      const msgData: IMsgDataTypes = {
        roomId,
        user: username,
        msg: currentMsg,
        type: "chat",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }), // Format time
      };
      await socket.emit("chat", msgData);
      setCurrentMsg("");
    }
  };

  useEffect(() => {
    socket.on("chat", (data: IMsgDataTypes) => {
      setChat((pre) => [...pre, data]);
    });

    socket.on("users_update", (data: { users: { username: string; id: string }[] }) => {
      setActiveUsers(data.users);
    });
  }, [socket]);

  return (
    <div className="flex flex-col h-[600px] mx-auto max-w-md border rounded-lg shadow-lg overflow-hidden bg-gray-50">
      <div className="p-3 border-b flex justify-between items-center bg-white sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-medium text-gray-700">Chat Room</h3>
          <span className="text-xs text-gray-500">#{roomId}</span>
        </div>
        <ActiveUsers users={activeUsers} />
      </div>
      <div className="flex-grow overflow-auto p-4 space-y-2">
        <ul className="space-y-2">
          {chat.map(({ user, msg, time }, index) => (
            <li
              key={index}
              className={`flex ${
                user === username ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[75%] break-words p-2 rounded-lg shadow ${
                  user === username
                    ? "bg-blue-300 rounded-br-none"
                    : "bg-white rounded-bl-none"
                }`}
              >
                <div
                  className={`flex gap-6 justify-between ${
                    user === username ? " flex-row-reverse " : ""
                  }`}
                >
                  {user !== username && (
                    <p className="text-xs  font-normal text-green-600">
                      {user}
                    </p>
                  )}
                  <p className="text-[10px] text-gray-500">{time}</p>
                </div>
                <p className="text-sm">{msg}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="p-4 bg-white border-t-2 border-gray-200">
        <form onSubmit={sendData} className="flex items-center">
          <input
            type="text"
            value={currentMsg}
            onChange={(e) => setCurrentMsg(e.target.value)}
            placeholder="Type your message..."
            className="flex-grow p-4 border-2 border-gray-300 rounded-full focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="ml-4 text-blue-500 hover:text-blue-700 transition-colors"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatPage;
