import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { confirmPasswordChange } from "../api/authApi";
import "./TokenPage.css";

export default function ConfirmPasswordPage() {
    const [params] = useSearchParams();
    const [status, setStatus]   = useState("loading");
    const [message, setMessage] = useState("");

    useEffect(() => {
        const token = params.get("token");
        if (!token) { setStatus("error"); setMessage("Missing token."); return; }

        confirmPasswordChange(token).then(([data, err]) => {
            if (err) { setStatus("error"); setMessage(err); return; }
            setStatus("ok"); setMessage(data.message);
        });
    }, []);

    return (
        <div className="token-page">
            <div className="token-card">
                {status === "loading" && <p className="token-msg">Confirming password change…</p>}
                {status === "ok"      && (
                    <>
                        <p className="token-msg token-msg--ok">{message}</p>
                        <Link to="/auth" className="token-link">Sign in with your new password</Link>
                    </>
                )}
                {status === "error" && (
                    <>
                        <p className="token-msg token-msg--error">{message}</p>
                        <Link to="/profile" className="token-link">Back to profile</Link>
                    </>
                )}
            </div>
        </div>
    );
}
