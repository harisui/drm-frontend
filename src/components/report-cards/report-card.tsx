"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { doctors } from '@/data/doctors';
import { Heart, ChevronDown, Filter } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';

interface DoctorCardProps {
    doctorName: string;
    countryFlag: string;
    specialistIn: string;
    countryState: string;
    score: number;
    reviews: number;
    experience: number;
    id: number;
    imagePath?: string;
}

const DoctorCard: React.FC<DoctorCardProps> = ({
    doctorName,
    countryFlag,
    specialistIn,
    countryState,
    score,
    reviews,
    experience,
    id,
    imagePath
}) => {
    const [isWishlisted, setIsWishlisted] = useState(false);
    const { addToWishlist, removeFromWishlist, wishlistItems } = useWishlist();

    // Sync wishlist state when component mounts or wishlistItems changes
    useEffect(() => {
        setIsWishlisted(wishlistItems.some(item => item.id === id));
    }, [wishlistItems, id]);

    const toggleWishlist = () => {
        if (isWishlisted) {
            removeFromWishlist(id);
        } else {
            addToWishlist({
                id,
                name: doctorName,
                specialty: specialistIn,
                imagePath
            });
        }
    };

    // Define background colors based on card ID
    const getCardBackground = (id: number) => {
        switch (id) {
            case 1:
                return 'bg-[#ADD8FF]';
            case 2:
                return 'bg-[#F5F6DA]';
            case 3:
                return 'bg-[#DCEEFD]';
            default:
                return 'bg-white';
        }
    };

    return (
        <div className={`${getCardBackground(id)} rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300 relative`}>
            {/* Wishlist Button */}
            <button
                onClick={toggleWishlist}
                className="absolute top-4 right-4 p-2"
            >
                <Heart
                    size={20}
                    className={isWishlisted ? "text-red-500 fill-red-500" : "text-gray-400"}
                />
            </button>

            {/* Doctor Info Section */}
            <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 flex items-center justify-center">
                    <Image
                        src={countryFlag}
                        alt={`${countryState} flag`}
                        width={32}
                        height={32}
                        className="rounded-lg border border-gray-200"
                    />
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-gray-800">{doctorName}</h3>
                    <p className="text-sm text-gray-600">{countryState}</p>
                </div>
            </div>

            {/* Specialist Info */}
            <div className="mb-4">
                <p className="text-sm text-gray-600">Specialist in</p>
                <p className="font-medium text-gray-800">{specialistIn}</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-2">
                <div className="text-center p-2 bg-white/80 backdrop-blur-sm rounded-lg shadow-sm">
                    <p className="text-xl font-bold text-blue-600">{score}</p>
                    <p className="text-xs text-gray-600">Score</p>
                </div>
                <div className="text-center p-2 bg-white/80 backdrop-blur-sm rounded-lg shadow-sm">
                    <p className="text-xl font-bold text-blue-600">{reviews}</p>
                    <p className="text-xs text-gray-600">Reviews</p>
                </div>
                <div className="text-center p-2 bg-white/80 backdrop-blur-sm rounded-lg shadow-sm">
                    <p className="text-xl font-bold text-blue-600">{experience}+</p>
                    <p className="text-xs text-gray-600">Years</p>
                </div>
            </div>
        </div>
    );
};

interface CountryDropdownProps {
    countries: string[];
    selectedCountry: string | null;
    onCountrySelect: (country: string | null) => void;
}

const CountryDropdown: React.FC<CountryDropdownProps> = ({ countries, selectedCountry, onCountrySelect }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative flex justify-end mb-4">
            <div className="flex items-center gap-2">
                <div className="h-6 w-px bg-gray-300"></div>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <Filter size={16} className="text-gray-500" />
                    <span>{selectedCountry || 'All Countries'}</span>
                    <ChevronDown
                        size={16}
                        className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    />
                </button>
            </div>

            {isOpen && (
                <div className="absolute right-0 z-10 w-48 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
                    <div className="py-1">
                        <button
                            onClick={() => {
                                onCountrySelect(null);
                                setIsOpen(false);
                            }}
                            className={`block w-full px-4 py-2 text-left text-sm ${selectedCountry === null
                                ? 'bg-blue-50 text-blue-700'
                                : 'text-gray-700 hover:bg-gray-100'
                                }`}
                        >
                            All Countries
                        </button>
                        {countries.map((country) => (
                            <button
                                key={country}
                                onClick={() => {
                                    onCountrySelect(country);
                                    setIsOpen(false);
                                }}
                                className={`block w-full px-4 py-2 text-left text-sm ${selectedCountry === country
                                    ? 'bg-blue-50 text-blue-700'
                                    : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                            >
                                {country}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

const ReportCard: React.FC<{}> = () => {
    const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

    // Get unique countries from doctors data
    const countries = Array.from(new Set(doctors.map(doctor => doctor.countryState)));

    // Filter doctors based on selected country
    const filteredDoctors = selectedCountry
        ? doctors.filter(doctor => doctor.countryState === selectedCountry)
        : doctors;

    return (
        <div className="p-4">
            <CountryDropdown
                countries={countries}
                selectedCountry={selectedCountry}
                onCountrySelect={setSelectedCountry}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredDoctors.map((doctor) => (
                    <DoctorCard key={doctor.id} {...doctor} />
                ))}
            </div>
        </div>
    );
};

export default ReportCard;
