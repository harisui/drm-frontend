import React from "react";
import {
    ClockIcon,
    StarIcon,
    UserIcon,
    ComputerDesktopIcon,
    BanknotesIcon,
    ScaleIcon,
    FaceSmileIcon,
    HeartIcon,
    InformationCircleIcon
} from "@heroicons/react/24/solid";
import { Circle } from "lucide-react";
import "./style.css";

const KeyInsights = ({ insights }: { insights: string[] }) => {

    return (
        <main className="px-8 key-insights">
            <h2 className="reports_heading">Key Insights</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {insights?.map((insight, index) => {
                    const cleanedInsight = insight.replace(/^\d+\.\s*/, '');

                    return (
                        <div key={index} className="border border-[#ADD8FF] rounded-lg p-6">
                            <div className="flex items-start mb-3 gap-2">
                              
                                <h3 className="text-xl font-semibold">{cleanedInsight}</h3>
                            </div>
                        </div>
                    );
                })}


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