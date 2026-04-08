import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { allTracks, MOCK_FOLLOWERS, MOCK_FOLLOWING } from "../data/mockData";
import { useListenList } from "../contexts/ListenListContext";
import ItemDetail from "../components/ItemDetail";
import "./ProfilePage.css";

const PREVIEW_MSG = "This is a preview — changes will be available once the backend is connected.";

const MOCK_USER = {
    username:     "demo_user",
    email:        "demo@urate.app",
    created_at:   "2024-01-15T00:00:00Z",
    rating_count: 12,
};

const MOCK_RATINGS = allTracks.slice(0, 12).map((t, i) => ({
    id:          `rating-${t.id}`,
    track_id:    t.id,
    track_title: t.title,
    artist_name: t.artist.name,
    album_title: t.album.title,
    cover_url:   t.album.cover_medium,
    rating:      [7, 8, 9, 6, 8, 10, 7, 9, 8, 7, 6, 9][i % 12],
}));

// -- Followers / Following user row ---------------------------------------------

function SocialUserRow({ user, defaultFollowing = false }) {
    const navigate = useNavigate();
    const [following, setFollowing] = useState(defaultFollowing);
    return (
        <div className="pf-user-row">
            <button
                className="pf-user-btn"
                onClick={() => user.hasProfile && navigate(`/user/${user.username}`)}
                style={{ cursor: user.hasProfile ? "pointer" : "default" }}
            >
                <img src={user.avatar} alt={user.username} className="pf-user-avatar" loading="lazy" />
                <span className="pf-user-name">@{user.username}</span>
            </button>
            <button
                className={"pf-follow-pill" + (following ? " pf-follow-pill--following" : "")}
                onClick={() => setFollowing(f => !f)}
            >
                {following ? "Following" : "Follow"}
            </button>
        </div>
    );
}

// -- Main component -------------------------------------------------------------

