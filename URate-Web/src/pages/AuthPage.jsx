import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../components/Logo";
import "./AuthPage.css";

const PREVIEW_MSG = "This is a preview — authentication will be available once the backend is connected.";

export default function AuthPage() {
    const [tab, setTab]       = useState("login");
    const [success, setSuccess] = useState("");

    // Form fields
    const [email, setEmail]       = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm]   = useState("");
    const [agreedToTerms, setAgreedToTerms] = useState(false);

    // Forgot password
    const [showForgot, setShowForgot]   = useState(false);
    const [forgotEmail, setForgotEmail] = useState("");

    const switchTab = (t) => { setTab(t); setSuccess(""); setAgreedToTerms(false); };

    function handleLogin(e) {
        e.preventDefault();
        setSuccess(PREVIEW_MSG);
    }

    function handleRegister(e) {
        e.preventDefault();
        setSuccess(PREVIEW_MSG);
    }

    function handleForgot(e) {
        e.preventDefault();
        setSuccess(PREVIEW_MSG);
        setShowForgot(false);
    }

    return (
        <div className="auth-page">
            <div className="auth-card">
                <Logo className="auth-logo" />

                {!showForgot ? (
                    <>
                        <div className="auth-tabs">
                            <button className={`auth-tab ${tab === "login" ? "active" : ""}`}    onClick={() => switchTab("login")}>Sign In</button>
                            <button className={`auth-tab ${tab === "register" ? "active" : ""}`} onClick={() => switchTab("register")}>Register</button>
                        </div>

                        {success && <p className="auth-success">{success}</p>}

                        {tab === "login" ? (
                            <form className="auth-form" onSubmit={handleLogin}>
                                <label className="auth-label">Email or Username
                                    <input className="auth-input" type="text" value={email} onChange={e => setEmail(e.target.value)} required autoComplete="username" />
                                </label>
                                <label className="auth-label">Password
                                    <input className="auth-input" type="password" value={password} onChange={e => setPassword(e.target.value)} required autoComplete="current-password" />
                                </label>
                                <button className="auth-submit" type="submit">Sign In</button>
                                <button type="button" className="auth-link" onClick={() => setShowForgot(true)}>
                                    Forgot password?
                                </button>
                            </form>
                        ) : (
                            <form className="auth-form" onSubmit={handleRegister}>
                                <label className="auth-label">Email
                                    <input className="auth-input" type="email" value={email} onChange={e => setEmail(e.target.value)} required autoComplete="email" />
                                </label>
                                <label className="auth-label">Username
                                    <input className="auth-input" type="text" value={username} onChange={e => setUsername(e.target.value)} required minLength={3} maxLength={30} autoComplete="username" />
                                </label>
                                <label className="auth-label">Password
                                    <input className="auth-input" type="password" value={password} onChange={e => setPassword(e.target.value)} required minLength={8} autoComplete="new-password" />
                                </label>
                                <label className="auth-label">Confirm Password
                                    <input className="auth-input" type="password" value={confirm} onChange={e => setConfirm(e.target.value)} required autoComplete="new-password" />
                                </label>
                                <label className="auth-agree-label">
                                    <input
                                        type="checkbox"
                                        className="auth-agree-checkbox"
                                        checked={agreedToTerms}
                                        onChange={e => setAgreedToTerms(e.target.checked)}
                                    />
                                    <span>
                                        I agree to the{" "}
                                        <Link to="/terms" target="_blank" className="auth-legal-link">Terms of Service</Link>
                                        {" "}and{" "}
                                        <Link to="/privacy" target="_blank" className="auth-legal-link">Privacy Policy</Link>
                                    </span>
                                </label>
                                <button className="auth-submit" type="submit" disabled={!agreedToTerms}>
                                    Create Account
                                </button>
                            </form>
                        )}
                    </>
                ) : (
                    <>
                        <h2 className="auth-forgot-title">Reset Password</h2>
                        <p className="auth-forgot-sub">Enter your email and we'll send you a reset link.</p>
                        {success && <p className="auth-success">{success}</p>}
                        <form className="auth-form" onSubmit={handleForgot}>
                            <label className="auth-label">Email
                                <input className="auth-input" type="email" value={forgotEmail} onChange={e => setForgotEmail(e.target.value)} required autoComplete="email" />
                            </label>
                            <button className="auth-submit" type="submit">Send Reset Link</button>
                            <button type="button" className="auth-link" onClick={() => setShowForgot(false)}>
                                Back to sign in
                            </button>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
}
