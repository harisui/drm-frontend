import React from "react";
import "./style.css"
const KeyInsights = () => {
    return (
        <main className="p-8 key-insights">
            <h2 className="reports_heading">Key Insights</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                <div className="border border-[#ADD8FF] rounded-lg p-4 bg-transparent">
                    <h3 className="text-lg font-semibold mb-2">Insight 1</h3>
                    <p className="text-sm">Your first key insight goes here. This could be an important finding or observation.</p>
                </div>
                <div className="border border-[#ADD8FF] rounded-lg p-4 bg-transparent">
                    <h3 className="text-lg font-semibold mb-2">Insight 2</h3>
                    <p className="text-sm">Your second key insight goes here. This could be another important finding or observation.</p>
                </div>
                <div className="border border-[#ADD8FF] rounded-lg p-4 bg-transparent">
                    <h3 className="text-lg font-semibold mb-2">Insight 3</h3>
                    <p className="text-sm">Your third key insight goes here. This could be a final important finding or observation.</p>
                </div>
            </div>
        </main >
    )
}

export default KeyInsights