import { useState } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { resetPassword } from "../api/authApi";
import "./TokenPage.css";

export default function ResetPasswordPage() {
    const [params]    = useSearchParams();
    const navigate    = useNavigate();
    const [password, setPassword]   = useState("");
    const [confirm, setConfirm]     = useState("");
    const [loading, setLoading]     = useState(false);
    const [error, setError]         = useState("");
    const [success, setSuccess]     = useState("");

    async function handleSubmit(e) {
        e.preventDefault(); setError("");
        if (password !== confirm) { setError("Passwords do not match"); return; }
        setLoading(true);
        const [data, err] = await resetPassword(params.get("token"), password);
        setLoading(false);
        if (err) { setError(err); return; }
        setSuccess(data.message);
        setTimeout(() => navigate("/auth"), 2000);
    }

    return (
        <div className="token-page">
            <div className="token-card">
                <h2 className="token-title">Set New Password</h2>
                {error   && <p className="token-msg token-msg--error">{error}</p>}
                {success && <p className="token-msg token-msg--ok">{success}</p>}
                {!success && (
                    <form className="token-form" onSubmit={handleSubmit}>
                        <label className="token-label">New Password
                            <input className="token-input" type="password" value={password} onChange={e => setPassword(e.target.value)} required minLength={8} />
                        </label>
                        <label className="token-label">Confirm Password
                            <input className="token-input" type="password" value={confirm}  onChange={e => setConfirm(e.target.value)}  required />
                        </label>
                        <button className="token-submit" type="submit" disabled={loading}>
                            {loading ? "Updating…" : "Set Password"}
                        </button>
                        <Link to="/auth" className="token-link">Cancel</Link>
                    </form>
                )}
            </div>
        </div>
    );
}
