import { useState, useEffect, useCallback, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getTracks, searchAll, getAlbum } from "../api/musicApi";
import { useDebounce } from "../hooks/useDebounce";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";
import SongCard from "../components/SongCard";
import SongCardSkeleton from "../components/SongCardSkeleton";
import AlbumCard from "../components/AlbumCard";
import ArtistCard from "../components/ArtistCard";
import AlbumView from "../components/AlbumView";
import ItemDetail from "../components/ItemDetail";
import MyMusic from "../components/MyMusic";
import MyRecommended from "../components/MyRecommended";
import "./MusicPage.css";

const SKELETON_COUNT = 20;
const skeletons = Array.from({ length: SKELETON_COUNT }, (_, i) => i);

export default function MusicPage() {
    const location = useLocation();
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState("recommend");

    // Handle ?spotify= OAuth redirect params (preview: just switch tab)
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        if (params.get("spotify") || params.get("ytmusic")) {
            setActiveTab("my-music");
            navigate("/", { replace: true });
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const [searchInput, setSearchInput] = useState("");
    const query = useDebounce(searchInput, 400);
    const activeQuery = useRef(query);

    // -- Trending (no query) --------------------------------------------
    const [trendingTracks, setTrendingTracks] = useState([]);
    const [trendingPage, setTrendingPage] = useState(0);
    const [trendingHasMore, setTrendingHasMore] = useState(true);
    const [trendingLoading, setTrendingLoading] = useState(false);
    const [trendingInitialLoad, setTrendingInitialLoad] = useState(true);
    const [trendingError, setTrendingError] = useState(null);

    // -- Search results (with query) ------------------------------------
    const [searchResults, setSearchResults] = useState(null);
    const [searchLoading, setSearchLoading] = useState(false);
    const [searchError, setSearchError] = useState(null);

    // -- Album drill-down -----------------------------------------------
    const [albumData, setAlbumData] = useState(null);
    const [albumLoading, setAlbumLoading] = useState(false);
    const [albumError, setAlbumError] = useState(null);
    const [pendingAlbum, setPendingAlbum] = useState(null);

    // -- Track detail ---------------------------------------------------
    const [selectedTrack, setSelectedTrack] = useState(null);

    // -- Trending fetch -------------------------------------------------
    const fetchTrendingPage = useCallback(async (pageNum) => {
        setTrendingLoading(true);
        setTrendingError(null);
        const [data, err] = await getTracks("", pageNum);
        setTrendingLoading(false);
        setTrendingInitialLoad(false);

        if (err || !data) { setTrendingError(err ?? "Something went wrong"); return; }

        setTrendingTracks((prev) => pageNum === 0 ? data.tracks : [...prev, ...data.tracks]);
        setTrendingHasMore(data.hasMore);
        setTrendingPage(pageNum);
    }, []);

    useEffect(() => { fetchTrendingPage(0); }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const loadMoreTrending = useCallback(() => {
        if (!trendingLoading && trendingHasMore) fetchTrendingPage(trendingPage + 1);
    }, [trendingLoading, trendingHasMore, trendingPage, fetchTrendingPage]);

    const sentinelRef = useInfiniteScroll(loadMoreTrending, trendingHasMore && !trendingLoading && !trendingInitialLoad && !query);

    // -- Search fetch ---------------------------------------------------
    useEffect(() => {
        if (activeQuery.current === query) return;
        activeQuery.current = query;

        if (!query) {
            setSearchResults(null);
            setSearchError(null);
            setAlbumData(null);
            return;
        }

        setAlbumData(null);
        setSearchResults(null);
        setSearchLoading(true);
        setSearchError(null);

        searchAll(query).then(([data, err]) => {
            if (query !== activeQuery.current) return;
            setSearchLoading(false);
            if (err || !data) { setSearchError(err ?? "Something went wrong"); return; }
            setSearchResults(data);
        });
    }, [query]);

    // -- Album open -----------------------------------------------------
    const openAlbum = useCallback((album) => {
        setPendingAlbum(album);
        setAlbumData(null);
        setAlbumLoading(true);
        setAlbumError(null);

        getAlbum(album.id).then(([data, err]) => {
            setAlbumLoading(false);
            if (err || !data) { setAlbumError(err ?? "Something went wrong"); return; }
            setAlbumData(data);
        });
    }, []);

    const closeAlbum = useCallback(() => {
        setAlbumData(null);
        setPendingAlbum(null);
        setAlbumError(null);
    }, []);

    const onArtistClick = useCallback((artist) => {
        setSearchInput(artist.name);
    }, []);

    // -- Derived state --------------------------------------------------
    const showAlbumView    = !!(albumLoading || albumData || albumError);
    const showSearchView   = !!query && !showAlbumView;
    const showTrendingView = !query && !showAlbumView;

    return (
        <div className="music-page">
            <div className="music-header">
                <h1 className="music-heading">Music</h1>
                {activeTab === "discover" && <div className="search-bar">
                    <svg className="search-icon" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                        <circle cx="8.5" cy="8.5" r="5.5" stroke="currentColor" strokeWidth="1.8" />
                        <path d="M13 13l3.5 3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    </svg>
                    <input
                        className="search-input"
                        type="search"
                        placeholder="Search songs, artists, albums…"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        autoComplete="off"
                    />
                    {searchInput && (
                        <button className="search-clear" onClick={() => setSearchInput("")} aria-label="Clear search">×</button>
                    )}
                </div>}
            </div>

            {/* -- Page tab bar -- */}
            <div className="music-page-tabs">
                <button
                    className={"music-page-tab" + (activeTab === "recommend" ? " active" : "")}
                    onClick={() => setActiveTab("recommend")}
                >
                    Recommended
                </button>
                <button
                    className={"music-page-tab" + (activeTab === "discover" ? " active" : "")}
                    onClick={() => setActiveTab("discover")}
                >
                    Discover
                </button>
                <button
                    className={"music-page-tab" + (activeTab === "my-music" ? " active" : "")}
                    onClick={() => setActiveTab("my-music")}
                >
                    My Music
                </button>
            </div>
            
            {/* -- Recommend tab -- */}
            {activeTab === "recommend" && (
                <MyRecommended onTrackClick={setSelectedTrack} />
            )}

            {/* -- My Music tab -- */}
            {activeTab === "my-music" && (
                <MyMusic onTrackClick={setSelectedTrack} />
            )}

            {/* -- Discover tab -- */}
            {activeTab === "discover" && (<>

            {/* -- Album drill-down -- */}
            {showAlbumView && (
                <AlbumView
                    album={albumData?.album ?? pendingAlbum}
                    tracks={albumData?.tracks ?? []}
                    loading={albumLoading}
                    error={albumError}
                    onBack={closeAlbum}
                    onTrackClick={setSelectedTrack}
                />
            )}

            {/* -- Search results -- */}
            {showSearchView && (
                <div className="search-results">
                    {searchLoading && (
                        <div className="search-skeleton">
                            <div className="search-section-skeleton">
                                <div className="skeleton-label" />
                                <div className="artists-row">
                                    {Array.from({ length: 6 }, (_, i) => (
                                        <div key={i} className="artist-skeleton">
                                            <div className="artist-skeleton-avatar" />
                                            <div className="skeleton-line" style={{ width: 60, height: 11 }} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="search-section-skeleton">
                                <div className="skeleton-label" />
                                <div className="albums-grid">
                                    {Array.from({ length: 6 }, (_, i) => <SongCardSkeleton key={i} />)}
                                </div>
                            </div>
                        </div>
                    )}

                    {searchError && <p className="error-msg">{searchError}</p>}

                    {searchResults && (
                        <>
                            {searchResults.artists.length > 0 && (
                                <section className="search-section">
                                    <h2 className="search-section-title">Artists</h2>
                                    <div className="artists-row">
                                        {searchResults.artists.map((artist) => (
                                            <ArtistCard key={artist.id} artist={artist} onClick={() => onArtistClick(artist)} />
                                        ))}
                                    </div>
                                </section>
                            )}

                            {searchResults.albums.length > 0 && (
                                <section className="search-section">
                                    <h2 className="search-section-title">Albums</h2>
                                    <div className="albums-grid">
                                        {searchResults.albums.map((album) => (
                                            <AlbumCard key={album.id} album={album} onClick={() => openAlbum(album)} />
                                        ))}
                                    </div>
                                </section>
                            )}

                            {searchResults.tracks.length > 0 && (
                                <section className="search-section">
                                    <h2 className="search-section-title">Songs</h2>
                                    <div className="songs-grid">
                                        {searchResults.tracks.map((track) => (
                                            <SongCard key={track.id} track={track} onClick={() => setSelectedTrack(track)} />
                                        ))}
                                    </div>
                                </section>
                            )}

                            {!searchResults.artists.length && !searchResults.albums.length && !searchResults.tracks.length && (
                                <p className="end-label">No results found for "{query}"</p>
                            )}
                        </>
                    )}
                </div>
            )}

            {/* -- Trending -- */}
            {showTrendingView && (
                <>
                    <p className="section-label">Trending</p>
                    {trendingError && <p className="error-msg">{trendingError}</p>}
                    <div className="songs-grid">
                        {trendingInitialLoad
                            ? skeletons.map((i) => <SongCardSkeleton key={i} />)
                            : trendingTracks.map((track) => (
                                <SongCard key={track.id} track={track} onClick={() => setSelectedTrack(track)} />
                              ))
                        }
                        {!trendingInitialLoad && trendingLoading &&
                            skeletons.slice(0, 8).map((i) => <SongCardSkeleton key={`more-${i}`} />)
                        }
                    </div>
                    {!trendingLoading && !trendingHasMore && trendingTracks.length > 0 && (
                        <p className="end-label">You've reached the end</p>
                    )}
                    <div ref={sentinelRef} className="scroll-sentinel" aria-hidden="true" />
                </>
            )}

            </>)}  {/* end Discover tab */}

            {selectedTrack && (
                <ItemDetail item={selectedTrack} type="music" onClose={() => setSelectedTrack(null)} />
            )}
        </div>
    );
}
