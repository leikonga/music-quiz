import { usePlayer } from "./PlayerContext";

interface PlayerMetadataProps {
  currentTrack: Spotify.Track;
}

export default function PlayerMetadata(props: PlayerMetadataProps) {
  const { revealed } = usePlayer();

  const title = revealed ? props.currentTrack.name : "?";
  const artist = revealed
    ? props.currentTrack.artists.map((artist) => artist.name).join(", ")
    : "?";
  const album = revealed ? props.currentTrack.album.name : "?";

  return (
    <div className="text-center max-w-full">
      <p
        className="font-bold text-2xl truncate"
        title={revealed ? title : undefined}
      >
        {title}
      </p>
      <p
        className="font-semibold text-lg truncate"
        title={revealed ? artist : undefined}
      >
        {artist}
      </p>
      <p
        className="text-sky-500 text-base truncate"
        title={revealed ? album : undefined}
      >
        {album}
      </p>
    </div>
  );
}
