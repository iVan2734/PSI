import { useState } from "react";
import "./RatingWidget.css";

export default function RatingWidget({ value, onChange }) {
    const [hovered, setHovered] = useState(null);

    const display = hovered !== null ? hovered : value;

    return (
        <div className="rating-widget">
            <div className="rating-label">
                <span>Rate</span>
                {value !== null && (
                    <span className="rating-selected-val">{value} / 10</span>
                )}
            </div>
            <div className="rating-numbers">
                {Array.from({ length: 11 }, (_, i) => (
                    <button
                        key={i}
                        className={[
                            "rating-btn",
                            display !== null && i <= display ? "rating-btn--lit" : "",
                            value === i ? "rating-btn--selected" : "",
                        ].join(" ")}
                        onClick={() => onChange(value === i ? null : i)}
                        onMouseEnter={() => setHovered(i)}
                        onMouseLeave={() => setHovered(null)}
                        aria-label={`Rate ${i} out of 10`}
                    >
                        {i}
                    </button>
                ))}
            </div>
        </div>
    );
}
