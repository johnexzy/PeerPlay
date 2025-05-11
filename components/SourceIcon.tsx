import { Icon } from "@iconify/react";
import LinkIcon from "@/assets/svgs/LinkIcon.svg";


const SourceIcon = ({ icon }: { icon: string }) => {
    switch (icon) {
      case "youtube":
        return (
          <Icon
            icon="logos:youtube-icon"
            className="pointer-events-none absolute left-3 top-1/2  -translate-y-1/2"
          />
        );
      case "twitch":
        return (
          <Icon
            icon="logos:twitch"
            className="pointer-events-none absolute left-3 top-1/2  -translate-y-1/2"
          />
        );
      case "vimeo":
        return (
          <Icon
            icon="logos:vimeo-icon"
            className="pointer-events-none absolute left-3 top-1/2  -translate-y-1/2"
          />
        );
      case "facebook":
        return (
          <Icon
            icon="logos:facebook"
            className="pointer-events-none absolute left-3 top-1/2  -translate-y-1/2"
          />
        );
      case "dailymotion":
        return (
          <Icon
            icon="simple-icons:dailymotion"
            className="pointer-events-none absolute left-3 top-1/2  -translate-y-1/2"
          />
        );
      default:
        return (
          <LinkIcon className="pointer-events-none absolute left-3 top-1/2 h-[20px] w-[20px] -translate-y-1/2" />
        );
    }
  };
export default SourceIcon