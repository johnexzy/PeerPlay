export const sources = [
  {
    id: "youtube",
    label: "YouTube",
  },
  {
    id: "twitch",
    label: "Twitch",
  },

  {
    id: "facebook",
    label: "Facebook",
  },
  {
    id: "vimeo",
    label: "Vimeo",
  },
  {
    id: "streamable",
    label: "Streamable",
  },
  {
    id: "dailymotion",
    label: "Dailymotion",
  },
  {
    id: "vidyard",
    label: "Vidyard",
  },
  {
    id: "direct-link",
    label: "Direct Link",
  },
];
export const truncateText = (text: string, maxLength = 64): string => {
    return text.length <= maxLength ? text : text.slice(0, maxLength) + '...';
  };