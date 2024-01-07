"use client";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Button } from "@/components/button";
import Player from "@/components/player";
import Socket from "@/composables/useSocket";
import ChatPage from "@/components/chat/Chat";

interface AppPlayerProps {
  url: string;
  roomId: number | string;
}

interface RoomIdFormProps {
  setUsername: (val: string) => void;
  joining: boolean;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

function AppPlayer({ url, roomId }: AppPlayerProps) {
  const [isRoomIdValid, setIsRoomIdValid] = useState(false);
  const [username, setUsername] = useState("");
  const [joining, setJoining] = useState(false);
  const socket = Socket()!;

  const checkRoomId = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isRoomIdValid) {
      setJoining(true);

      socket.emit("join_room", roomId);
      console.log("socket.emit");

      setTimeout(() => {
        setIsRoomIdValid(true);

        setJoining(false);
      }, 1000);
    }
  };

  return (
    <div suppressHydrationWarning>
      {!isRoomIdValid ? (
        <RoomIdForm
          setUsername={setUsername}
          joining={joining}
          onSubmit={checkRoomId}
        />
      ) : (
        <div style={{ display: !isRoomIdValid ? "none" : "" }}>
          <Player
            url={url}
            roomId={roomId}
            socket={socket}
            username={username || "User #" + Math.floor(Math.random() * 1000)}
          />
        </div>
      )}

      <div style={{ display: !isRoomIdValid ? "none" : "" }}>
        <ChatPage socket={socket} roomId={roomId} username={username} />
      </div>
    </div>
  );
}

function RoomIdForm({ setUsername, joining, onSubmit }: RoomIdFormProps) {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <form className="max-w-[416px] w-full" onSubmit={onSubmit}>
        <div className="rounded-md bg-white p-4 md:p-6">
          <div className="mb-4">
            <label
              htmlFor="roomId"
              className="mb-2 block text-sm text-primary/70"
            >
              Enter a username (optional)
            </label>
            <div className="relative my-2 rounded-md">
              <div className="relative">
                <input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Username"
                  className="peer block w-full rounded-[4px] border border-gray-100 py-3  text-[16px] text-primary-500 placeholder:text-primary/20 focus:border-secondary focus:shadow-smLight"
                  aria-describedby="link-error"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setUsername(e.target.value)
                  }
                />
              </div>
            </div>
          </div>
          <div className="mt-6 flex justify-end gap-4">
            <Button type="submit">{joining ? "Joining..." : "Join"}</Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AppPlayer;
