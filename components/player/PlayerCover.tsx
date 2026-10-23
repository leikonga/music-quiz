import Image from "next/image";
import { usePlayer } from "./PlayerContext";
import { Disc, Eye } from "lucide-react";

interface PlayerCoverProps {
  currentTrack: Spotify.Track;
}

export default function PlayerCover(props: PlayerCoverProps) {
  const { revealed, setRevealed } = usePlayer();
  const coverUrl = props.currentTrack?.album.images[0].url;

  const clickCover = () => {
    if (revealed) {
      return;
    }
    setRevealed(true);
  };

  const iconClasses =
    "w-full h-full p-12 text-zinc-400 bg-zinc-800 rounded-md shadow-md";

  if (!revealed) {
    return (
      <div
        className="w-72 sm:w-44 mx-8 cursor-pointer"
        title="Click to reveal"
        onClick={() => clickCover()}
      >
        <Eye className={iconClasses} />
      </div>
    );
  }

  if (!coverUrl) {
    return (
      <div className="w-72 sm:w-44 mx-8">
        <Disc className={iconClasses} />
      </div>
    );
  }

  return (
    <div className="w-72 sm:w-44 mx-8">
      <Image
        className="rounded-md shadow-md w-full h-auto"
        src={coverUrl}
        alt={props.currentTrack.name}
        width={640}
        height={640}
        unoptimized
      />
    </div>
  );
}
