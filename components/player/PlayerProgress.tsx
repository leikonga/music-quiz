import { useEffect, useState } from "react";

interface PlayerProgressProps {
  playerState: Spotify.PlaybackState;
  player: Spotify.Player;
}

function pad(num: number, places: number): string {
  return String(num).padStart(places, "0");
}

export default function PlayerProgress(props: PlayerProgressProps) {
  const [time, setTime] = useState(
    Math.floor(props.playerState.position / 1000),
  );
  const [maxTime, setMaxTime] = useState(
    Math.floor(props.playerState.duration / 1000),
  );

  useEffect(() => {
    const interval = setInterval(async () => {
      const state = await props.player.getCurrentState();
      if (state) {
        setTime(Math.floor(state.position / 1000));
        setMaxTime(Math.floor(state.duration / 1000));
      }
    }, 500);
    return () => {
      clearInterval(interval);
    };
  }, [props.player]);

  const remainingTime = () => {
    return maxTime - time;
  };

  const timeString = () => {
    return `${Math.floor(time / 60)}:${pad(time % 60, 2)}`;
  };

  const remainingTimeString = () => {
    return `${Math.floor(remainingTime() / 60)}:${pad(remainingTime() % 60, 2)}`;
  };

  const progressPercent = maxTime > 0 ? (time / maxTime) * 100 : 0;

  return (
    <div className="flex flex-row m-3 items-center">
      <p className="px-3 custom-mono text-sm">{timeString()}</p>
      <div className="relative flex flex-start bg-slate-200/40 w-full h-1.5 rounded-full group">
        <div
          className="h-full bg-black rounded-full transition-all"
          style={{ width: `${progressPercent}%` }}
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-black rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ left: `calc(${progressPercent}% - 6px)` }}
          aria-hidden="true"
        />
      </div>
      <p className="px-3 custom-mono text-sm">-{remainingTimeString()}</p>
    </div>
  );
}
