"use client";

import React, { Component, ChangeEvent, MouseEventHandler } from "react";
import screenfull from "screenfull";
import ReactPlayer, { ReactPlayerProps } from "react-player";
import "./index.scss";
import { AppState, IPlayerProps } from "@/types";

class Player extends Component<IPlayerProps, AppState> {
  
  private player: ReactPlayer | null = null;
  private urlInput: HTMLInputElement | null = null;

  state: AppState = {
    url: 'https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8',
    pip: false,
    playing: false,
    controls: true,
    light: true,
    volume: 1,
    muted: false,
    played: 0,
    loaded: 0,
    duration: 0,
    playbackRate: 1.0,
    loop: false,
    seeking: false,
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
      roomId: "roomId",
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
    console.log("onPause");
    this.setState({ playing: false });

    this.socket.emit("send_msg", {
      roomId: "roomId",
      message: "Pause",
      data: { ...this.state, playing: false },
    });
  };

  handleSeekMouseDown = () => {
    this.setState({ seeking: true });
  };

  handleSeekChange = (value: any) => {

    console.log("onSeekChange", value);
    this.setState({ played: parseFloat(value) });



    this.socket.emit("seek", { roomId: "roomId", seekTime: parseFloat(value) });
  };

  handleSeekMouseUp = (e: any) => {
    this.setState({ seeking: false });
    if (this.player) {
      this.player.seekTo(parseFloat(e.target.value));
    }
  };

  handleProgress = (state: ReactPlayerProps) => {
    if (!this.state.seeking) {
      this.setState(state as AppState);
    }
  };

  handleEnded = () => {
    console.log("onEnded");
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
    this.setState({ muted: false})
  }
  renderLoadButton = (url: string, label: string) => {
    return <button onClick={() => this.load(url)}>{label}</button>;
  };

  ref = (player: ReactPlayer | null) => {
    this.player = player;
  };

  socket = this.props.socket;

  componentDidMount() {
    this.socket.emit("join_room", "roomId");
    this.socket.on("receive_msg", (data) => {
      
     
      if (this.state.playing !== data.data.playing) {
        console.log("Socket", data);
        this.setState(data.data);
      }
    
    });
    this.socket.on("seek", (data) => {
      if (this.state.played !== data.seekTime) {
      console.log("Seek Event", data);

        if (this.player) {
          // this.handlePause()
          this.player.seekTo(data.seekTime);
          // this.handlePlay();
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
      <div className="app">
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
      </div>
    );
  }
}

export default Player;
