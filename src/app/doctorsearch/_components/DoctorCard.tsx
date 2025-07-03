import React from 'react';
import Image from 'next/image';
import { Heart } from 'lucide-react';
import { Doctor } from '@/types';
import { getCountryName, getCountryFlag, getScoreColor } from '@/lib/utils';

interface DoctorCardProps {
    doctor: Doctor;
    isWishlisted: boolean;
    onWishlistToggle: (doctor: Doctor) => void;
    onReport: (doctor: Doctor) => void;
}

const DoctorCard: React.FC<DoctorCardProps> = ({
    doctor,
    isWishlisted,
    onWishlistToggle,
    onReport,
}) => {
    const countryFlag = getCountryFlag(doctor.country_slug);
    const countryName = getCountryName(doctor.country_slug);
    const score = doctor.rating ? (doctor.rating * 2).toFixed(1) : 0; // Convert 5-star to 10-point scale

    return (
        <div className="bg-[#ADD8FF] rounded-3xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300 relative">
            {/* Wishlist button */}
            <button
                onClick={() => onWishlistToggle(doctor)}
                className="absolute top-4 right-4 p-2"
            >
                <Heart
                    size={26}
                    className={isWishlisted ? "text-red-500 fill-red-500" : "text-[#0F152B]"}
                />
            </button>

            {/* Doctor Info Section */}
            <div className="flex items-center space-x-3 mb-4">
                {/* <div className="w-15 h-15 flex items-center justify-center">
          <Image
            src={countryFlag}
            alt={`${countryName} flag`}
            width={35}
            height={35}
          />
        </div> */}
                <div>
                    <h3 className="text-xl font-bold text-primary">{doctor.name}</h3>
                </div>
            </div>

            {/* Specialist Info */}
            <div className="mb-4">
                <p className="font-semibold text-xl text-primary">
                    {Array.isArray(doctor.specialties)
                        ? doctor.specialties.join(', ')
                        : doctor.specialty || ''}
                </p>
                <p className="text-sm text-primary">
                    {doctor.city}
                    {doctor.city && (doctor.state || countryName) ? ', ' : ''}
                    {doctor.state || ''}
                    {countryName ? ` • ${countryName}` : ''}
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-2">
                <div className={`p-2 ${getScoreColor(Number(score))} rounded-lg shadow-sm`}>
                    <div>
                        <p className='text-white'>Score</p>
                        <div className="flex items-center justify-center">
                            <span className="text-3xl font-bold text-white">{score}</span>
                            <span className="text-md mt-4 text-white">/10</span>
                        </div>
                    </div>
                </div>
                <div className="p-2 bg-white/80 backdrop-blur-sm rounded-lg shadow-sm">
                    <p className="text-primary">Reviews</p>
                    <p className="text-3xl text-center font-bold text-primary">{doctor.reviewCount || 0}</p>
                </div>
                <div className="p-2 bg-white/80 backdrop-blur-sm rounded-lg shadow-sm">
                    <p className="text-primary text-xs">Experience</p>
                    <p className="text-3xl text-center font-bold text-primary">10+</p>
                </div>
            </div>

            {/* Generate Report Button */}
            <button
                disabled={!Boolean(doctor.reviewCount || 0)}
                onClick={(e) => {
                    e.preventDefault();
                    onReport(doctor);
                }}
                className="mt-4 w-full bg-[#14183E] disabled:bg-gray-400 text-white py-3 rounded-lg font-semibold hover:bg-[#14183E]/90 transition-colors flex items-center justify-center gap-2"
            >
                Generate Report
            </button>
        </div>
    );
};

export default DoctorCard; 