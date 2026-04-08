import api from "./client";

const wrap = async (fn) => {
    try   { const { data } = await fn(); return [data, null]; }
    catch (e) { return [null, e.response?.data?.error ?? e.message]; }
};

export const register          = (email, username, password) =>
    wrap(() => api.post("/auth/register",   { email, username, password }));

export const login             = (email, password) =>
    wrap(() => api.post("/auth/login",      { email, password }));

export const verifyEmail       = (token) =>
    wrap(() => api.post("/auth/verify-email",        { token }));

export const resendVerification = (email) =>
    wrap(() => api.post("/auth/resend-verification", { email }));

export const googleAuth        = (credential) =>
    wrap(() => api.post("/auth/google",     { credential }));

export const forgotPassword    = (email) =>
    wrap(() => api.post("/auth/forgot-password",  { email }));

export const resetPassword     = (token, newPassword) =>
    wrap(() => api.post("/auth/reset-password",   { token, newPassword }));

export const confirmPasswordChange = (token) =>
    wrap(() => api.post("/auth/confirm-password-change", { token }));
