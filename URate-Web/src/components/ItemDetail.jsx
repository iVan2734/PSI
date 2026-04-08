import { useEffect, useState, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getMockReviews } from "../data/mockData";
import { useListenList } from "../contexts/ListenListContext";
import RatingWidget from "./RatingWidget";
import "./ItemDetail.css";

const fmtDuration  = (s) => s != null ? `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}` : null;

function parseTimestamp(str) {
    if (!str?.trim()) return null;
    const m = str.match(/^(\d{1,3}):([0-5]\d)$/);
    return m ? parseInt(m[1], 10) * 60 + parseInt(m[2], 10) : null;
}

function timestampStatus(str, duration) {
    if (!str?.trim()) return "hint";
    const secs = parseTimestamp(str);
    if (secs === null) return "invalid";
    if (duration != null && secs > duration) return "overflow";
    return "ok";
}

function toTitleCase(str) {
    return str.trim().replace(/\b\w/g, c => c.toUpperCase());
}

function validateCustomInput(str) {
    const cleaned = str?.trim() ?? "";
    if (!cleaned) return null;
    if (!/^[a-zA-Z\s]+$/.test(cleaned)) return null;
    if (cleaned.length > 30) return null;
    return toTitleCase(cleaned);
}

const GENRE_TAGS = [
    "Pop","Rock","Hip-Hop","R&B","Electronic","Jazz","Classical","Country",
    "Latin","Metal","Indie","Folk","Soul","Blues","Reggae","Punk",
    "Alternative","Dance","Ambient","Soundtrack",
];
const FEELING_TAGS = [
    "Energetic","Sad","Happy","Melancholic","Chill","Aggressive","Romantic",
    "Nostalgic","Dark","Uplifting","Anxious","Peaceful","Emotional","Hype","Dreamy",
];

// -- Community review card ------------------------------------------------------

