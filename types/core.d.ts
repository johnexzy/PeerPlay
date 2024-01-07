
import { Socket } from "socket.io-client";



declare global {
  google;
}

export type PlayType = {
  id: string;
  room_id: number;
  link: string;
  status: 'pending' | 'used';
};
interface AppState {
  url: string | null;
  pip: boolean;
  playing: boolean;
  controls: boolean;
  light: boolean;
  volume: number;
  muted: boolean;
  played: number;
  playedSeconds: number;
  loaded: number;
  duration: number;
  playbackRate: number;
  loop: boolean;
  seeking: boolean;
  init: boolean;
}

export type S = Socket<DefaultEventsMap, DefaultEventsMap>
interface DefaultEventsMap {
  [event: string]: (...args: any[]) => void;
}
interface IPlayerProps {
  socket: S;
  url: string;
  roomId: number | string;
  username: string;
}

export { DefaultEventsMap, IPlayerProps, AppState}