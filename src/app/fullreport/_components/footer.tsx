import React from "react";
import { Download } from "lucide-react";
import Image from "next/image";
import { Heart } from "lucide-react";

const Footer = () => {
    // Sample doctor data (you can replace with actual data)
    const featuredDoctor = {
        doctorName: "Dr. Sarah Johnson",
        countryFlag: "/flags/us.svg", // Update with your flag path
        specialistIn: "Cardiologist",
        countryState: "New York, USA",
        score: 9,
        reviews: 128,
        experience: 5,
        id: 100,
        imagePath: "/doctors/sarah-johnson.jpg" // Update with your image path
    };

    const getScoreColor = (score: number) => {
        if (score >= 9) return 'bg-[#009246]';
        if (score >= 7) return 'bg-[#009246]';
        if (score >= 5) return 'bg-[#E95959]';
        return 'bg-[#FDA15A]';
    };

    return (
        <footer className="bg-[#0F152B] py-8 px-4">
            {/* Buttons Section */}
            <div className="flex flex-col items-center gap-4">
                <button className="bg-white px-6 py-5 text-xl font-semibold rounded-lg hover:bg-gray-100 transition-colors">
                    Scan Another Doctor
                </button>
                <button className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors">
                    <Download size={24} />
                    <span>Download Report</span>
                </button>
            </div>
            <div className="">
                {/* Featured Doctor Section */}
                <div className="mb-8">
                    <h3 className="text-white text-2xl font-bold mb-6">Previously Liked</h3>

                    {/* Doctor Card */}
                    <div className="bg-[#ADD8FF] rounded-3xl shadow-md p-4 hover:shadow-lg transition-shadow duration-300 w-72 mr-auto relative">
                        <button className="absolute top-4 right-2 p-2">
                            <Heart size={26} fill="black" className="text-[#0F152B]" />
                        </button>

                        {/* Doctor Info Section */}
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="w-15 h-15 flex items-center justify-center">
                                <Image
                                    src={featuredDoctor.countryFlag}
                                    alt={`${featuredDoctor.countryState} flag`}
                                    width={35}
                                    height={35}
                                />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-primary">{featuredDoctor.doctorName}</h3>
                            </div>
                        </div>

                        {/* Specialist Info */}
                        <div className="mb-4">
                            <p className="font-semibold text-xl text-primary">{featuredDoctor.specialistIn}</p>
                            <p className="text-sm text-primary">{featuredDoctor.countryState}</p>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-3 gap-2">
                            <div className={`p-2 ${getScoreColor(featuredDoctor.score)} rounded-lg shadow-sm`}>
                                <div>
                                    <p className='text-white'>Score</p>
                                    <div className="flex items-center justify-center">
                                        <span className="text-4xl font-bold text-white">{featuredDoctor.score}</span>
                                        <span className="text-md mt-4 text-white">/10</span>
                                    </div>
                                </div>
                            </div>
                            <div className="p-2 bg-white/80 backdrop-blur-sm rounded-lg shadow-sm">
                                <p className="text-primary">Reviews</p>
                                <p className="text-4xl text-center font-bold text-primary">{featuredDoctor.reviews}</p>
                            </div>
                            <div className="p-2 bg-white/80 backdrop-blur-sm rounded-lg shadow-sm">
                                <p className="text-primary text-xs">Experience</p>
                                <p className="text-4xl text-center font-bold text-primary">{featuredDoctor.experience}+</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex mt-20 justify-between px-6">
                    <div className="text-white">
                        <h3 className="text-white font-semibold text-2xl">Header</h3>
                        <p className="max-w-sm mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ornare cursus sed nunc eget dictum  Sed ornare cursus sed nunc eget dictumd nunc eget dictum  Sed ornare cursus sed nunc eget dictum  </p>
                    </div>
                    <div className="text-white">
                        <h3 className="text-white font-semibold text-2xl">Header Text</h3>
                        <div className="text-center text-lg mt-2">
                            <p>Button</p>
                            <p>Button</p>
                            <p>Button</p>
                            <p>Button</p>
                            <p>Button</p>
                        </div>

                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;