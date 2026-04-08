import { memo } from "react";
import "./ArtistCard.css";

function ArtistCard({ artist, onClick }) {
    return (
        <button className="artist-card" onClick={onClick} type="button">
            <div className="artist-avatar-wrap">
                {artist.picture_medium
                    ? <img src={artist.picture_medium} alt={artist.name} className="artist-avatar" loading="lazy" decoding="async" width="120" height="120" />
                    : <div className="artist-avatar-placeholder"><span>{artist.name[0]}</span></div>
                }
            </div>
            <span className="artist-name">{artist.name}</span>
        </button>
    );
}

export default memo(ArtistCard);
