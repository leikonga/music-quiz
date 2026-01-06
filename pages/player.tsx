import { useAuth } from "@components/auth/AuthContext";
import { Title } from "@components/headings";
import { usePlayer } from "@components/player/PlayerContext";
import { SpotifyPlayer } from "@components/player/SpotifyPlayer";
import { PlaylistInput } from "@components/playlists";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Player: NextPage = () => {
  const router = useRouter();
  const { accessToken, setAccessToken, refreshToken, setRefreshToken } =
    useAuth();
  const { spotifyTracks } = usePlayer();

  useEffect(() => {
    if (router.query.access_token && router.query.refresh_token) {
      setAccessToken(router.query.access_token as string);
      setRefreshToken(router.query.refresh_token as string);
    }
  }, [router.query, setAccessToken, setRefreshToken]);

  useEffect(() => {
    if (!refreshToken) {
      return;
    }
    const interval = setInterval(async () => {
      const params = new URLSearchParams({ refreshToken });
      const res = await fetch(`/api/refresh_token?${params.toString()}`);
      const data = await res.json();

      if (data.error || !data.access_token) {
        window.location.href = "/api/login";
        return;
      }

      setAccessToken(data.access_token);
      setRefreshToken(data.refresh_token);
    }, 3000 * 1000); // 50 minutes
    return () => {
      clearInterval(interval);
    };
  }, [refreshToken, setAccessToken, setRefreshToken]);

  useEffect(() => {
    if (accessToken) {
      const { pathname, query } = router;
      query.access_token = accessToken;
      router.replace({
        pathname,
        query: {
          ...query,
        },
      });
    }
  }, [accessToken, router]);

  if (!accessToken || !refreshToken) {
    return (
      <div>
        <Title>An error occurred</Title>
        <p>Your login is invalid</p>
      </div>
    );
  }

  if (spotifyTracks.length === 0) {
    return <PlaylistInput accessToken={accessToken} />;
  }

  return <SpotifyPlayer accessToken={accessToken.toString()} />;
};

export default Player;
