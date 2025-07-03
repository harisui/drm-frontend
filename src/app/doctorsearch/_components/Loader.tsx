import React from 'react';

const Loader: React.FC = () => (
    <div className="flex justify-center items-center w-full h-full py-8">
        <svg
            className="animate-spin"
            style={{ width: 120, height: 120 }}
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Loading"
        >
            <defs>
                <linearGradient id="loader-gradient" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#9fd6fb" />
                    <stop offset="80%" stopColor="#f3f7e7" />
                </linearGradient>
            </defs>
            <circle
                cx="50"
                cy="50"
                r="40"
                stroke="url(#loader-gradient)"
                strokeWidth="20"
                strokeLinecap="round"
                fill="none"
                strokeDasharray={Math.PI * 2 * 40 * 0.75}
                strokeDashoffset={Math.PI * 2 * 40 * 0.125}
            />
        </svg>
        <span className="sr-only">Loading...</span>
    </div>
);

export default Loader; 