"use client"
import Player from '@/components/player'
import useSocket from '@/composables/useSocket'
import React from 'react'

function AppPlayer({ url, roomId} : {url: string, roomId: number}) {

  const socket = useSocket()!

  return (
    <div suppressHydrationWarning>
        <Player url={url} roomId={roomId} socket={socket} />
    </div>
  )
}

export default AppPlayer

