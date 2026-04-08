import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "./NavUser.css";

export default function NavUser() {
    const { user, ready } = useAuth();
    const navigate = useNavigate();

    if (!ready) return null;

    if (!user) {
        return (
            <button className="nav-sign-in" onClick={() => navigate("/auth")}>
                Sign in
            </button>
        );
    }

    return (
        <button className="nav-user" onClick={() => navigate("/profile")} title="Profile">
            <div className="nav-avatar">
                {user.avatar_url
                    ? <img src={user.avatar_url} alt={user.username} />
                    : <span>{user.username[0].toUpperCase()}</span>
                }
            </div>
            <span className="nav-username">{user.username}</span>
        </button>
    );
}
