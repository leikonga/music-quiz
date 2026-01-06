const BASE_URL = 'https://api.spotify.com/v1'

class SpotifyClient {
    constructor(private accessToken: string) {}

    public async playRandomTrack(tracks: SpotifyApi.TrackObjectFull[], deviceId: string, offset?: number) {
        const index = Math.floor(Math.random() * tracks.length)
        const track = tracks[index]
        tracks.splice(index, 1) // remove the track so it is not played again
        return this.playTrack(track, deviceId, offset)
    }

    public async playTrack(track: SpotifyApi.TrackObjectFull, deviceId: string, offset?: number) {
        return fetch(`/api/player/play`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                trackUri: track.uri,
                deviceId,
                positionMs: offset ?? 0,
                accessToken: this.accessToken,
            }),
        })
    }

    public async getPlaylistTracks(playlistId: string): Promise<SpotifyApi.PlaylistTrackObject[]> {
        return fetch(`/api/playlists/${playlistId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                accessToken: this.accessToken,
            }),
        }).then((res) => res.json())
    }

    private async getMorePlaylistTracks(url: string): Promise<SpotifyApi.PlaylistTrackObject[]> {
        // This method is no longer used, as the logic is now handled by the API route.
        // It's kept here to avoid breaking the interface, but it should be removed in a future refactor.
        return Promise.resolve([])
    }
}

export default SpotifyClient
