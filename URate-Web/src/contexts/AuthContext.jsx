import { createContext, useContext } from "react";

const AuthContext = createContext(null);

// Stub provider — no backend, no auth. Always returns a null user.
export function AuthProvider({ children }) {
    return (
        <AuthContext.Provider value={{ user: null, ready: true, login: () => {}, logout: () => {}, refreshUser: () => {} }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
