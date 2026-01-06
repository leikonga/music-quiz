import SpotifyClient from "@lib/spotifyClient";
import PlayerController from "./PlayerController";
import PlayerCover from "./PlayerCover";
import PlayerMetadata from "./PlayerMetadata";
import PlayerProgress from "./PlayerProgress";
import PlayerVolume from "./PlayerVolume";
import { usePlayer } from "./PlayerContext";

interface PlayerParentProps {
  player: Spotify.Player;
  playerState: Spotify.PlaybackState;
  deviceId: string;
  spotifyClient: SpotifyClient;
}

export default function PlayerParent(props: PlayerParentProps) {
  const { spotifyTracks } = usePlayer();
  return (
    <div id="player">
      <div className="background flex flex-col-reverse sm:flex-row  items-center justify-center">
        <div id="left" className="flex flex-col w-80 m-5">
          <PlayerMetadata
            currentTrack={props.playerState.track_window.current_track}
          />
          <PlayerController
            player={props.player}
            playerState={props.playerState}
            deviceId={props.deviceId}
            spotifyClient={props.spotifyClient}
          />
          <PlayerProgress
            playerState={props.playerState}
            player={props.player}
          />
          <PlayerVolume player={props.player} />
          <p className="text-xs text-center mt-3">
            <span className="bg-zinc-100 rounded-full px-3 py-1">
              {spotifyTracks.length} songs left
            </span>
          </p>
        </div>
        <PlayerCover
          currentTrack={props.playerState.track_window.current_track}
        />
      </div>
    </div>
  );
}
