import { useState, useCallback } from "react";
import { allTracks, albums, artists } from "../data/mockData";
import SongCard from "./SongCard";
import "./MyRecommended.css";

const mockRecentTracks = allTracks.slice(0, 20);

export default function MyRecommended({ onTrackClick }) {

    return (
        <div className="myr-content">
            { (
                <section className="search-section">
                    <h2 className="search-section-title">General</h2>
                    <div className="artists-row">
                        {/* -- Songs grid: General Recommendations -- */}
                        {(
                            <div className="song-grid-horizontal-scroll">
                                {mockRecentTracks.map(t => (
                                    <SongCard key={t.id} track={t} onClick={() => onTrackClick(t)} />
                                ))}
                            </div>
                        )}
                    </div>
                </section>
            )}
            { (
                <section className="search-section">
                    <h2 className="search-section-title">Based on your mood</h2>
                    <div className="artists-row">
                        {/* -- Songs grid: Mood -- */}
                        {(
                            <div className="song-grid-horizontal-scroll">
                                {mockRecentTracks.map(t => (
                                    <SongCard key={t.id} track={t} onClick={() => onTrackClick(t)} />
                                ))}
                            </div>
                        )}
                    </div>
                </section>
            )}
            { (
                <section className="search-section">
                    <h2 className="search-section-title">Based on your recent ratings</h2>
                    <div className="artists-row">
                        {/* -- Songs grid: Recent Ratings -- */}
                        {(
                            <div className="song-grid-horizontal-scroll">
                                {mockRecentTracks.map(t => (
                                    <SongCard key={t.id} track={t} onClick={() => onTrackClick(t)} />
                                ))}
                            </div>
                        )}
                    </div>
                </section>
            )}


            
        </div>
    );
}

