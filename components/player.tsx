"use client";

import React, { Component, ChangeEvent, MouseEventHandler } from "react";
import screenfull from "screenfull";
import ReactPlayer, { ReactPlayerProps } from "react-player";
import "./index.scss";
import { AppState, IPlayerProps } from "@/types";
import Loader from "./Loader";

class Player extends Component<IPlayerProps, AppState> {
  private player: ReactPlayer | null = null;

  state: AppState = {
    url: this.props.url,
    pip: false,
    playing: true,
    controls: true,
    light: true,
    volume: 1,
    muted: false,
    played: 0,
    playedSeconds: 0,
    loaded: 0,
    duration: 0,
    playbackRate: 1.0,
    loop: false,
    seeking: false,
    init: false,
  };

  load = (url: string) => {
    this.setState({
      url,
      played: 0,
      loaded: 0,
      pip: false,
    });
  };

  handlePlayPause = () => {
    this.setState({ playing: !this.state.playing });
  };

  onStart = () => {
    if (this.player) {
      this.player.seekTo(this.state.played);
    }
  };

  handleStop = () => {
    this.setState({ url: null, playing: false });
  };

  handleToggleControls = () => {
    const { url } = this.state;
    this.setState(
      {
        controls: !this.state.controls,
        url: null,
      },
      () => this.load(url as string)
    );
  };

  handleToggleLight = () => {
    this.setState({ light: !this.state.light });
  };

  handleToggleLoop = () => {
    this.setState({ loop: !this.state.loop });
  };

  handleVolumeChange = (e: any) => {
    this.setState({ volume: parseFloat(e.target.value) });
  };

  handleToggleMuted = () => {
    this.setState({ muted: !this.state.muted });
  };

  handleSetPlaybackRate = (e: any) => {
    this.setState({ playbackRate: parseFloat(e.target.value) });
  };

  handleOnPlaybackRateChange = (speed: number) => {
    this.setState({ playbackRate: parseFloat(speed.toFixed(2)) });
  };

  handleTogglePIP = () => {
    this.setState({ pip: !this.state.pip });
  };

  handlePlay = () => {
    console.log("onPlay");

    this.setState({ playing: true });

    this.socket.emit("send_msg", {
      roomId: `${this.props.roomId}`,
      message: "Play",
      data: { ...this.state, playing: true },
    });
  };

  handleEnablePIP = () => {
    console.log("onEnablePIP");
    this.setState({ pip: true });
  };

  handleDisablePIP = () => {
    console.log("onDisablePIP");
    this.setState({ pip: false });
  };

  handlePause = () => {
    // console.log("onPause");
    this.setState({ playing: false });

    this.socket.emit("send_msg", {
      roomId: `${this.props.roomId}`,
      message: "Pause",
      data: { ...this.state, playing: false },
    });
  };

  handleSeekMouseDown = () => {
    this.setState({ seeking: true });
  };

  handleSeekChange = (value: any) => {
    // console.log("onSeekChange", value);
    this.setState({ played: parseFloat(value) });
  };

  handleSeekMouseUp = (e: any) => {
    this.setState({ seeking: false });
    if (this.player) {
      this.player.seekTo(parseFloat(e.target.value));
    }
  };

  handleProgress = (state: ReactPlayerProps) => {
    if (!this.state.seeking && !this.state.playing) {
      this.setState({ ...state } as AppState);
      // console.log("onProgress", state);
      this.socket.emit("send_msg", {
        roomId: `${this.props.roomId}`,
        data: { ...this.state },
      });
      this.socket.emit("seek", {
        roomId: `${this.props.roomId}`,
        seekTime: parseFloat(state.playedSeconds),
      });
    }
  };

  handleEnded = () => {
    // console.log("onEnded");
    this.setState({ playing: this.state.loop });
  };

  handleDuration = (duration: number) => {
    console.log("onDuration", duration);
    this.setState({ duration });
  };

  handleClickFullscreen = () => {
    if (this.player) {
      screenfull.request(document.querySelector("video")!);
    }
  };

  syncReady = () => {
    console.log("syncReady");
    this.setState({ init: true });
  };
  renderLoadButton = (url: string, label: string) => {
    return <button onClick={() => this.load(url)}>{label}</button>;
  };

  ref = (player: ReactPlayer | null) => {
    this.player = player;
  };

  socket = this.props.socket;

  componentDidMount() {
    // console.log(this.props.roomId);
    this.socket.emit("join_room", `${this.props.roomId}`);
    this.socket.on("receive_msg", (data) => {
      this.setState(data.data);
    });

    // Listening for 'seek' events from the socket
    this.socket.on("seek", (data) => {
      // Check if the seek time is outside a 2-second range of the current play time
      const isSeekOutOfRange =
        data.seekTime < this.state.playedSeconds - 1.2 ||
        data.seekTime > this.state.playedSeconds + 1.2;
      if (isSeekOutOfRange) {
        console.log("Seek Event", data, this.state);

        // If the player is defined, move to the specified seek time
        if (this.player) {
          try {
            this.player.seekTo(data.seekTime);
          } catch (error) {
            console.error("Error seeking to time:", error);
          }
        }
      }
    });
  }

  render() {
    const {
      url,
      playing,
      controls,
      light,
      volume,
      muted,
      loop,
      played,
      loaded,
      duration,
      playbackRate,
      pip,
    } = this.state;
    const SEPARATOR = " ·";

    return (
      <div className="app ">
        <section className="section">
          <div className="player-wrapper">
            <div className="player">
              <ReactPlayer
                ref={this.ref}
                className="react-player"
                width="100%"
                height="100%"
                url={url as string}
                pip={pip}
                playing={playing}
                forceVideo
                controls={controls}
                loop={loop}
                playbackRate={playbackRate}
                volume={volume}
                muted={muted}
                onReady={this.syncReady}
                onStart={this.onStart}
                onPlay={this.handlePlay}
                onEnablePIP={this.handleEnablePIP}
                onDisablePIP={this.handleDisablePIP}
                onPause={this.handlePause}
                onBuffer={() => console.log("onBuffer")}
                onPlaybackRateChange={this.handleOnPlaybackRateChange}
                onSeek={this.handleSeekChange}
                onEnded={this.handleEnded}
                onError={(e) => console.log("onError", e)}
                onProgress={this.handleProgress}
                onDuration={this.handleDuration}
                onPlaybackQualityChange={(e: ChangeEvent) =>
                  console.log("onPlaybackQualityChange", e)
                }
              />
            </div>
          </div>
        </section>
        {!this.state.init && (
          <div className="top-[50%] left-[50%] absolute">
            <Loader size="lg" color="white" foregroundColor="bisque" />
          </div>
        )}
      </div>
    );
  }
}

export default Player;
