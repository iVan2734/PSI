import { useState, useCallback } from "react";
import { allTracks, albums, artists } from "../data/mockData";
import SongCard from "./SongCard";
import SongCardSkeleton from "./SongCardSkeleton";
import "./MyMusic.css";

const SKELETONS = Array.from({ length: 20 }, (_, i) => i);

const TIME_RANGES = [
    { value: "short_term",  label: "4 weeks" },
    { value: "medium_term", label: "6 months" },
    { value: "long_term",   label: "All time" },
];

// -- Mock data shaped to match the real API responses --------------------------

const mockRecentTracks = allTracks.slice(0, 20);

const mockPlaylists = albums.map(a => ({
    id: a.id,
    name: a.title,
    cover: a.cover_medium,
    track_count: a.nb_tracks,
    source: "spotify",
}));

const mockTopTracks = [...allTracks].sort((a, b) =>
    (b.mockCommunity?.count ?? 0) - (a.mockCommunity?.count ?? 0)
).slice(0, 20);

const mockTopArtists = artists.map(a => ({
    id: a.id,
    name: a.name,
    cover: a.picture_medium,
    genres: albums.find(al => al.artist.id === a.id)?.genres ?? [],
}));

const playlistTracksMap = Object.fromEntries(
    albums.map(a => [a.id, allTracks.filter(t => t.album.id === a.id)])
);

// -- Component -----------------------------------------------------------------

