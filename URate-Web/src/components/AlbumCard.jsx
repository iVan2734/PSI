import { memo } from "react";
import "./AlbumCard.css";

function AlbumCard({ album, onClick }) {
    return (
        <div className="album-card" onClick={onClick}>
            <div className="album-art-wrap">
                {album.cover_medium
                    ? <img src={album.cover_medium} alt={album.title} className="album-art" loading="lazy" decoding="async" width="250" height="250" />
                    : <div className="album-art-placeholder" />
                }
            </div>
            <div className="album-info">
                <span className="album-title">{album.title}</span>
                <span className="album-artist">{album.artist.name}</span>
                {album.nb_tracks != null && (
                    <span className="album-meta">{album.nb_tracks} tracks</span>
                )}
            </div>
        </div>
    );
}

export default memo(AlbumCard);
