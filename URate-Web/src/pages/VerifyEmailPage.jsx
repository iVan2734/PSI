import { useEffect, useState } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { verifyEmail } from "../api/authApi";
import { useAuth } from "../contexts/AuthContext";
import "./TokenPage.css";

export default function VerifyEmailPage() {
    const [params]    = useSearchParams();
    const { login }   = useAuth();
    const navigate    = useNavigate();
    const [status, setStatus] = useState("loading");  // loading | ok | error
    const [message, setMessage] = useState("");

    useEffect(() => {
        const token = params.get("token");
        if (!token) { setStatus("error"); setMessage("Missing verification token."); return; }

        verifyEmail(token).then(([data, err]) => {
            if (err) { setStatus("error"); setMessage(err); return; }
            login(data.token, data.user);
            setStatus("ok");
            setTimeout(() => navigate("/"), 2000);
        });
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className="token-page">
            <div className="token-card">
                {status === "loading" && <p className="token-msg">Verifying your email…</p>}
                {status === "ok"      && <p className="token-msg token-msg--ok">Email verified! Redirecting…</p>}
                {status === "error"   && (
                    <>
                        <p className="token-msg token-msg--error">{message}</p>
                        <Link to="/auth" className="token-link">Back to sign in</Link>
                    </>
                )}
            </div>
        </div>
    );
}
