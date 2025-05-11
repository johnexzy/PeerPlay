"use server";

import { z } from "zod";
import { sql } from "@vercel/postgres";
import { redirect } from "next/navigation";

export type FormState = {
  errors?: {
    roomId?: string[];
    link?: string[];
  };
  message?: string | null;
  data?: { id: string; room_id: number };
};

const youtubeRegex = /^(https:\/\/(www\.|m\.)?youtube\.com\/watch\?v=[\w-]+(&[\w-]+)*$)|(https:\/\/youtu\.be\/[\w-]+(\?[\w-]+=[\w-]+(&[\w-]+)*)*)$/;
const twitchRegex = /^(https:\/\/www\.twitch\.tv\/[\w-]+)$/;
const streamableRegex = /^(https:\/\/streamable\.com\/[\w-]+)$/;
const dailymotionRegex = /^(https:\/\/www\.dailymotion\.com\/video\/[\w-]+)$/;
const vidyardRegex = /^(https:\/\/(share\.|video\.)vidyard\.com\/watch\/[\w-]+)$/;
const facebookRegex = /^(https:\/\/(www\.|web\.)facebook\.com\/[\w.-]+\/videos\/[\w-]+)|(https:\/\/fb\.watch\/[\w-]+\/?(\?.*)?)$/;
const vimeoRegex = /^(https:\/\/vimeo\.com\/[\w-]+)$/;

const PlaySchema = (source?: string) =>
  z.object({
    id: z.string(),
    roomId: z.string({
      invalid_type_error: "Please add a room ID.",
    }),
    link: z.string().refine(
      (url) => {
        switch (source) {
          case "youtube":
            return youtubeRegex.test(url);
          case "twitch":
            return twitchRegex.test(url);
          case "streamable":
            return streamableRegex.test(url);
          case "dailymotion":
            return dailymotionRegex.test(url);
          case "vidyard":
            return vidyardRegex.test(url);
          case "facebook":
            return facebookRegex.test(url);
          case "vimeo":
            return vimeoRegex.test(url);
          default:
            return true; // If source is not specified, no specific validation is applied
        }
      },
      {
        message: `Please provide a valid ${source} watch link.`, // Custom error message
      }
    ),
    status: z.enum(["pending", "used"], {
      invalid_type_error: "Please select a status.",
    }),
    date: z.string(),
  });

export async function createPlay(prevState: FormState, formData: FormData) {
  const CreatePlaySchema = PlaySchema(formData.get("source") as string).omit({
    id: true,
    date: true,
    status: true,
    roomId: true,
  });

  const validatedFields = CreatePlaySchema.safeParse({
    link: formData.get("link"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Play.",
      data: undefined,
    };
  }

  const link = validatedFields.data.link;
  const status = "pending";
  const date = new Date().toISOString().split("T")[0];
  const roomId = Math.floor(Math.random() * 1000000);
  let result;
  try {
    const result = await sql`
      INSERT INTO plays (room_id, link, status, date)
      VALUES (${roomId}, ${link}, ${status}, ${date})
      RETURNING *
    `;

    console.log(result.rows[0]);
    return {
      message: "Added Play",
      data: result.rows[0] as { id: string; room_id: number },
    };
  } catch (error) {
    console.log(error);
    return {
      data: undefined,
      message: `${JSON.stringify(result)}`,
    };
  }
}