function ReviewCard({ review }) {
    const navigate = useNavigate();
    const [votes, setVotes] = useState({ likes: review.likes, dislikes: review.dislikes, mine: null });

    const vote = (type) => {
        setVotes(prev => {
            if (prev.mine === type) return { ...prev, [type]: prev[type] - 1, mine: null };
            const next = { ...prev, [type]: prev[type] + 1, mine: type };
            if (prev.mine) next[prev.mine] = prev[prev.mine] - 1;
            return next;
        });
    };

    return (
        <div className="review-card">
            <div className="review-header">
                <button className="review-user" onClick={() => navigate(`/user/${review.user.username}`)}>
                    <img src={review.user.avatar} alt={review.user.username} className="review-avatar" loading="lazy" />
                    <span className="review-username">{review.user.username}</span>
                </button>
                <span className="review-rating-badge">{review.rating}/10</span>
            </div>

            {(review.genre_tags.length > 0 || review.feeling_tags.length > 0) && (
                <div className="review-tags">
                    {review.genre_tags.map(t => (
                        <span key={t} className="review-tag review-tag--genre">{t}</span>
                    ))}
                    {review.feeling_tags.map(t => (
                        <span key={t} className="review-tag review-tag--feeling">{t}</span>
                    ))}
                </div>
            )}

            <p className="review-comment">"{review.comment}"</p>

            <div className="review-votes">
                <button
                    className={"review-vote-btn" + (votes.mine === "likes" ? " review-vote-btn--active" : "")}
                    onClick={() => vote("likes")}
                    aria-label="Like this review"
                >
                    <svg viewBox="0 0 20 20" fill={votes.mine === "likes" ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M7 10V18H3a1 1 0 01-1-1v-6a1 1 0 011-1h4zm0 0l3-8a2 2 0 012 2v3h5a1 1 0 011 1l-1.5 6A1 1 0 0119.5 14H7" />
                    </svg>
                    {votes.likes}
                </button>
                <button
                    className={"review-vote-btn" + (votes.mine === "dislikes" ? " review-vote-btn--active review-vote-btn--dislike" : "")}
                    onClick={() => vote("dislikes")}
                    aria-label="Dislike this review"
                >
                    <svg viewBox="0 0 20 20" fill={votes.mine === "dislikes" ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M13 10V2h4a1 1 0 011 1v6a1 1 0 01-1 1h-4zm0 0l-3 8a2 2 0 01-2-2v-3H3a1 1 0 01-1-1l1.5-6A1 1 0 014.5 6H13" />
                    </svg>
                    {votes.dislikes}
                </button>
            </div>
        </div>
    );
}

// -- Main component -------------------------------------------------------------

export default function ItemDetail({ item, type, onClose }) {
    const { toggle, has } = useListenList();
    const inList = has(item.id);

    const community = item.mockCommunity ?? null;
    const reviews   = type === "music" ? getMockReviews(String(item.id)) : [];

    const [rating, setRating]                       = useState(null);
    const [genreTags, setGenreTags]                 = useState([]);
    const [feelingTags, setFeelingTags]             = useState([]);
    const [customGenreTags, setCustomGenreTags]     = useState([]);
    const [customFeelingTags, setCustomFeelingTags] = useState([]);
    const [comment, setComment]                     = useState("");
    const [timestamp, setTimestamp]                 = useState("");
    const [customGenreInput, setCustomGenreInput]   = useState("");
    const [customFeelingInput, setCustomFeelingInput] = useState("");
    const [customGenreInputErr, setCustomGenreInputErr]   = useState("");
    const [customFeelingInputErr, setCustomFeelingInputErr] = useState("");

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => { document.body.style.overflow = ""; };
    }, []);

    useEffect(() => {
        const h = (e) => { if (e.key === "Escape") onClose(); };
        window.addEventListener("keydown", h);
        return () => window.removeEventListener("keydown", h);
    }, [onClose]);

    const stateRef = useRef({});
    stateRef.current = { rating, genreTags, feelingTags, customGenreTags, customFeelingTags };

    const handleRatingChange = useCallback((newVal) => {
        setRating(newVal);
        if (newVal === null) {
            setGenreTags([]); setFeelingTags([]);
            setCustomGenreTags([]); setCustomFeelingTags([]);
            setComment(""); setTimestamp("");
        }
    }, []);

    const handleTagToggle = useCallback((tagType, tagValue) => {
        if (stateRef.current.rating === null) return;
        if (tagType === "genre") {
            setGenreTags(prev => prev.includes(tagValue) ? prev.filter(t => t !== tagValue) : [...prev, tagValue]);
        } else if (tagType === "feeling") {
            setFeelingTags(prev => prev.includes(tagValue) ? prev.filter(t => t !== tagValue) : [...prev, tagValue]);
        } else if (tagType === "custom_genre") {
            setCustomGenreTags(prev => prev.includes(tagValue) ? prev.filter(t => t !== tagValue) : [...prev, tagValue]);
        } else if (tagType === "custom_feeling") {
            setCustomFeelingTags(prev => prev.includes(tagValue) ? prev.filter(t => t !== tagValue) : [...prev, tagValue]);
        }
    }, []);

    const handleAddCustomGenreTag = useCallback(() => {
        const valid = validateCustomInput(customGenreInput);
        if (!valid) { setCustomGenreInputErr(/^[a-zA-Z\s]+$/.test(customGenreInput.trim()) ? "Tag too long (max 30 characters)" : "Letters and spaces only"); return; }
        if (stateRef.current.customGenreTags.includes(valid)) { setCustomGenreInputErr("Already added"); return; }
        if (stateRef.current.customGenreTags.length >= 10)    { setCustomGenreInputErr("Maximum 10 custom tags"); return; }
        setCustomGenreInputErr(""); setCustomGenreInput("");
        setCustomGenreTags(prev => [...prev, valid]);
    }, [customGenreInput]);

    const handleAddCustomFeelingTag = useCallback(() => {
        const valid = validateCustomInput(customFeelingInput);
        if (!valid) { setCustomFeelingInputErr(/^[a-zA-Z\s]+$/.test(customFeelingInput.trim()) ? "Tag too long (max 30 characters)" : "Letters and spaces only"); return; }
        if (stateRef.current.customFeelingTags.includes(valid)) { setCustomFeelingInputErr("Already added"); return; }
        if (stateRef.current.customFeelingTags.length >= 10)    { setCustomFeelingInputErr("Maximum 10 custom tags"); return; }
        setCustomFeelingInputErr(""); setCustomFeelingInput("");
        setCustomFeelingTags(prev => [...prev, valid]);
    }, [customFeelingInput]);

    const tsStatus   = timestampStatus(timestamp, item.duration);
    const tsHintText = tsStatus === "invalid"  ? "invalid format"
                     : tsStatus === "overflow" ? `exceeds song duration (${fmtDuration(item.duration)})`
                     : "MM:SS — recommend a moment to listen to";

    const isMusic   = type === "music";
    const heroImg   = isMusic
        ? (item.album?.cover_xl ?? item.album?.cover_big ?? item.album?.cover_medium)
        : (item.backdrop ?? item.poster);
    const posterImg = isMusic
        ? (item.album?.cover_big ?? item.album?.cover_medium)
        : item.poster;

    return (
        <div className="detail-overlay" onClick={onClose} role="dialog" aria-modal="true">
            <div className="detail-modal" onClick={(e) => e.stopPropagation()}>

                {heroImg && (
                    <div className="detail-hero">
                        <img src={heroImg} alt="" className="detail-hero-img" aria-hidden="true" />
                        <div className="detail-hero-fade" />
                    </div>
                )}

                <button className="detail-close" onClick={onClose} aria-label="Close">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                        <path d="M18 6 6 18M6 6l12 12" />
                    </svg>
                </button>

                <div className={`detail-body ${heroImg ? "detail-body--overlap" : ""}`}>
                    {posterImg && (
                        <div className={`detail-poster-wrap ${isMusic ? "detail-poster-wrap--square" : ""}`}>
                            <img src={posterImg} alt={item.title} className="detail-poster" />
                        </div>
                    )}

                    <div className="detail-info">
                        <div className="detail-title-row">
                            <h2 className="detail-title">{item.title}</h2>
                            {isMusic && (
                                <button
                                    className={"detail-listen-btn" + (inList ? " detail-listen-btn--active" : "")}
                                    onClick={() => toggle(item)}
                                    title={inList ? "Remove from listen list" : "Add to listen list"}
                                >
                                    <svg viewBox="0 0 24 24" fill={inList ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                                    </svg>
                                    {inList ? "In Listen List" : "Add to List"}
                                </button>
                            )}
                        </div>

                        {isMusic && (
                            <>
                                <p className="detail-subtitle">{item.artist?.name}</p>
                                <div className="detail-tags">
                                    {item.album?.title && <span className="detail-tag">{item.album.title}</span>}
                                    {item.duration != null && <span className="detail-tag">{fmtDuration(item.duration)}</span>}
                                </div>

                                {community?.count > 0 && (
                                    <>
                                        <p className="detail-community">
                                            Community: <strong>{community.average}</strong>/10
                                            <span className="detail-community-count"> ({community.count} rating{community.count !== 1 ? "s" : ""})</span>
                                        </p>
                                        {(community.top_genre_tags?.length > 0 || community.top_feeling_tags?.length > 0) && (
                                            <div className="detail-community-tags">
                                                {community.top_genre_tags?.length > 0 && (
                                                    <div className="detail-community-tag-row">
                                                        <span className="detail-community-tag-label">Genre</span>
                                                        {community.top_genre_tags.map(tag => (
                                                            <span key={tag} className="detail-community-tag">{tag}</span>
                                                        ))}
                                                    </div>
                                                )}
                                                {community.top_feeling_tags?.length > 0 && (
                                                    <div className="detail-community-tag-row">
                                                        <span className="detail-community-tag-label">Feeling</span>
                                                        {community.top_feeling_tags.map(tag => (
                                                            <span key={tag} className="detail-community-tag">{tag}</span>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </>
                                )}
                            </>
                        )}

                        {!isMusic && (
                            <>
                                <div className="detail-tags">
                                    {item.year && <span className="detail-tag">{item.year}</span>}
                                    {item.voteAverage > 0 && (
                                        <span className="detail-tag detail-tag--star">★ {item.voteAverage.toFixed(1)}</span>
                                    )}
                                </div>
                                {item.overview && <p className="detail-overview">{item.overview}</p>}
                            </>
                        )}

                        {type === "music" && (
                            <div>
                                <RatingWidget value={rating} onChange={handleRatingChange} />

                                {rating !== null && (
                                    <div className="detail-annotations">

                                        {/* Genre */}
                                        <div className="detail-annot-section">
                                            <span className="detail-annot-label">Genre</span>
                                            <div className="detail-pill-row">
                                                {GENRE_TAGS.map(tag => (
                                                    <button key={tag}
                                                        className={`detail-pill${genreTags.includes(tag) ? " detail-pill--on" : ""}`}
                                                        onClick={() => handleTagToggle("genre", tag)}
                                                    >{tag}</button>
                                                ))}
                                            </div>
                                            {customGenreTags.length > 0 && (
                                                <div className="detail-pill-row">
                                                    {customGenreTags.map(tag => (
                                                        <button key={tag}
                                                            className="detail-pill detail-pill--on detail-pill--removable"
                                                            onClick={() => setCustomGenreTags(prev => prev.filter(t => t !== tag))}
                                                            title="Click to remove"
                                                        >
                                                            {tag}
                                                            <svg className="detail-pill-remove" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                                                <path d="M9 3 3 9M3 3l6 6"/>
                                                            </svg>
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                            <div className="detail-custom-input-row">
                                                <input
                                                    className={`detail-custom-input${customGenreInputErr ? " detail-custom-input--error" : ""}`}
                                                    placeholder="Custom genre…"
                                                    value={customGenreInput}
                                                    onChange={(e) => { setCustomGenreInput(e.target.value); setCustomGenreInputErr(""); }}
                                                    onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); handleAddCustomGenreTag(); } }}
                                                    maxLength={32}
                                                />
                                                <button className="detail-custom-add" onClick={handleAddCustomGenreTag}>Add</button>
                                            </div>
                                            {customGenreInputErr && <span className="detail-custom-err">{customGenreInputErr}</span>}
                                        </div>

                                        {/* Feeling */}
                                        <div className="detail-annot-section">
                                            <span className="detail-annot-label">Feeling</span>
                                            <div className="detail-pill-row">
                                                {FEELING_TAGS.map(tag => (
                                                    <button key={tag}
                                                        className={`detail-pill${feelingTags.includes(tag) ? " detail-pill--on" : ""}`}
                                                        onClick={() => handleTagToggle("feeling", tag)}
                                                    >{tag}</button>
                                                ))}
                                            </div>
                                            {customFeelingTags.length > 0 && (
                                                <div className="detail-pill-row">
                                                    {customFeelingTags.map(tag => (
                                                        <button key={tag}
                                                            className="detail-pill detail-pill--on detail-pill--removable"
                                                            onClick={() => setCustomFeelingTags(prev => prev.filter(t => t !== tag))}
                                                            title="Click to remove"
                                                        >
                                                            {tag}
                                                            <svg className="detail-pill-remove" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                                                <path d="M9 3 3 9M3 3l6 6"/>
                                                            </svg>
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                            <div className="detail-custom-input-row">
                                                <input
                                                    className={`detail-custom-input${customFeelingInputErr ? " detail-custom-input--error" : ""}`}
                                                    placeholder="Custom feeling…"
                                                    value={customFeelingInput}
                                                    onChange={(e) => { setCustomFeelingInput(e.target.value); setCustomFeelingInputErr(""); }}
                                                    onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); handleAddCustomFeelingTag(); } }}
                                                    maxLength={32}
                                                />
                                                <button className="detail-custom-add" onClick={handleAddCustomFeelingTag}>Add</button>
                                            </div>
                                            {customFeelingInputErr && <span className="detail-custom-err">{customFeelingInputErr}</span>}
                                        </div>

                                        {/* Comment */}
                                        <div className="detail-annot-section">
                                            <span className="detail-annot-label">Comment</span>
                                            <textarea
                                                className="detail-comment"
                                                placeholder="Add a note about this song…"
                                                value={comment}
                                                onChange={(e) => setComment(e.target.value)}
                                                rows={3}
                                            />
                                        </div>

                                        {/* Timestamp */}
                                        <div className="detail-annot-section detail-annot-section--row">
                                            <span className="detail-annot-label">Timestamp</span>
                                            <input
                                                className={`detail-timestamp-input${tsStatus === "invalid" || tsStatus === "overflow" ? " detail-timestamp-input--error" : tsStatus === "ok" ? " detail-timestamp-input--ok" : ""}`}
                                                placeholder="1:40"
                                                value={timestamp}
                                                onChange={(e) => setTimestamp(e.target.value)}
                                                maxLength={7}
                                            />
                                            <span className={`detail-timestamp-hint${tsStatus === "invalid" || tsStatus === "overflow" ? " detail-timestamp-hint--error" : ""}`}>
                                                {tsHintText}
                                            </span>
                                        </div>

                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* -- Community reviews -- */}
                {reviews.length > 0 && (
                    <div className="detail-reviews">
                        <h3 className="detail-reviews-title">Community Reviews</h3>
                        <div className="detail-reviews-list">
                            {reviews.map(r => <ReviewCard key={r.id} review={r} />)}
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}
