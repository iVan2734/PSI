import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ListenListProvider } from "./contexts/ListenListContext";
import MusicPage          from "./pages/MusicPage";
import MoviesPage         from "./pages/MoviesPage";
import ShowsPage          from "./pages/ShowsPage";
import AuthPage           from "./pages/AuthPage";
import ProfilePage        from "./pages/ProfilePage";
import UserProfilePage    from "./pages/UserProfilePage";
import PrivacyPolicyPage  from "./pages/PrivacyPolicyPage";
import TermsPage          from "./pages/TermsPage";
import Logo               from "./components/Logo";
import NavUser            from "./components/NavUser";
import "./App.css";

function AppShell() {
    return (
        <div id="app-shell">
            <nav className="nav">
                <Logo className="nav-logo" />
                <div className="nav-links">
                    <NavLink to="/"       end className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>Music</NavLink>
                    <NavLink to="/movies"     className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>Movies</NavLink>
                    <NavLink to="/shows"      className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>Shows</NavLink>
                </div>
                <NavUser />
            </nav>

            <main className="main-content">
                <Routes>
                    <Route path="/"              element={<MusicPage />} />
                    <Route path="/movies"        element={<MoviesPage />} />
                    <Route path="/shows"         element={<ShowsPage />} />
                    <Route path="/auth"          element={<AuthPage />} />
                    <Route path="/profile"       element={<ProfilePage />} />
                    <Route path="/user/:username" element={<UserProfilePage />} />
                    <Route path="/privacy"       element={<PrivacyPolicyPage />} />
                    <Route path="/terms"         element={<TermsPage />} />
                </Routes>
            </main>
        </div>
    );
}

export default function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <ListenListProvider>
                    <AppShell />
                </ListenListProvider>
            </AuthProvider>
        </BrowserRouter>
    );
}
