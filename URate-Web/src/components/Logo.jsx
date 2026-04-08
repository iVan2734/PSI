export default function Logo({ className }) {
    return (
        <svg
            className={className}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 56 36"
            fill="none"
            aria-label="URate"
            role="img"
        >
            {/* U — accent purple */}
            <path
                d="M3 3 L3 22 Q3 33 12.5 33 Q22 33 22 22 L22 3"
                stroke="#8b5cf6"
                strokeWidth="4.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            {/* R — adapts to light/dark mode via currentColor */}
            <path
                d="M28 33 L28 3 L43 3 Q53 3 53 12 Q53 21 43 21 L28 21 M43 21 L53 33"
                stroke="currentColor"
                strokeWidth="4.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
