import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';

import { PlayType } from '@/types';



export async function fetchPlayById(id: string) {
    noStore()
    try {
      const data = await sql<PlayType>`
        SELECT
          plays.id,
          plays.room_id,
          plays.link,
          plays.status
        FROM plays
        WHERE plays.id = ${id};
      `;

      const result = data.rows[0];

      console.log(result);
        
      return result;
    } catch (error) {
      console.error('Database Error:', error);
    }
  }