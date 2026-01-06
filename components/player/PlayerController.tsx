import { usePlayer } from "./PlayerContext";
import SpotifyClient from "@lib/spotifyClient";
import { useRouter } from "next/router";
import { useState } from "react";
import { SkipBack, PauseCircle, PlayCircle, SkipForward, Volume2 } from "lucide-react";

interface PlayerControllerProps {
  player: Spotify.Player;
  playerState: Spotify.PlaybackState;
  deviceId: string;
  spotifyClient: SpotifyClient;
}

let toggling = false;
let isChanging = false;

export default function PlayerController(props: PlayerControllerProps) {
  const router = useRouter();
  const { startTime, spotifyTracks } = usePlayer();
  const [volume, setVolume] = useState(0.5);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    props.player.setVolume(newVolume);
  };

  const togglePlay = async () => {
    if (toggling) {
      return;
    }
    toggling = true;
    if (!props.playerState.paused) {
      await props.player.pause();
    } else {
      await props.player.resume();
    }
    toggling = false;
  };

  const next = async () => {
    if (isChanging) {
      return;
    }
    isChanging = true;
    if (spotifyTracks.length == 0) {
      router.reload();
      return;
    }
    await props.spotifyClient.playRandomTrack(
      spotifyTracks,
      props.deviceId,
      startTime,
    );
    isChanging = false;
  };

  const previous = async () => {
    return;
  };

  return (
    <div className="flex flex-row items-center justify-center mt-4 mb-2 text-black">
      <div
        className="mx-1 px-2 text-zinc-500 cursor-not-allowed"
        onClick={() => previous()}
      >
        <SkipBack className="h-10 w-10" />
      </div>
      {!props.playerState.paused ? (
        <div
          className="mx-1 px-2 hover:text-zinc-800 cursor-pointer transition ease-in-out"
          onClick={() => togglePlay()}
        >
          <PauseCircle className="h-10 w-10" />
        </div>
      ) : (
        <div
          className="mx-1 px-2 hover:text-zinc-800 cursor-pointer transition ease-in-out"
          onClick={() => togglePlay()}
        >
          <PlayCircle className="h-10 w-10" />
        </div>
      )}
      <div
        className="mx-1 px-2 hover:text-zinc-800 cursor-pointer transition ease-in-out"
        onClick={() => next()}
      >
        <SkipForward className="h-10 w-10" />
      </div>
      <div className="flex items-center ml-4">
        <Volume2 className="h-5 w-5 text-zinc-600" />
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          className="ml-2 w-24 h-1 accent-zinc-600 cursor-pointer"
        />
      </div>
    </div>
  );
}
