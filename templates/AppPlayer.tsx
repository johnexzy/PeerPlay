"use client";
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
        setErrorMessage("PIN is invalid");
        setIsRoomIdValid(false);
      }
      setCheckingId(false);
    }, 1000);
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

function RoomIdForm({
  validId,
  setValidId,
  errorMessage,
  checkingId,
  onSubmit,
}: RoomIdFormProps) {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <form className="max-w-[416px] w-full" onSubmit={onSubmit}>
        <div className="rounded-md bg-white p-4 md:p-6">
          <div className="mb-4">
            <label
              htmlFor="roomId"
              className="mb-2 block text-sm text-primary/70"
            >
              Enter PeerPlay PIN
            </label>
            <div className="relative my-2 rounded-md">
              <div className="relative">
                <input
                  id="roomId"
                  name="roomId"
                  type="text"
                  placeholder="000000"
                  maxLength={6}
                  className="peer block w-full rounded-[4px] border border-gray-100 py-3  text-[16px] text-primary-500 placeholder:text-primary/20 focus:border-secondary focus:shadow-smLight"
                  required
                  aria-describedby="link-error"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setValidId(e.target.value)
                  }
                />
              </div>
            </div>
          </div>
          <div
            id="link-error"
            aria-live="polite"
            className="mt-2 text-sm text-red-500"
          >
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
