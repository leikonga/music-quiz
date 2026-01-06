import { usePlayer } from "./PlayerContext";
import SpotifyClient from "@lib/spotifyClient";
import { useRouter } from "next/router";
import {
  CircleArrowLeft,
  CircleArrowRight,
  PauseCircle,
  PlayCircle,
} from "lucide-react";

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

  const buttonBase =
    "mx-1 px-2 cursor-pointer transition-transform ease-in-out focus:outline-none focus:ring-2 focus:ring-zinc-400 rounded-full";

  return (
    <div className="flex flex-row items-center justify-center mt-4 mb-2 text-black">
      <div
        className={`${buttonBase} text-zinc-500 cursor-not-allowed`}
        onClick={() => previous()}
        role="button"
        tabIndex={0}
        title="Previous (disabled)"
        aria-label="Previous track (disabled)"
      >
        <CircleArrowLeft className="h-10 w-10" />
      </div>
      {!props.playerState.paused ? (
        <div
          className={`${buttonBase} hover:text-zinc-800 hover:scale-110`}
          onClick={() => togglePlay()}
          onKeyDown={(e) => e.key === "Enter" && togglePlay()}
          role="button"
          tabIndex={0}
          title="Pause"
          aria-label="Pause"
        >
          <PauseCircle className="h-10 w-10" />
        </div>
      ) : (
        <div
          className={`${buttonBase} hover:text-zinc-800 hover:scale-110`}
          onClick={() => togglePlay()}
          onKeyDown={(e) => e.key === "Enter" && togglePlay()}
          role="button"
          tabIndex={0}
          title="Play"
          aria-label="Play"
        >
          <PlayCircle className="h-10 w-10" />
        </div>
      )}
      <div
        className={`${buttonBase} hover:text-zinc-800 hover:scale-110`}
        onClick={() => next()}
        onKeyDown={(e) => e.key === "Enter" && next()}
        role="button"
        tabIndex={0}
        title="Next"
        aria-label="Next track"
      >
        <CircleArrowRight className="h-10 w-10" />
      </div>
    </div>
  );
}
