import React from "react";
import { Circle } from "lucide-react";
import "./style.css";

const KeyInsights = () => {
    return (
        <main className="px-8 key-insights">
            <h2 className="reports_heading">Key Insights</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* Insight Card 1 */}
                <div className="border border-[#ADD8FF] rounded-lg p-6  ">
                    <div className="flex items-start mb-3 gap-2">
                        <Circle className="w-4 h-4 mt-1 flex-shrink-0 fill-black" />
                        <h3 className="text-xl font-semibold">Lorem Ipsum</h3>
                    </div>
                    <p className="text-sm text-primary mb-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.</p>
                    <p className="text-primary">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod t</p>
                </div>

                {/* Insight Card 2 */}
                <div className="border border-[#ADD8FF] rounded-lg p-6 ">
                    <div className="flex items-start mb-3 gap-2">
                        <Circle className="w-4 h-4 mt-1 flex-shrink-0 fill-black" />
                        <h3 className="text-xl font-semibold">Lorem Ipsum</h3>
                    </div>
                    <p className="text-sm text-primary mb-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.</p>
                    <p className="text-primary">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod t</p>
                </div>

                {/* Insight Card 3 */}
                <div className="border border-[#ADD8FF] rounded-lg p-6">
                    <div className="flex items-start mb-3 gap-2">
                        <Circle className="w-4 h-4 mt-1 flex-shrink-0 fill-black" />
                        <h3 className="text-xl font-semibold">Lorem Ipsum</h3>
                    </div>
                    <p className="text-primary mb-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.</p>
                    <p className="text-primary text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod t</p>
                </div>
            </div>
        </main>
    )
}

export default KeyInsights;