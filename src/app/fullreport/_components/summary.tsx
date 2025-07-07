import React from "react";
import { Info } from "lucide-react";

const Summary = ({
  summaryText,
  doctorName,
  rating
}: {
  summaryText: string;
  doctorName: string;
  rating: number;
}) => {
  console.log("rating:", rating);

  // Convert 5-star rating to 10-point scale
  const score = rating ? parseFloat((rating * 2).toFixed(1)) : 0;

  const getScoreColor = (score: number) => {
    if (score >= 9) return 'bg-[#009246]';
    if (score >= 7) return 'bg-[#009246]';
    if (score >= 5) return 'bg-[#E95959]';
    return 'bg-[#FDA15A]';
  };

  return (
    <main className="bg-[#E5EEFB]">
      <div className="p-8">
        <h2 className="reports_heading px-8">Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
          <div className="px-4 mt-5 text-lg text-primary md:px-8 md:col-span-2">
            <p className="text-justify">{summaryText || "No summary available."}</p>
          </div>
          <div className="px-4 md:px-8">
            <h3 className="text-primary text-2xl font-semibold mb-3">
              {doctorName}
            </h3>
            <div className="flex items-center gap-4">
              <div className={`${getScoreColor(score)} text-white rounded-lg w-48 h-20 flex items-center justify-center`}>
                <span className="text-5xl font-bold">{score}</span>
                <span className="mt-4">/10</span>
              </div>
            </div>
            <div className="relative group flex items-center gap-1 mt-2 cursor-pointer">
              <Info className="bg-[#0F152B] text-white rounded-full w-4 h-4 text-primary" />
              <p className="text-sm text-primary">See how we calculate the score</p>

              {/* Tooltip */}
              <div className="absolute left-0 top-8 z-10 hidden w-64 bg-white text-sm text-gray-700 border border-gray-300 rounded-md p-2 shadow-lg group-hover:block">
                33% of the score is based on the share of positive reviews; 67% on the doctor's average rating across top platforms
              </div>
            </div>
          </div>
        </div>
        <div className="mt-2 px-8 py-4">
          <p className="text-sm text-gray-700">
            <span className="font-semibold text-primary">Disclaimer: </span>
            This is not medical advice. Please consult a healthcare professional for any medical concerns.
          </p>
        </div>
      </div>
    </main>
  )
}

export default Summary;