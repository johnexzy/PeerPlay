
import { Socket } from "socket.io-client";



declare global {
  google;
}


interface AppState {
  url: string | null;
  pip: boolean;
  playing: boolean;
  controls: boolean;
  light: boolean;
  volume: number;
  muted: boolean;
  played: number;
  loaded: number;
  duration: number;
  playbackRate: number;
  loop: boolean;
  seeking: boolean;
}

interface DefaultEventsMap {
  [event: string]: (...args: any[]) => void;
}
interface IPlayerProps {
  socket: Socket<DefaultEventsMap, DefaultEventsMap>
}

export { DefaultEventsMap, IPlayerProps, AppState}