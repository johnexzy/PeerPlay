import { Icon } from "@iconify/react";
import { Button } from "./button";
import LinkIcon from "@/assets/svgs/LinkIcon.svg";
import { useEffect, useState } from "react";
import { truncateText } from "@/utils/sources";
import Link from "next/link";

function CopyShare({ link, pin }: { link: string; pin: string }) {
  const [isCopied, setIsCopied] = useState(false);
  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(link).then(
      () => {
        // Handle successful copy if needed

        setIsCopied(true);
      },
      () => {
        // Handle copy error if needed
      }
    );
  };

  useEffect(() => {
    if (isCopied) {
      setTimeout(() => {
        setIsCopied(false);
      }, 1500);
    }
  }, [isCopied]);

  return (
    <div className="flex flex-col gap-6">
      <div className="p-3 text-center text-primary/70 bg-gray rounded-[4px] border border-[#E5E4E7]">
        Share the URL below so others can join your PeerPlay.
      </div>
      <div>
        <p className=" text-primary/70 text-[16px]">Peer link</p>
        <div className="relative mt-[10px]">
          <div className="flex relative overflow-hidden items-center justify-between w-full p-3 border border-secondary rounded-md shadow-sm bg-gray-200">
            <div className="flex items-center gap-2 w-[90%]">
              <LinkIcon className=" h-[20px] w-[20px]" />
              <p className="truncate text-primary-500 text-[16px]">
                {truncateText(link, 36)}
              </p>
            </div>
            <button
              onClick={handleCopyToClipboard}
              className=" flex absolute right-2 z-20"
              type="button"
            >
              {isCopied && (
                <Icon
                  icon="line-md:check-all"
                  className=" h-[20px] w-[20px] text-secondary hover:text-primary-500/50"
                />
              )}
              <Icon
                icon="line-md:clipboard-arrow"
                className=" h-[20px] w-[20px] text-primary-500 hover:text-primary-500/50"
              />
            </button>
          </div>
        </div>
      </div>
      <Link
        href={link}
        className="mt-12 flex w-full gap-4 font-monumnet"
        target="_blank"
      >
        <Button type="button">Join</Button>
      </Link>
    </div>
  );
}

export default CopyShare;
