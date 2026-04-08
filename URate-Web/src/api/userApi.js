import api from "./client";

const wrap = async (fn) => {
    try   { const { data } = await fn(); return [data, null]; }
    catch (e) { return [null, e.response?.data?.error ?? e.message]; }
};

export const getMe              = ()           => wrap(() => api.get("/users/me"));
export const updateUsername     = (username)   => wrap(() => api.put("/users/me", { username }));
export const requestPasswordChange = (newPassword) =>
    wrap(() => api.post("/users/me/change-password", { newPassword }));
