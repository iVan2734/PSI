import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { mockUserProfiles } from "../data/mockData";
import ItemDetail from "../components/ItemDetail";
import "./UserProfilePage.css";

export default function UserProfilePage() {
    const { username } = useParams();
    const navigate = useNavigate();

    const profile = mockUserProfiles.find(p => p.username === username) ?? null;

    const [following, setFollowing] = useState(false);
    const [followerCount, setFollowerCount] = useState(profile?.follower_count ?? 0);
    const [selectedTrack, setSelectedTrack] = useState(null);

    const handleFollow = () => {
        setFollowing(f => {
            setFollowerCount(c => f ? c - 1 : c + 1);
            return !f;
        });
    };

    if (!profile) {
        return (
            <div className="uprofile-not-found">
                <p className="uprofile-not-found-text">User <strong>@{username}</strong> not found.</p>
                <button className="uprofile-back-btn" onClick={() => navigate(-1)}>← Go back</button>
            </div>
        );
    }

    const joinDate = new Date(profile.joined).toLocaleDateString(undefined, { year: "numeric", month: "long" });

    return (
        <div className="uprofile-page">
            {/* -- Hero -- */}
            <div className="uprofile-hero">
                <div className="uprofile-avatar">
                    <img src={profile.avatar} alt={profile.username} />
                </div>

                <div className="uprofile-info">
                    <h1 className="uprofile-username">@{profile.username}</h1>
                    {profile.bio && <p className="uprofile-bio">{profile.bio}</p>}
                    <p className="uprofile-meta">Member since {joinDate}</p>
                    <div className="uprofile-stats">
                        <span><strong>{profile.rating_count}</strong> ratings</span>
                        <span><strong>{followerCount}</strong> followers</span>
                        <span><strong>{profile.following_count}</strong> following</span>
                    </div>
                </div>

                <button
                    className={"uprofile-follow-btn" + (following ? " uprofile-follow-btn--following" : "")}
                    onClick={handleFollow}
                >
                    {following ? "Following" : "Follow"}
                </button>
            </div>

            {/* -- Ratings -- */}
            <div className="uprofile-ratings-section">
                <h2 className="uprofile-section-title">Ratings</h2>
                <div className="uprofile-ratings-grid">
                    {profile.ratings.map((entry) => (
                        <div
                            key={entry.id}
                            className="uprofile-rating-item"
                            onClick={() => setSelectedTrack(entry.track)}
                        >
                            <div className="uprofile-rating-art">
                                <img
                                    src={entry.track.album?.cover_medium}
                                    alt={entry.track.album?.title}
                                    loading="lazy"
                                />
                            </div>
                            <div className="uprofile-rating-info">
                                <span className="uprofile-rating-title">{entry.track.title}</span>
                                <span className="uprofile-rating-artist">{entry.track.artist?.name}</span>
                            </div>
                            <span className="uprofile-rating-badge">{entry.rating}</span>
                        </div>
                    ))}
                </div>
            </div>

            {selectedTrack && (
                <ItemDetail item={selectedTrack} type="music" onClose={() => setSelectedTrack(null)} />
            )}
        </div>
    );
}
