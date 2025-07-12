"use client";
import React from "react";
import { Download, Heart } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { paymentPageUrlRenderer } from "@/services/helper";
import { useRouter } from "next/navigation";

interface FooterProps {
    onDownload: () => void;
    isGeneratingPDF: boolean;
}

const Footer = ({ onDownload, isGeneratingPDF }: FooterProps) => {
    const { wishlistItems, removeFromWishlist } = useWishlist();
    const router = useRouter();

    const getScoreColor = (score: number) => {
        if (score >= 9) return "bg-[#009246]";
        if (score >= 7) return "bg-[#009246]";
        if (score >= 5) return "bg-[#E95959]";
        return "bg-[#FDA15A]";
    };

    return (
        <footer className="bg-[#0F152B] py-8 px-4">
            {/* Buttons Section */}
            <div className="flex flex-col items-center gap-4">
                <button className="bg-white px-6 py-5 text-xl font-semibold rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out">
                    Scan Another Doctor
                </button>

                <button
                    onClick={onDownload}
                    className="flex items-center gap-2 px-5 py-3 text-white border border-gray-300 bg-white/10 rounded-md backdrop-blur-sm hover:bg-white/20 hover:border-white transition-all duration-300"
                >
                    <Download size={22} />
                    <span>{isGeneratingPDF ? "Generating..." : "Download Report"}</span>
                </button>
            </div>

            {/* Previously Liked Section */}
            <div className="mb-8 mt-12 max-w-[1440px] mx-auto px-4">
                {/* Heading - Centered and well-spaced */}
                <h3 className="text-white text-2xl font-bold mb-6 text-center sm:text-left">
                    Previously Liked
                </h3>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {wishlistItems.length > 0 ? (
                        wishlistItems.map((doctor) => {
                            const score = doctor.rating
                                ? (doctor.rating * 2).toFixed(1)
                                : "0.0";

                            return (
                                <div
                                    key={doctor.id}
                                    className="bg-[#ADD8FF] rounded-3xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300 relative"
                                >
                                    <button
                                        onClick={() => removeFromWishlist(doctor.id)}
                                        className="absolute top-4 right-4 p-2"
                                    >
                                        <Heart size={26} fill="#0F152B" className="text-[#0F152B]" />
                                    </button>

                                    <div className="flex items-center space-x-3 mb-4">
                                        <h3 className="text-xl font-bold text-primary">
                                            {doctor.name}
                                        </h3>
                                    </div>

                                    <div className="mb-4">
                                        <p className="font-semibold text-xl text-primary">
                                            {doctor.specialty || "N/A"}
                                        </p>
                                        <p className="text-sm text-primary">
                                            {doctor.city ? `${doctor.city}, ` : ""}
                                            {doctor.state || ""}
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-3 gap-2">
                                        <div
                                            className={`p-2 ${getScoreColor(
                                                Number(score)
                                            )} rounded-lg shadow-sm`}
                                        >
                                            <p className="text-white">Score</p>
                                            <div className="flex items-center justify-center">
                                                <span className="text-4xl font-bold text-white">{score}</span>
                                                <span className="text-md mt-4 text-white">/10</span>
                                            </div>
                                        </div>

                                        <div className="p-2 bg-white/80 backdrop-blur-sm rounded-lg shadow-sm">
                                            <p className="text-primary">Reviews</p>
                                            <p className="text-4xl text-center font-bold text-primary">
                                                {doctor.reviewCount || 0}
                                            </p>
                                        </div>

                                        <div className="p-2 bg-white/80 backdrop-blur-sm rounded-lg shadow-sm">
                                            <p className="text-primary text-xs">Experience</p>
                                            <p className="text-4xl text-center font-bold text-primary">
                                                10+
                                            </p>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() =>
                                            paymentPageUrlRenderer(doctor, doctor.source, router)
                                        }
                                        className="mt-4 w-full bg-[#14183E] text-white py-3 rounded-lg font-semibold hover:bg-[#14183E]/90 transition-colors disabled:opacity-50"
                                        disabled={score === "0.0"}
                                    >
                                        Generate Report
                                    </button>
                                </div>
                            );
                        })
                    ) : (
                        <div className="col-span-full text-center py-8 text-white">
                            No liked doctors yet
                        </div>
                    )}
                </div>
            </div>


            {/* Footer Bottom Section */}
            <div className="flex flex-col md:flex-row mt-20 justify-between px-6 gap-10">
                <div className="text-white max-w-lg">
                    <h3 className="text-white font-semibold text-2xl">Header</h3>
                    <p className="mt-2">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ornare
                        cursus sed nunc eget dictum.
                    </p>
                </div>
                <div className="text-white">
                    <h3 className="text-white font-semibold text-2xl">Header Text</h3>
                    <div className="text-left text-lg mt-2 space-y-1">
                        <p>Button</p>
                        <p>Button</p>
                        <p>Button</p>
                        <p>Button</p>
                        <p>Button</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
