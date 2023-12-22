"use client"

import Player from '@/components/player';
import useSocket from "@/composables/useSocket";

function Page() {
  const socket = useSocket()
  return (
    <div suppressHydrationWarning>
      <Player socket={socket!} />
    </div>
  )
}

export default Page