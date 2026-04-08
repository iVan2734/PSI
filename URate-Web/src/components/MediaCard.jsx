import { memo } from "react";
import "./MediaCard.css";

function MediaCard({ item, onClick }) {
    return (
        <div className="media-card" onClick={onClick}>
            <div className="media-poster-wrap">
                {item.poster ? (
                    <img
                        src={item.poster}
                        alt={item.title}
                        className="media-poster"
                        loading="lazy"
                        decoding="async"
                    />
                ) : (
                    <div className="media-no-poster">No Image</div>
                )}
            </div>
            <div className="media-info">
                <span className="media-title">{item.title}</span>
                {item.year && <span className="media-year">{item.year}</span>}
            </div>
        </div>
    );
}

export default memo(MediaCard);
