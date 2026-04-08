import "./SongCard.css";

export default function SongCardSkeleton() {
    return (
        <div className="song-card song-card-skeleton">
            <div className="skeleton-art" />
            <div className="song-info">
                <div className="skeleton-line skeleton-title" />
                <div className="skeleton-line skeleton-artist" />
                <div className="skeleton-line skeleton-album" />
            </div>
        </div>
    );
}
