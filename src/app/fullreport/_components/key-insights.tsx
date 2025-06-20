import React from "react";
import {
    InformationCircleIcon
} from "@heroicons/react/24/solid";
import { Circle } from "lucide-react";
import "./style.css";

interface Insight {
    title: string;
    text: string;
}

const KeyInsights = ({ insights }: { insights: Insight[] }) => {
    return (
        <main className="px-8 key-insights">
            <h2 className="reports_heading">Key Insights</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {insights?.map((insight, index) => (
                    <div key={index} className="border border-[#ADD8FF] rounded-lg p-6">
                    <div className="flex items-center mb-3 gap-2">
                        <Circle className="w-4 h-4 flex-shrink-0 fill-black" />
                            <h3 className="text-xl font-semibold">{insight.title}</h3>
                        </div>
                        <h3 className="text-xl font-semibold">{insight.text}</h3>
                    </div>
                ))}

                {/* Fallback for empty insights */}
                {(!insights || insights.length === 0) && (
                    <div className="border border-[#ADD8FF] rounded-lg p-6 col-span-3">
                        <div className="flex items-center gap-2">
                            <InformationCircleIcon className="w-6 h-6 text-gray-600" />
                            <h3 className="text-xl font-semibold">No insights available</h3>
                        </div>
                    </div>
                )}
            </div>
        </main>
    )
}

export default KeyInsights;