"use client"
import React, { useEffect, useState } from "react";
import Intro from "./_components/intro";
import KeyInsights from "./_components/key-insights";
import { PatientReviews } from "./_components/patient-reviews";
import Feedback from "./_components/feedback";
import Summary from "./_components/summary";
import FAQs from "./_components/faq";
import Footer from "./_components/footer";

const FullReport = () => {
    const [showExitPopup, setShowExitPopup] = useState(false);
    const [mouseLeaving, setMouseLeaving] = useState(false);

    useEffect(() => {
        // Track mouse leaving top of window
        const handleMouseLeave = (e: MouseEvent) => {
            if (e.clientY < 50) { // If mouse leaves from top
                setMouseLeaving(true);
                setShowExitPopup(true);
            }
        };

        // Handle beforeunload (closing tab/window)
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            if (!showExitPopup) {
                e.preventDefault();
                setShowExitPopup(true);
                return e.returnValue = 'Are you sure you want to leave?';
            }
        };

        // Handle route change
        const handleRouteChange = () => {
            if (!showExitPopup) {
                setShowExitPopup(true);
                return false;
            }
        };

        // Add event listeners
        window.addEventListener('mouseleave', handleMouseLeave);
        window.addEventListener('beforeunload', handleBeforeUnload);
        window.addEventListener('popstate', handleRouteChange);

        return () => {
            window.removeEventListener('mouseleave', handleMouseLeave);
            window.removeEventListener('beforeunload', handleBeforeUnload);
            window.removeEventListener('popstate', handleRouteChange);
        };
    }, [showExitPopup]);

    const handleDownload = () => {
        // Implement your download logic here
        console.log("Downloading report...");
        setShowExitPopup(false);
    };

    const handleContinue = () => {
        setShowExitPopup(false);
        setMouseLeaving(false);
    };

    return (
        <main className="relative">
            {/* Full-screen Overlay Popup - Highest z-index */}
            {showExitPopup && (
                <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
                    <div>
                        <div className="p-8 text-center flex flex-col justify-center h-full">
                            <div className="space-y-6">
                                <p className="text-3xl font-semibold text-white">
                                    Do you want to leave the page <br /> without downloading the report?
                                </p>
                            </div>

                            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                                <button
                                    onClick={handleDownload}
                                    className="px-8 py-3 bg-white hover:bg-blue-700 text-primary font-medium rounded-lg transition-all duration-200 hover:scale-105"
                                >
                                    Download Report
                                </button>
                                <button
                                    onClick={handleContinue}
                                    className="px-8 py-3 bg-transparent border border-gray-300 hover:bg-gray-100/20 text-white font-medium rounded-lg transition-all"
                                >
                                    Continue Reading
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Page Content with space-y-16 and lower z-index */}
            <div className={`space-y-16 transition-opacity duration-300 ${showExitPopup ? 'opacity-30' : 'opacity-100'}`}>
                <div className="bg-[#E5EEFB] pt-20 relative z-0">
                    <Intro />
                </div>
                <div className="px-4 md:px-8">
                    <KeyInsights />
                </div>
                <div className="px-4 md:px-8">
                    <PatientReviews />
                </div>
                <div className="px-4 md:px-8">
                    <Feedback />
                </div>
                <div>
                    <Summary />
                </div>
                <div className="px-4 md:px-8">
                    <FAQs />
                </div>
                <div className="">
                    <Footer />
                </div>
            </div>
        </main>
    )
}

export default FullReport;