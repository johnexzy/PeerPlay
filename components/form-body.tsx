"use client";

import { useFormStatus } from "react-dom";
import { sources } from "@/utils/sources";
import { Button } from "@/components/button";
import { FormState } from "@/app/lib/actions";
import PlayLogo from "@/assets/images/play-logo.png";
import VideoIcon from "@/assets/svgs/VideoIcon.svg";
import Image from "next/image";
import { useState } from "react";
import "./form-body.css";
import SourceIcon from "./SourceIcon";
import CopyShare from "./CopyShare";

export default function FormBody({
  state,
}: {
  state: FormState;
  sources: { id: string; label: string }[];
}) {
  const { pending } = useFormStatus();
  const [selectedOption, setSelectedOption] = useState("");

  const handleChange = (event: any) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="form-body">
      <div className="flex items-center flex-col gap-3 mb-8">
        <Image src={PlayLogo} width={43} height={43} alt="" />
        <p className=" font-monumnet text-[20px] text-primary">PeerPlay</p>
        <div className="max-w-[282px] text-center">
          <p className="text-[16px] text-primary/70">
            Making individuals connected through vidoes
          </p>
        </div>
      </div>
      {state.data ? (
        <CopyShare link={`https://peerplay.space/play/${state.data.id}`} pin={state.data.room_id.toString()} />
      ) : (
        <div>
          <div className="mb-4">
            <label
              htmlFor="source"
              className="mb-2 block text-sm text-primary/70"
            >
              Choose a video source
            </label>
            <div className="relative">
              <select
                id="source"
                name="source"
                className={` ${
                  selectedOption === "" ? "text-primary/20" : "text-primary-500"
                }  peer block `}
                defaultValue="youtube"
                value={selectedOption}
                onChange={handleChange}
                aria-describedby="source-error"
              >
                <option value="" className=" text-primary/20">
                  Select video source
                </option>
                {sources.map((source) => (
                  <option key={source.id} value={source.id}>
                    {source.label}
                  </option>
                ))}
              </select>
              <VideoIcon className="pointer-events-none absolute left-3 top-1/2 h-[20px] w-[20px] -translate-y-1/2" />
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="amount"
              className="mb-2 block text-sm text-primary/70"
            >
              Video URL
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="link"
                  name="link"
                  disabled={selectedOption === ""}
                  type="text"
                  placeholder="Drop video link"
                  className="peer block w-full rounded-[4px] border border-gray-200 py-3 pl-10 text-[16px] outline-2 text-primary-500 placeholder:text-primary/20"
                  required
                  aria-describedby="link-error"
                />
                <SourceIcon icon={selectedOption} />
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

          <div className="mt-12 flex w-full gap-4">
            <Button type="submit" disabled={selectedOption === ""}>
              {pending ? "Generating..." : "Generate link"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
