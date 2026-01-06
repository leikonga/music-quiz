import { createContext, ReactNode, useContext, useState } from "react";

interface PlayerContextType {
  currentTrack: Spotify.Track | null;
  setCurrentTrack: (track: Spotify.Track | null) => void;
  revealed: boolean;
  setRevealed: (revealed: boolean) => void;
  startTime: number;
  setStartTime: (time: number) => void;
  spotifyTracks: SpotifyApi.TrackObjectFull[];
  setSpotifyTracks: (tracks: SpotifyApi.TrackObjectFull[]) => void;
}

const PlayerContext = createContext<PlayerContextType>({
  currentTrack: null,
  setCurrentTrack: () => {},
  revealed: false,
  setRevealed: () => {},
  startTime: 0,
  setStartTime: () => {},
  spotifyTracks: [],
  setSpotifyTracks: () => {},
});

export const PlayerProvider = ({ children }: { children: ReactNode }) => {
  const [currentTrack, setCurrentTrack] = useState<Spotify.Track | null>(null);
  const [revealed, setRevealed] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<number>(0);
  const [spotifyTracks, setSpotifyTracks] = useState<
    SpotifyApi.TrackObjectFull[]
  >([]);

  return (
    <PlayerContext.Provider
      value={{
        currentTrack,
        setCurrentTrack,
        revealed,
        setRevealed,
        startTime,
        setStartTime,
        spotifyTracks,
        setSpotifyTracks,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => useContext(PlayerContext);
