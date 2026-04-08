import "./MediaCard.css";

export default function MediaCardSkeleton() {
    return (
        <div className="media-card-skeleton">
            <div className="media-skeleton-poster" />
            <div className="media-info">
                <div className="media-skeleton-line media-skeleton-title" />
                <div className="media-skeleton-line media-skeleton-year" />
            </div>
        </div>
    );
}
