import { useState } from "react";
import { Volume1, Volume2, VolumeX } from "lucide-react";

interface PlayerVolumeProps {
  player: Spotify.Player;
}

export default function PlayerVolume({ player }: PlayerVolumeProps) {
  const [volume, setVolume] = useState(0.5);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    player.setVolume(newVolume);
  };

  const VolumeIcon = volume === 0 ? VolumeX : volume < 0.5 ? Volume1 : Volume2;

  return (
    <div
      className="flex items-center justify-center gap-2 mt-2"
      title={`Volume: ${Math.round(volume * 100)}%`}
    >
      <VolumeIcon className="h-4 w-4 text-zinc-500" aria-hidden="true" />
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={handleVolumeChange}
        className="w-24 h-1 accent-zinc-600 cursor-pointer"
        aria-label={`Volume: ${Math.round(volume * 100)}%`}
      />
    </div>
  );
}
