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
    // const getInsightIcon = (insight: string) => {
    //     const lowerInsight = insight.toLowerCase();
    //     const iconClass = "w-6 h-6 text-white p-1 rounded-md";

    //     if (/experience|years|practice/.test(lowerInsight)) {
    //         return <ClockIcon className={`${iconClass} bg-purple-600`} />;
    //     }
    //     if (/rating|score|reviews/.test(lowerInsight)) {
    //         return <StarIcon className={`${iconClass} bg-amber-500`} />;
    //     }
    //     if (/patient|care|satisfaction/.test(lowerInsight)) {
    //         return <UserIcon className={`${iconClass} bg-emerald-600`} />;
    //     }
    //     if (/technology|equipment|digital/.test(lowerInsight)) {
    //         return <ComputerDesktopIcon className={`${iconClass} bg-blue-600`} />;
    //     }
    //     if (/cost|price|affordable/.test(lowerInsight)) {
    //         return <BanknotesIcon className={`${iconClass} bg-green-600`} />;
    //     }
    //     if (/safety|protocol|standard/.test(lowerInsight)) {
    //         return <ScaleIcon className={`${iconClass} bg-red-600`} />;
    //     }
    //     if (/results|success|improvement/.test(lowerInsight)) {
    //         return <FaceSmileIcon className={`${iconClass} bg-pink-500`} />;
    //     }
    //     if (/care|treatment|procedure/.test(lowerInsight)) {
    //         return <HeartIcon className={`${iconClass} bg-rose-600`} />;
    //     }
    //     return <InformationCircleIcon className={`${iconClass} bg-gray-600`} />;
    // };

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