export default function ProfilePage() {
    const navigate = useNavigate();
    const { list: listenList, remove: removeFromList } = useListenList();

    const [activeTab, setActiveTab] = useState("ratings");

    // Settings state
    const [newUsername, setNewUsername] = useState(MOCK_USER.username);
    const [usernameMsg, setUsernameMsg] = useState(null);
    const [newPassword, setNewPassword] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const [passMsg, setPassMsg]         = useState(null);

    const [selectedTrack, setSelectedTrack] = useState(null);

    const joinDate = new Date(MOCK_USER.created_at).toLocaleDateString(undefined, { year: "numeric", month: "long" });

    function handleUsernameSubmit(e) {
        e.preventDefault();
        setUsernameMsg({ type: "ok", text: PREVIEW_MSG });
    }

    function handlePasswordSubmit(e) {
        e.preventDefault();
        setPassMsg({ type: "ok", text: PREVIEW_MSG });
        setNewPassword(""); setConfirmPass("");
    }

    const ratingToTrack = (r) => ({
        id:           r.track_id,
        title:        r.track_title,
        duration:     allTracks.find(t => t.id === r.track_id)?.duration ?? null,
        artist:       { name: r.artist_name },
        album:        { title: r.album_title, cover_medium: r.cover_url, cover_big: r.cover_url, cover_xl: r.cover_url },
        mockCommunity: allTracks.find(t => t.id === r.track_id)?.mockCommunity ?? null,
    });

    const TABS = [
        { id: "ratings",   label: "Ratings",     count: MOCK_RATINGS.length },
        { id: "listen",    label: "Listen List",  count: listenList.length },
        { id: "followers", label: "Followers",    count: MOCK_FOLLOWERS.length },
        { id: "following", label: "Following",    count: MOCK_FOLLOWING.length },
        { id: "settings",  label: "Settings",     count: null },
    ];

    return (
        <div className="profile-page">

            {/* -- Hero -- */}
            <div className="profile-hero">
                <div className="profile-avatar">
                    <span>{MOCK_USER.username[0].toUpperCase()}</span>
                </div>

                <div className="profile-hero-info">
                    <h1 className="profile-username">{MOCK_USER.username}</h1>
                    <p className="profile-email">{MOCK_USER.email}</p>
                    <p className="profile-meta">Member since {joinDate}</p>
                    <div className="profile-stats">
                        <button className="profile-stat" onClick={() => setActiveTab("ratings")}>
                            <strong>{MOCK_USER.rating_count}</strong> ratings
                        </button>
                        <button className="profile-stat" onClick={() => setActiveTab("followers")}>
                            <strong>{MOCK_FOLLOWERS.length}</strong> followers
                        </button>
                        <button className="profile-stat" onClick={() => setActiveTab("following")}>
                            <strong>{MOCK_FOLLOWING.length}</strong> following
                        </button>
                    </div>
                </div>

                <button className="profile-logout" onClick={() => {}}>Sign out</button>
            </div>

            {/* -- Main card -- */}
            <div className="profile-card">

                {/* Tab bar */}
                <div className="profile-tabs">
                    {TABS.map(t => (
                        <button
                            key={t.id}
                            className={"profile-tab" + (activeTab === t.id ? " active" : "")}
                            onClick={() => setActiveTab(t.id)}
                        >
                            {t.label}
                            {t.count !== null && (
                                <span className="profile-tab-count">{t.count}</span>
                            )}
                        </button>
                    ))}
                </div>

                <div className="profile-tab-body">

                    {/* -- Ratings -- */}
                    {activeTab === "ratings" && (
                        <div className="profile-list">
                            {MOCK_RATINGS.map((r) => (
                                <div key={r.id} className="profile-list-row" onClick={() => setSelectedTrack(ratingToTrack(r))}>
                                    <div className="profile-list-art">
                                        <img src={r.cover_url} alt={r.album_title} loading="lazy" />
                                    </div>
                                    <div className="profile-list-info">
                                        <span className="profile-list-title">{r.track_title}</span>
                                        <span className="profile-list-sub">{r.artist_name}</span>
                                    </div>
                                    <span className="profile-rating-badge">{r.rating}</span>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* -- Listen list -- */}
                    {activeTab === "listen" && (
                        listenList.length === 0 ? (
                            <p className="profile-empty">No songs yet — bookmark songs while browsing to add them here.</p>
                        ) : (
                            <div className="profile-list">
                                {listenList.map((track) => (
                                    <div key={track.id} className="profile-list-row">
                                        <div className="profile-list-art" onClick={() => setSelectedTrack(track)} style={{ cursor: "pointer" }}>
                                            <img src={track.album?.cover_medium} alt={track.album?.title} loading="lazy" />
                                        </div>
                                        <div className="profile-list-info" onClick={() => setSelectedTrack(track)} style={{ cursor: "pointer" }}>
                                            <span className="profile-list-title">{track.title}</span>
                                            <span className="profile-list-sub">{track.artist?.name}</span>
                                        </div>
                                        <button
                                            className="profile-remove-btn"
                                            onClick={() => removeFromList(track.id)}
                                            title="Remove"
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )
                    )}

                    {/* -- Followers -- */}
                    {activeTab === "followers" && (
                        <div className="profile-user-list">
                            {MOCK_FOLLOWERS.map(u => (
                                <SocialUserRow key={u.username} user={u} defaultFollowing={MOCK_FOLLOWING.some(f => f.username === u.username)} />
                            ))}
                        </div>
                    )}

                    {/* -- Following -- */}
                    {activeTab === "following" && (
                        <div className="profile-user-list">
                            {MOCK_FOLLOWING.map(u => (
                                <SocialUserRow key={u.username} user={u} defaultFollowing={true} />
                            ))}
                        </div>
                    )}

                    {/* -- Settings -- */}
                    {activeTab === "settings" && (
                        <div className="profile-settings">

                            <div className="profile-settings-block">
                                <div className="profile-settings-label">Username</div>
                                <div className="profile-settings-desc">This is how other users see you on URate.</div>
                                <form className="profile-settings-row" onSubmit={handleUsernameSubmit}>
                                    <input
                                        className="profile-settings-input"
                                        type="text"
                                        value={newUsername}
                                        onChange={e => { setNewUsername(e.target.value); setUsernameMsg(null); }}
                                        minLength={3} maxLength={30}
                                        required
                                    />
                                    <button
                                        className="profile-settings-btn"
                                        type="submit"
                                        disabled={newUsername === MOCK_USER.username}
                                    >
                                        Save
                                    </button>
                                </form>
                                {usernameMsg && (
                                    <p className={"profile-settings-msg profile-settings-msg--" + usernameMsg.type}>{usernameMsg.text}</p>
                                )}
                            </div>

                            <div className="profile-settings-divider" />

                            <div className="profile-settings-block">
                                <div className="profile-settings-label">Change Password</div>
                                <div className="profile-settings-desc">A confirmation link will be sent to <strong>{MOCK_USER.email}</strong> before the change takes effect.</div>
                                <form className="profile-settings-col" onSubmit={handlePasswordSubmit}>
                                    <input
                                        className="profile-settings-input"
                                        type="password"
                                        placeholder="New password"
                                        value={newPassword}
                                        onChange={e => { setNewPassword(e.target.value); setPassMsg(null); }}
                                        minLength={8}
                                        required
                                    />
                                    <input
                                        className="profile-settings-input"
                                        type="password"
                                        placeholder="Confirm new password"
                                        value={confirmPass}
                                        onChange={e => { setConfirmPass(e.target.value); setPassMsg(null); }}
                                        required
                                    />
                                    <button className="profile-settings-btn profile-settings-btn--full" type="submit">
                                        Send Confirmation Email
                                    </button>
                                </form>
                                {passMsg && (
                                    <p className={"profile-settings-msg profile-settings-msg--" + passMsg.type}>{passMsg.text}</p>
                                )}
                            </div>

                        </div>
                    )}

                </div>
            </div>

            {selectedTrack && (
                <ItemDetail item={selectedTrack} type="music" onClose={() => setSelectedTrack(null)} />
            )}
        </div>
    );
}
