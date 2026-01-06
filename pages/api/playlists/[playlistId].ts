import { NextApiRequest, NextApiResponse } from "next";

const getPlaylist = async (req: NextApiRequest, res: NextApiResponse) => {
  const { playlistId } = req.query;
  const { accessToken } = req.body;

  const getMorePlaylistTracks = async (
    url: string,
  ): Promise<SpotifyApi.PlaylistTrackObject[]> => {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((res) => res.json());
    if (response.next) {
      return [
        ...response.items,
        ...(await getMorePlaylistTracks(response.next)),
      ];
    }
    return response.items;
  };

  const response = await fetch(
    `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  ).then((res) => res.json());

  if (response.next) {
    const allTracks = [
      ...response.items,
      ...(await getMorePlaylistTracks(response.next)),
    ];
    res.status(200).json(allTracks);
  } else if (response.items) {
    res.status(200).json(response.items);
  } else {
    res.status(response.status || 500).send(response);
  }
};

export default getPlaylist;
