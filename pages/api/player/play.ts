import { NextApiRequest, NextApiResponse } from "next";

const playTrack = async (req: NextApiRequest, res: NextApiResponse) => {
  const { deviceId, trackUri, positionMs, accessToken } = req.body;

  const response = await fetch(
    `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uris: [trackUri],
        position_ms: positionMs ?? 0,
      }),
    },
  );

  if (response.ok) {
    res.status(204).send(undefined);
  } else {
    res.status(response.status).send(await response.json());
  }
};

export default playTrack;
