"use client";

import { useFormState } from "react-dom";
import { VideoCameraIcon, LinkIcon } from "@heroicons/react/24/outline";
import { sources } from "@/utils/sources";
import { Button } from "@/components/button";
import { createPlay } from "./lib/actions";
import Image from "next/image";
import PeerPlayImg from "@/assets/images/peerplay-home.png"

function Page() {
  const initialState = { message: "", errors: {}, data: undefined };
  const [state, dispatch] = useFormState(createPlay, initialState);

  return (
    <div className="flex flex-col justify-center items-center h-screen p-4">
      <form className="max-w-[600px] w-full" action={dispatch}>
        <div className="mb-6 text-center">
          <Image
            src={PeerPlayImg}
            width={661}
            alt="PeerPlay platform for shared video viewing."
          />
          <h1 className="text-lg text-gray-800 font-semibold my-4">
           Distance never disrupts the joy of watching together with PeerPlay
          </h1>
        </div>

        <div className="rounded-md bg-gray-50 p-6 shadow-sm">

          {state.data && (
            <div className="text-[12px] mb-5">
              <p className=" font-mono ">
                <span className="font-bold">Link</span>:{" "}
                <span className="text-green-600">
                  https://peer-play-azure.vercel.app/play/{state.data.id}
                </span>
              </p>
              <div className=" font-mono ">
                <span className="font-bold">PeerPlayId</span>:{" "}
                <span className="text-green-600">{state.data.room_id}</span>
              </div>
            </div>
          )}
          <div className="mb-4">
            <label htmlFor="source" className="mb-2 block text-sm font-medium">
              Choose a video source
            </label>
            <div className="relative">
              <select
                id="source"
                name="source"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                defaultValue="youtube"
                aria-describedby="source-error"
              >
                <option value="" disabled>
                  Select a Video source
                </option>
                {sources.map((source) => (
                  <option key={source.id} value={source.id}>
                    {source.label}
                  </option>
                ))}
              </select>
              <VideoCameraIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="amount" className="mb-2 block text-sm font-medium">
              Video url
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="link"
                  name="link"
                  type="text"
                  placeholder="Enter Video URL"
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                  required
                  aria-describedby="link-error"
                />
                <LinkIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
              {state.errors?.link ? (
                <div
                  id="link-error"
                  aria-live="polite"
                  className="mt-2 text-sm text-red-500"
                >
                  {state.errors.link.map((error: string) => (
                    <p key={error}>{error}</p>
                  ))}
                </div>
              ) : null}
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-4">
            <Button type="submit">Create PeerPlay</Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Page;
