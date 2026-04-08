import api from "./client";

const wrap = async (promise) => {
    try {
        const { data } = await promise;
        return [data, null];
    } catch (err) {
        return [null, err.response?.data?.error ?? err.message ?? "Something went wrong"];
    }
};

export const getSpotifyAuthUrl  = ()      => wrap(api.get("/spotify/auth-url"));
export const getSpotifyStatus   = ()      => wrap(api.get("/spotify/status"));
export const disconnectSpotify  = ()      => wrap(api.delete("/spotify/disconnect"));
export const getRecentTracks    = ()      => wrap(api.get("/spotify/recent"));
export const getPlaylists       = ()      => wrap(api.get("/spotify/playlists"));
export const getPlaylistTracks  = (id)    => wrap(api.get(`/spotify/playlist/${id}`));
export const getTopTracks       = (range) => wrap(api.get("/spotify/top/tracks",  { params: { range } }));
export const getTopArtists      = (range) => wrap(api.get("/spotify/top/artists", { params: { range } }));
