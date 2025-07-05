"use client";
import React, { useEffect, useState } from "react";

const steps = [
  "We are searching the whole Internet",
  "Scanning the patient sentiment",
  "Aggregating the reviews",
];

const Loader: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev < steps.length ? prev + 1 : prev));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col justify-center items-center w-full h-full min-h-screen py-8 bg-[#EDF3FF]">
      <div className="mb-8">
        <svg
          className="animate-spin"
          style={{ width: 120, height: 120 }}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Loading"
        >
          <defs>
            <linearGradient
              id="loader-gradient"
              x1="0"
              y1="0"
              x2="100"
              y2="100"
              gradientUnits="userSpaceOnUse"
            >
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
      <div className="space-y-4 max-w-[420px] w-full mx-auto">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`flex flex-row items-start gap-2 transition-all duration-500 ${
              index < progress ? "text-black" : "text-gray-300"
            }`}
          >
            <span className="inline-flex w-7 h-7 items-start justify-center pt-1">
              {index < progress ? (
                <svg
                  className="w-7 h-7 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              ) : null}
            </span>
            <span className="text-xl text-left font-medium tracking-wide leading-tight">
              {step}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Loader;
