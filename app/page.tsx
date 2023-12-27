"use client";

import { useFormState } from "react-dom";
import { sources } from "@/utils/sources";
import { createPlay } from "./lib/actions";
import Image from "next/image";
import PeerPlayImg from "@/assets/images/peerplay-home.png";
import FormBody from "@/components/form-body";

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
        <FormBody sources={sources} state={state} />
      </form>
    </div>
  );
}



export default Page;
