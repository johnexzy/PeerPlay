"use server";

import { z } from "zod";
import { sql } from "@vercel/postgres";
import { redirect } from "next/navigation";

const youtubeRegex = /^(https:\/\/www\.youtube\.com\/watch\?v=[\w-]+(&[\w-]+)*$)|(https:\/\/youtu\.be\/[\w-]+)$/;

export type State = {
  errors?: {
    roomId?: string[];
    link?: string[];
  };
  message?: string | null;
  data?: {id: string; room_id: number}
};
const PlaySchema = (source?: string) =>
  z.object({
    id: z.string(),
    roomId: z.string({
      invalid_type_error: "Please add a room ID.",
    }),
    link: z.string().refine(
      (url) => {
        // Regular expression to match the structure of a YouTube watch URL

        return source === "youtube" ? youtubeRegex.test(url) : url;
      },
      {
        message: "Please provide a valid watch link.", // Custom error message
      }
    ),
    status: z.enum(["pending", "used"], {
      invalid_type_error: "Please select a status.",
    }),
    date: z.string(),
  });


export async function createPlay(prevState: State, formData: FormData) {
  const CreatePlaySchema = PlaySchema(formData.get("source") as string).omit({ id: true, date: true, status: true, roomId: true });

  const validatedFields = CreatePlaySchema.safeParse({
    link: formData.get("link"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Play.",
      data: undefined
    };
  }

  const link= validatedFields.data.link;
  const status = 'pending';
  const date = new Date().toISOString().split("T")[0];
  const roomId = Math.floor(Math.random() * 1000000)
  let result
  try {
    const result =   await sql`
      INSERT INTO plays (room_id, link, status, date)
      VALUES (${roomId}, ${link}, ${status}, ${date})
      RETURNING *
    `;

    console.log(result.rows[0])
    return {
        message: "Added Play",
        data: result.rows[0] as {id: string; room_id: number}
      };
  } catch (error) {

    console.log(error)
    return {
      data: undefined,
      message: `${JSON.stringify(result)}`,
    };
  }

}