export default function MyMusic({ onTrackClick }) {
    const [section,   setSection]   = useState("recent");
    const [timeRange, setTimeRange] = useState("medium_term");

    // Playlist drill-down
    const [openPlaylist, setOpenPlaylist] = useState(null);

    const openPlaylistView = useCallback((pl) => {
        setOpenPlaylist(pl);
    }, []);

    const showTimeRange = section === "top-tracks" || section === "top-artists";

    const SECTIONS = [
        { id: "recent",      label: "Recent" },
        { id: "playlists",   label: "Playlists" },
        { id: "top-tracks",  label: "Top Tracks" },
        { id: "top-artists", label: "Top Artists" },
    ];

    const plTracks = openPlaylist ? (playlistTracksMap[openPlaylist.id] ?? []) : [];

    return (
        <div className="mym-content">
            {/* -- "Connected" status strip -- */}
            <div className="mym-banner mym-banner-spotify" style={{ pointerEvents: "none" }}>
                <SpotifyIconSmall /> Connected to Spotify
            </div>

            {/* -- Navigation -- */}
            <div className="mym-nav">
                <div className="mym-tabs">
                    {SECTIONS.map(s => (
                        <button
                            key={s.id}
                            className={"mym-tab" + (section === s.id ? " active" : "")}
                            onClick={() => { setSection(s.id); setOpenPlaylist(null); }}
                        >
                            {s.label}
                        </button>
                    ))}
                </div>
                <div className="mym-nav-right">
                    <span className="mym-powered-by">
                        <SpotifyIconSmall /> Powered by Spotify
                    </span>
                    <div className="mym-disconnect-group">
                        <button className="mym-disconnect-btn" onClick={() => {}}>
                            Disconnect Spotify
                        </button>
                    </div>
                </div>
            </div>

            {/* -- Time range (top tracks / artists) -- */}
            {showTimeRange && (
                <div className="mym-ranges">
                    {TIME_RANGES.map(r => (
                        <button
                            key={r.value}
                            className={"mym-range-btn" + (timeRange === r.value ? " active" : "")}
                            onClick={() => setTimeRange(r.value)}
                        >
                            {r.label}
                        </button>
                    ))}
                </div>
            )}

            {/* -- Playlist drill-down -- */}
            {section === "playlists" && openPlaylist && (
                <div>
                    <button className="mym-back-btn" onClick={() => setOpenPlaylist(null)}>
                        ← {openPlaylist.name}
                    </button>
                    <div className="songs-grid">
                        {plTracks.map(t => (
                            <SongCard key={t.id} track={t} onClick={() => onTrackClick(t)} />
                        ))}
                    </div>
                </div>
            )}

            {/* -- Playlists grid -- */}
            {section === "playlists" && !openPlaylist && (
                <div className="mym-playlists-grid">
                    {mockPlaylists.map(p => (
                        <div key={p.id} className="mym-playlist-card" onClick={() => openPlaylistView(p)}>
                            <div className="mym-playlist-cover-wrap">
                                {p.cover ? (
                                    <img src={p.cover} alt={p.name} className="mym-playlist-cover" loading="lazy" decoding="async" />
                                ) : (
                                    <div className="mym-playlist-cover-placeholder"><span>♪</span></div>
                                )}
                                <div className="mym-playlist-badge spotify">
                                    <SpotifyIconSmall />
                                </div>
                            </div>
                            <div className="mym-playlist-info">
                                <span className="mym-playlist-name">{p.name}</span>
                                <span className="mym-playlist-count">{p.track_count} songs</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* -- Songs grid: recent -- */}
            {section === "recent" && (
                <div className="songs-grid">
                    {mockRecentTracks.map(t => (
                        <SongCard key={t.id} track={t} onClick={() => onTrackClick(t)} />
                    ))}
                </div>
            )}

            {/* -- Songs grid: top-tracks -- */}
            {section === "top-tracks" && (
                <div className="songs-grid">
                    {mockTopTracks.map(t => (
                        <SongCard key={t.id} track={t} onClick={() => onTrackClick(t)} />
                    ))}
                </div>
            )}

            {/* -- Artists grid -- */}
            {section === "top-artists" && (
                <div className="mym-artists-grid">
                    {mockTopArtists.map(a => (
                        <div key={a.id} className="mym-artist-card">
                            <div className="mym-artist-img-wrap">
                                {a.cover ? (
                                    <img src={a.cover} alt={a.name} className="mym-artist-img" loading="lazy" decoding="async" />
                                ) : (
                                    <div className="mym-artist-img-placeholder" />
                                )}
                            </div>
                            <span className="mym-artist-name">{a.name}</span>
                            {a.genres[0] && <span className="mym-artist-genre">{a.genres[0]}</span>}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

// -- SVG logos & icons -------------------------------------------------------

function SpotifyLogo({ size = 72 }) {
    return (
        <div className="mym-spotify-full-logo" style={{ "--logo-size": `${size}px` }}>
            <svg className="mym-spotify-icon" viewBox="0 0 168 168" aria-hidden="true">
                <circle cx="84" cy="84" r="84" fill="#1DB954" />
                <path d="M120.1 117.8c-1.6 2.5-4.9 3.3-7.4 1.8-20.2-12.3-45.6-15.1-75.5-8.3-2.9.7-5.7-1.1-6.4-4-.7-2.9 1.1-5.7 4-6.4 32.8-7.5 60.9-4.3 83.6 9.6 2.4 1.4 3.2 4.8 1.7 7.3zm9.8-20.9c-2 3.1-6.1 4.1-9.2 2.1-23.1-14.2-58.3-18.3-85.6-10-3.3 1-6.8-.9-7.8-4.2-1-3.3.9-6.8 4.2-7.8 31.2-9.5 70-4.9 96.4 11.4 3.1 1.9 4.2 6 2 9.1zm.9-21.8c-27.7-16.5-73.4-18-99.8-9.9-4.1 1.2-8.4-1.1-9.6-5.2-1.2-4.1 1.1-8.4 5.2-9.6 30.4-9.2 80.9-7.5 112.8 11.4 3.7 2.2 4.9 7 2.7 10.7-2.2 3.7-7 4.9-10.7 2.7z" fill="white" />
            </svg>
            <span className="mym-spotify-wordmark">Spotify</span>
        </div>
    );
}

function SpotifyIconSmall() {
    return (
        <svg className="mym-spotify-icon-sm" viewBox="0 0 168 168" aria-label="Spotify">
            <circle cx="84" cy="84" r="84" fill="#1DB954" />
            <path d="M120.1 117.8c-1.6 2.5-4.9 3.3-7.4 1.8-20.2-12.3-45.6-15.1-75.5-8.3-2.9.7-5.7-1.1-6.4-4-.7-2.9 1.1-5.7 4-6.4 32.8-7.5 60.9-4.3 83.6 9.6 2.4 1.4 3.2 4.8 1.7 7.3zm9.8-20.9c-2 3.1-6.1 4.1-9.2 2.1-23.1-14.2-58.3-18.3-85.6-10-3.3 1-6.8-.9-7.8-4.2-1-3.3.9-6.8 4.2-7.8 31.2-9.5 70-4.9 96.4 11.4 3.1 1.9 4.2 6 2 9.1zm.9-21.8c-27.7-16.5-73.4-18-99.8-9.9-4.1 1.2-8.4-1.1-9.6-5.2-1.2-4.1 1.1-8.4 5.2-9.6 30.4-9.2 80.9-7.5 112.8 11.4 3.7 2.2 4.9 7 2.7 10.7-2.2 3.7-7 4.9-10.7 2.7z" fill="white" />
        </svg>
    );
}
