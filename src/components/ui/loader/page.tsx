"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);

  const steps = [
    "We are searching the whole Internet",
    "Scanning the patient sentiment",
    "Aggregating the reviews",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev < steps.length ? prev + 1 : prev));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#EDF3FF] p-4">
      <div className="w-48 h-48 mb-8 relative animate-spin">
        <Image
          src="/spinner.png"
          alt="Loading spinner"
          width={192}
          height={192}
          priority
        />
      </div>

      <div className="space-y-4 max-w-[420px] w-full mx-auto">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`flex items-center justify-center gap-2 transition-all duration-500 ${
              index < progress ? "text-black" : "text-gray-300"
            }`}
          >
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
            ) : (
              <div className="w-7 h-7 shrink-0" />
            )}
            <span className="text-xl text-left font-medium tracking-wide">
              {step}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
