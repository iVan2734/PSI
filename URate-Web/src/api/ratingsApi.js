import api from "./client";

const wrap = async (fn) => {
    try   { const { data } = await fn(); return [data, null]; }
    catch (e) { return [null, e.response?.data?.error ?? e.message]; }
};

export const getMyRatings       = ()              => wrap(() => api.get("/ratings"));
export const getMyRating        = (trackId)       => wrap(() => api.get(`/ratings/${trackId}`));
export const upsertRating       = (trackId, body) => wrap(() => api.put(`/ratings/${trackId}`, body));
export const deleteRating       = (trackId)       => wrap(() => api.delete(`/ratings/${trackId}`));
export const getCommunityRating = (trackId)       => wrap(() => api.get(`/ratings/community/${trackId}`));
export const seedReviews        = (trackId, body) => wrap(() => api.post(`/admin/seed-reviews/${trackId}`, body));
