class SpotifyClient {
  constructor(private accessToken: string) {}

  public async playRandomTrack(
    tracks: SpotifyApi.TrackObjectFull[],
    deviceId: string,
    offset?: number,
  ) {
    const index = Math.floor(Math.random() * tracks.length);
    const track = tracks[index];
    tracks.splice(index, 1); // remove the track so it is not played again
    return this.playTrack(track, deviceId, offset);
  }

  public async playTrack(
    track: SpotifyApi.TrackObjectFull,
    deviceId: string,
    offset?: number,
  ) {
    return fetch(`/api/player/play`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        trackUri: track.uri,
        deviceId,
        positionMs: offset ?? 0,
        accessToken: this.accessToken,
      }),
    });
  }

  public async getPlaylistTracks(
    playlistId: string,
  ): Promise<SpotifyApi.PlaylistTrackObject[]> {
    return fetch(`/api/playlists/${playlistId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        accessToken: this.accessToken,
      }),
    }).then((res) => res.json());
  }
}

export default SpotifyClient;
