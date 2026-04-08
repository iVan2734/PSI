import { memo } from "react";
import "./AlbumView.css";

const fmt = (s) => s != null ? `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}` : "";

function AlbumView({ album, tracks, loading, error, onBack, onTrackClick }) {
    const year = album?.release_date ? new Date(album.release_date).getFullYear() : null;

    return (
        <div className="album-view">
            <button className="album-view-back" onClick={onBack} type="button">
                <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" width="18" height="18">
                    <path d="M12.5 5l-5 5 5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Back to results
            </button>

            {loading && !album && (
                <div className="album-view-hero skeleton-hero">
                    <div className="skeleton-cover" />
                    <div className="album-hero-info">
                        <div className="skeleton-line" style={{ width: "60%", height: 28, marginBottom: 12 }} />
                        <div className="skeleton-line" style={{ width: "40%", height: 16, marginBottom: 8 }} />
                        <div className="skeleton-line" style={{ width: "30%", height: 14 }} />
                    </div>
                </div>
            )}

            {error && <p className="error-msg">{error}</p>}

            {album && (
                <>
                    <div className="album-view-hero">
                        <div className="album-cover-wrap">
                            {album.cover_big
                                ? <img src={album.cover_big} alt={album.title} className="album-cover" width="300" height="300" />
                                : <div className="album-cover-placeholder" />
                            }
                        </div>
                        <div className="album-hero-info">
                            <p className="album-type-label">Album</p>
                            <h2 className="album-hero-title">{album.title}</h2>
                            <p className="album-hero-artist">{album.artist.name}</p>
                            <p className="album-hero-meta">
                                {[year, album.nb_tracks ? `${album.nb_tracks} tracks` : null, album.genres?.[0]]
                                    .filter(Boolean).join(" · ")}
                            </p>
                        </div>
                    </div>

                    <div className="album-tracklist">
                        <div className="tracklist-header">
                            <span className="track-col-num">#</span>
                            <span className="track-col-title">Title</span>
                            <span className="track-col-duration">
                                <svg viewBox="0 0 16 16" fill="none" width="14" height="14" aria-hidden="true">
                                    <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.4" />
                                    <path d="M8 5v3.5l2 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                                </svg>
                            </span>
                        </div>

                        {loading && tracks.length === 0
                            ? Array.from({ length: 10 }, (_, i) => (
                                <div key={i} className="track-row track-row-skeleton">
                                    <span className="track-col-num" />
                                    <div className="track-skeleton-lines">
                                        <div className="skeleton-line" style={{ width: "55%", height: 13 }} />
                                        <div className="skeleton-line" style={{ width: "35%", height: 11, marginTop: 5 }} />
                                    </div>
                                    <span className="track-col-duration" />
                                </div>
                              ))
                            : tracks.map((track) => (
                                <div
                                    key={track.id}
                                    className="track-row"
                                    onClick={() => onTrackClick?.(track)}
                                    role="button"
                                    tabIndex={0}
                                    onKeyDown={(e) => e.key === "Enter" && onTrackClick?.(track)}
                                >
                                    <span className="track-col-num">{track.track_position}</span>
                                    <div className="track-col-info">
                                        <span className="track-title">{track.title}</span>
                                        <span className="track-artist">{track.artist.name}</span>
                                    </div>
                                    <span className="track-col-duration">{fmt(track.duration)}</span>
                                </div>
                              ))
                        }
                    </div>
                </>
            )}
        </div>
    );
}

export default memo(AlbumView);
