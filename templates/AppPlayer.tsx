"use client"
import React, { ChangeEvent, FormEvent, useState } from "react";
import { Button } from "@/components/button";
import Player from "@/components/player";
import useSocket from "@/composables/useSocket";

interface AppPlayerProps {
  url: string;
  roomId: number;
}

interface RoomIdFormProps {
  validId: string;
  setValidId: (id: string) => void;
  errorMessage: string;
  checkingId: boolean;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

function AppPlayer({ url, roomId }: AppPlayerProps) {
  const socket = useSocket()!;
  const [validId, setValidId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isRoomIdValid, setIsRoomIdValid] = useState(false);
  const [checkingId, setCheckingId] = useState(false);

  const checkRoomId = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCheckingId(true);

    setTimeout(() => {
      if (validId === `${roomId}`) {
        setIsRoomIdValid(true);
        setErrorMessage("");
      } else {
        setErrorMessage("Id Check failed");
        setIsRoomIdValid(false);
      }
      setCheckingId(false);
    }, 2000);
  };

  return (
    <div suppressHydrationWarning>
      {!isRoomIdValid ? (
        <RoomIdForm
          validId={validId}
          setValidId={setValidId}
          errorMessage={errorMessage}
          checkingId={checkingId}
          onSubmit={checkRoomId}
        />
      ) : (
        <Player url={url} roomId={roomId} socket={socket} />
      )}
    </div>
  );
}

function RoomIdForm({ validId, setValidId, errorMessage, checkingId, onSubmit }: RoomIdFormProps) {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <form className="max-w-[500px] w-full" onSubmit={onSubmit}>
        <div className="rounded-md bg-gray-50 p-4 md:p-6">
          <div className="mb-4">
            <label htmlFor="roomId" className="mb-2 block text-sm font-medium">
              Enter PeerPlay Id
            </label>
            <input
              id="roomId"
              name="roomId"
              type="text"
              placeholder="XXXXXX"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              required
              aria-describedby="link-error"
              onChange={(e: ChangeEvent<HTMLInputElement>) => setValidId(e.target.value)}
            />
         
          </div>
          <div id="link-error" aria-live="polite" className="mt-2 text-sm text-red-500">
            <p className="text-center !text-red-600">{errorMessage}</p>
          </div>
          <div className="mt-6 flex justify-end gap-4">
            <Button type="submit">{checkingId ? "Checking..." : "Join"}</Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AppPlayer;
