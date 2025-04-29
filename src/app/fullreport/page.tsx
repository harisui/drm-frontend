import React from "react";
import Intro from "./_components/intro";
import KeyInsights from "./_components/key-insights";
import PatientReviews from "./_components/patient-reviews";
import Feedback from "./_components/feedback";
import Summary from "./_components/summary";
import FAQs from "./_components/faq";
import Footer from "./_components/footer";

const FullReport = () => {
    return (
        <main className="space-y-16">
            <div className="bg-[#E5EEFB] pt-20">
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
        </main>
    )
}

export default FullReport