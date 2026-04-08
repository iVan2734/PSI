import { memo, useCallback } from "react";
import { useListenList } from "../contexts/ListenListContext";
import "./SongCard.css";

const fmt = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

function SongCard({ track, onClick }) {
    const { toggle, has } = useListenList();
    const inList = has(track.id);

    const community     = track.mockCommunity ?? null;
    const displayGenres = community?.top_genre_tags ?? [];
    const topFeeling    = community?.top_feeling_tags ?? [];
    const hasTags       = displayGenres.length > 0 || topFeeling.length > 0;

    const handleBookmark = useCallback((e) => {
        e.stopPropagation();
        toggle(track);
    }, [toggle, track]);

    return (
        <div className="song-card" onClick={onClick}>
            <div className="song-art-wrap">
                <img
                    src={track.album?.cover_medium}
                    alt={track.album?.title}
                    className="song-art"
                    loading="lazy"
                    decoding="async"
                    width="250"
                    height="250"
                />
                {hasTags && (
                    <div className="song-card-tag-overlay">
                        {displayGenres.map(tag => (
                            <span key={tag} className="song-card-tag song-card-tag--genre">{tag}</span>
                        ))}
                        {topFeeling.map(tag => (
                            <span key={tag} className="song-card-tag song-card-tag--feeling">{tag}</span>
                        ))}
                    </div>
                )}
                <button
                    className={"song-bookmark" + (inList ? " song-bookmark--active" : "")}
                    onClick={handleBookmark}
                    aria-label={inList ? "Remove from listen list" : "Add to listen list"}
                    title={inList ? "Remove from listen list" : "Add to listen list"}
                >
                    <svg viewBox="0 0 24 24" fill={inList ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                    </svg>
                </button>
            </div>
            <div className="song-info">
                <span className="song-title">{track.title}</span>
                <span className="song-artist">{track.artist?.name}</span>
                <div className="song-meta">
                    <span className="song-album">{track.album?.title}</span>
                    <span className="song-duration">{fmt(track.duration)}</span>
                </div>
            </div>
        </div>
    );
}

export default memo(SongCard);
