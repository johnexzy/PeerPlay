import { Icon } from "@iconify/react";
import { Button } from "./button";
import LinkIcon from "@/assets/svgs/LinkIcon.svg";
import { useEffect, useState } from "react";
import { truncateText } from "@/utils/sources";
import Link from "next/link";

function CopyShare({ link, pin }: { link: string; pin: string }) {
  const [isCopied, setIsCopied] = useState(false);
  const [isCopiedDetails, setIsCopiedDetails] = useState(false);
  const handleCopyToClipboard = (value = link) => {
    navigator.clipboard.writeText(value).then(
      () => {
        // Handle successful copy if needed
        if (value === link) {
          setIsCopied(true);
        }
        else {
            setIsCopiedDetails(true)
        }
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
    if (isCopiedDetails) {
        setTimeout(() => {
          setIsCopiedDetails(false);
        }, 2000);
      }
  }, [isCopied, isCopiedDetails]);

  useEffect(() => {
    navigator.share;
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="p-3 text-center text-primary/70 bg-gray rounded-[4px] border border-[#E5E4E7]">
        Share the URL and PIN below so others can join your PeerPlay.
      </div>
      <div>
        <p className=" text-primary/70 text-[16px]">Peer link & Pin</p>
        <div className="relative mt-[10px]">
          <div className="flex overflow-hidden items-center justify-between w-full p-2 border border-secondary rounded-md shadow-sm bg-gray-200">
            <div className="flex items-center gap-2">
              <LinkIcon className=" h-[20px] w-[20px]" />
              <p className="truncate text-primary-500 text-[16px]">{truncateText(link, 36)}</p>
            </div>
            <button
              onClick={() => handleCopyToClipboard()}
              className="p-2 flex"
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
          <div className="flex justify-between w-full mt-4">
            {pin.split("").map((number, index) => (
              <div
                key={index}
                className="w-[58px] h-12 border text-primary-500 text-[16px] bg-gray-200 border-secondary rounded-md flex items-center justify-center text-lg"
              >
                {number}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-12 flex w-full gap-4">
        <Button
          onClick={() =>
            handleCopyToClipboard(
              `Let's watch together on Peer Play: ${link}.\n\nPeerPlayP PIN: ${pin}`
            )
          }
        >
         {!isCopiedDetails ? "Copy" : "Copied"}
        </Button>
      </div>
      <div className="text-center">
        <Link href={link} className=" font-monumnet" target="_blank">Join</Link>
      </div>
    </div>
  );
}

export default CopyShare;
