import api from "./client";

const wrap = async (promise) => {
    try {
        const { data } = await promise;
        return [data, null];
    } catch (err) {
        return [null, err.response?.data?.error ?? err.message ?? "Something went wrong"];
    }
};

export const getYTMAuthUrl        = ()   => wrap(api.get("/ytmusic/auth-url"));
export const getYTMStatus         = ()   => wrap(api.get("/ytmusic/status"));
export const disconnectYTM        = ()   => wrap(api.delete("/ytmusic/disconnect"));
export const getYTMPlaylists      = ()   => wrap(api.get("/ytmusic/playlists"));
export const getYTMPlaylistTracks = (id) => wrap(api.get(`/ytmusic/playlist/${id}`));
export const getYTMSubscriptions  = ()   => wrap(api.get("/ytmusic/subscriptions"));
