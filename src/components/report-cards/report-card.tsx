"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
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
  source: string;
  city?: string;
  rating?: number;
  slug?: string;
  specialty_url?: string;
  profileLink?: string;
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
  imagePath,
  source,
  city,
  slug,
  profileLink,
  specialty_url
}) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { addToWishlist, removeFromWishlist, wishlistItems } = useWishlist();

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
        imagePath,
        source,
        slug: slug,
        profileLink,
        city,
        specialty_url,
        rating: score
      });
      
      
    }
  };

  
  const getScoreColor = (score: number) => {
    if (score >= 9) return 'bg-[#6FCF97]';    
    if (score >= 7) return 'bg-[#F2C94C]';     
    if (score >= 5) return 'bg-[#F2994A]';    
    return 'bg-[#EB5757]';                    
  };


  return (
    <div className="bg-[#ADD8FF] rounded-3xl shadow-md p-4 hover:shadow-lg transition-shadow duration-300 relative">
      <button
        onClick={toggleWishlist}
        className="absolute top-4 right-4 p-2"
      >
        <Heart
          size={26}
          className={isWishlisted ? "text-red-500 fill-red-500" : "text-[#0F152B]"}
        />
      </button>

      <div className="flex items-center space-x-3 mb-4">
        {/* <div className="w-15 h-15 flex items-center justify-center">
          <Image
            src={countryFlag}
            alt={`${countryState} flag`}
            width={35}
            height={35}
          />
        </div> */}
        <div>
          <h3 className="text-xl font-bold text-primary">{doctorName}</h3>
        </div>
      </div>

      <div className="mb-4">
        <p className="font-semibold text-xl text-primary">{specialistIn}</p>
        <p className="text-sm text-primary">{countryState}</p>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <div className={`p-2 ${getScoreColor(score)} rounded-lg shadow-sm`}>
          <p className='text-white'>Score</p>
          <div className="flex items-center justify-center">
            <span className="text-4xl font-bold text-white">{score}</span>
            <span className="text-md mt-4 text-white">/10</span>
          </div>
        </div>
        <div className="p-2 bg-white/80 backdrop-blur-sm rounded-lg shadow-sm">
          <p className="text-primary">Reviews</p>
          <p className="text-4xl text-center font-bold text-primary">{reviews}</p>
        </div>
        <div className="p-2 bg-white/80 backdrop-blur-sm rounded-lg shadow-sm">
          <p className="text-primary text-xs">Experience</p>
          <p className="text-4xl text-center font-bold text-primary">{experience}+</p>
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
          <span>{selectedCountry || 'All'}</span>
          <ChevronDown size={16} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
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
              All
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

const ReportCard: React.FC = () => {
  const [doctors, setDoctors] = useState<DoctorCardProps[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/doctors/search?query=shawn`);
        const data = await res.json();
        console.log("data", data);
        

        if (data.success && data.results?.length > 0) {
          const formatted = data.results.map((doctor: any, index: number) => ({
            id: doctor.id || index,
            doctorName: doctor.name,
            countryFlag: `https://flagcdn.com/us.svg`,
            specialistIn: doctor.specialty,
            countryState: doctor.state,
            score: Math.min(Math.round((doctor.rating || 0) * 2 * 2) / 2, 10), // round to nearest 0.5
            reviews: doctor.reviewCount || 0,
            experience: Math.floor(Math.random() * 30) + 1, // dummy experience
            imagePath: doctor.imagePath?.startsWith('http') ? doctor.imagePath : `https:${doctor.imagePath}`,
            source: data.source
          }));
          setDoctors(formatted);
        }
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchDoctors();
  }, []);

  const countries = Array.from(new Set(doctors.map(doctor => doctor.countryState)));
  const filteredDoctors = selectedCountry
    ? doctors.filter(doctor => doctor.countryState === selectedCountry)
    : doctors;

    console.log("filtered docr", filteredDoctors);
    
  return (
    <div className="p-4">
      <CountryDropdown
        countries={countries}
        selectedCountry={selectedCountry}
        onCountrySelect={setSelectedCountry}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredDoctors.map((doctor) => (
          <DoctorCard key={doctor.id} {...doctor} />
        ))}
      </div>
    </div>
  );
};

export default ReportCard;
