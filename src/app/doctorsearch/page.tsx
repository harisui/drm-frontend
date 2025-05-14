"use client";
import { useRouter } from 'next/navigation';
import * as React from "react";
import { useState, useEffect } from "react";
import { Doctor } from '@/types';
import Image from 'next/image';
import { v4 as uuidv4 } from 'uuid';
import { paymentPageUrlRenderer } from "@/services/helper";
import { Heart, ChevronDown, Filter } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';

const DoctorSearch = () => {
  const [searchText, setSearchText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [apiSources, setApiSources] = useState<string>("");
  const { addToWishlist, removeFromWishlist, wishlistItems } = useWishlist();
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [availableStates, setAvailableStates] = useState<string[]>([]);
  const [showStateFilter, setShowStateFilter] = useState(false);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (searchText.trim()) {
        setSearchQuery(searchText);
      } else {
        setDoctors([]);
        setSearchQuery("");
      }
    }, 1500);

    return () => clearTimeout(debounceTimer);
  }, [searchText]);

  useEffect(() => {
    if (searchQuery.trim()) {
      fetchDoctors(searchQuery);
    }
  }, [searchQuery]);

  useEffect(() => {
    // Extract unique states from doctors data
    if (doctors.length > 0) {
      const states = Array.from(
        new Set(
          doctors
            .map((doctor) => doctor.state || "Unknown")
            .filter(Boolean)
        )
      ).sort();
      setAvailableStates(states as string[]);
    }
  }, [doctors]);

  async function fetchDoctors(query: string) {
    setIsLoading(true);
    setError(null);
    setDoctors([]);

    try {
      const rateMDsResponse = await fetch(
        `${API_BASE_URL}/doctors/search?query=${encodeURIComponent(query)}`
      );
      const doctorsFetched = await rateMDsResponse.json();

      if (doctorsFetched.success && doctorsFetched.results?.length > 0) {
        setDoctors(doctorsFetched.results);
        setApiSources(doctorsFetched.source);
        setIsLoading(false);
        return;
      }
    } catch (err) {
      console.error("RateMDs fetch failed:", err);
    }

    setError("No doctors found");
    setIsLoading(false);
  }

  const navigateToPayment = (doctor: any) => {
    paymentPageUrlRenderer(doctor, apiSources, router);
  };

  const getScoreColor = (score: number) => {
    if (score >= 9) return 'bg-[#009246]';
    if (score >= 7) return 'bg-[#009246]';
    if (score >= 5) return 'bg-[#E95959]';
    return 'bg-[#FDA15A]';
  };

  const toggleWishlist = (doctor: Doctor) => {
    const isWishlisted = wishlistItems.some(item => item.id === doctor.id);
    if (isWishlisted) {
      removeFromWishlist(doctor.id);
    } else {
      addToWishlist(doctor);
    }
  };

  const filteredDoctors = selectedState
    ? doctors.filter(doctor => 
        (doctor.state === selectedState))
    : doctors;

  const getCountryFlag = (countrySlug: string | undefined) => {
    switch (countrySlug?.toLowerCase()) {
      case 'us':
        return '/us-flag.png';
      case 'in':
        return '/india-flag.png';
      case 'ca':
        return '/canada-flag.png';
      case 'uk':
        return '/uk-flag.png';
      default:
        return '/default-flag.png';
    }
  };

  const getCountryName = (countrySlug: string | undefined) => {
    switch (countrySlug?.toLowerCase()) {
      case 'us':
        return 'United States';
      case 'in':
        return 'India';
      case 'ca':
        return 'Canada';
      case 'uk':
        return 'United Kingdom';
      default:
        return countrySlug?.toUpperCase() || 'Unknown';
    }
  };

  return (
    <main className="min-h-screen bg-[#EDF3FF] px-4 py-8">
      <div className="mx-auto mt-28">
        {/* Header Section */}
        <div className="mb-8 lg:mb-12">
          <div className="max-w-[1100px] mx-auto">
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8 items-center'>
              {/* Text Content */}
              <div className="order-2 md:order-1">
                <div className="text-left mb-1">
                  <h1 className="text-2xl font-semibold mb-2 lg:text-5xl lg:mb-4">
                    Hello <span className="inline-block animate-wave">👋</span>
                  </h1>
                  <h2 className="text-3xl font-bold lg:text-6xl">Find your doctor</h2>
                </div>

                {/* Search Input */}
                <div className="relative mt-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute left-4 top-1/2 h-6 w-6 -translate-y-1/2 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.3-4.3" />
                  </svg>
                  <input
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    type="text"
                    placeholder="Search doctor by name or department"
                    className="w-full rounded-lg bg-white py-3 pl-12 pr-4 text-base shadow-lg outline-none ring-1 ring-gray-100 lg:py-4 lg:text-lg"
                  />
                </div>
              </div>

              {/* Image */}
              <div className="order-1 md:order-2 relative w-full h-64 md:h-80">
                <Image
                  src="/assets/reports.png"
                  alt="Doctor search illustration showing medical reports"
                  fill
                  className="object-contain"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/placeholder-doctor.png";
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* State Filter */}
        {availableStates.length > 0 && (
          <div className="relative flex justify-end mb-4 max-w-[1100px] mx-auto">
            <div className="flex items-center gap-2">
              <div className="h-6 w-px bg-gray-300"></div>
              <button
                onClick={() => setShowStateFilter(!showStateFilter)}
                className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <Filter size={16} className="text-gray-500" />
                <span>{selectedState || 'All States'}</span>
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-200 ${showStateFilter ? 'rotate-180' : ''}`}
                />
              </button>
            </div>

            {showStateFilter && (
              <div className="absolute right-0 z-10 w-48 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
                <div className="py-1">
                  <button
                    onClick={() => {
                      setSelectedState(null);
                      setShowStateFilter(false);
                    }}
                    className={`block w-full px-4 py-2 text-left text-sm ${
                      selectedState === null
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    All States
                  </button>
                  {availableStates.map((state) => (
                    <button
                      key={state}
                      onClick={() => {
                        setSelectedState(state);
                        setShowStateFilter(false);
                      }}
                      className={`block w-full px-4 py-2 text-left text-sm ${
                        selectedState === state
                          ? 'bg-blue-50 text-blue-700'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {state}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Doctor Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1100px] mx-auto">
          {isLoading && (
            <div className="col-span-full flex justify-center items-center">
              <div className="w-32 h-32 animate-spin">
                <Image
                  src="/spinner.png"
                  alt="Loading spinner"
                  width={128}
                  height={128}
                  priority
                />
              </div>
            </div>
          )}

          {error && (
            <div className="col-span-full text-center py-4 text-red-500 text-lg">
              {error}
            </div>
          )}

          {filteredDoctors.map((doctor) => {
            const isWishlisted = wishlistItems.some(item => item.id === doctor.id);
            const countryFlag = getCountryFlag(doctor.country_slug);
            const countryName = getCountryName(doctor.country_slug);
            const score = doctor.rating ? (doctor.rating * 2).toFixed(1) : 0; // Convert 5-star to 10-point scale

            return (
              <div 
                key={doctor.id || uuidv4()}
                className="bg-[#ADD8FF] rounded-3xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300 relative"
              >
                {/* Wishlist button */}
                <button
                  onClick={() => toggleWishlist(doctor)}
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
                      : doctor.specialty || 'N/A'}
                  </p>
                  <p className="text-sm text-primary">
                    {doctor.city ? `${doctor.city}, ` : ''}{doctor.state || 'Unknown'} • {countryName}
                  </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-2">
                  <div className={`p-2 ${getScoreColor(Number(score))} rounded-lg shadow-sm`}>
                    <div>
                      <p className='text-white'>Score</p>
                      <div className="flex items-center justify-center">
                        <span className="text-4xl font-bold text-white">{score}</span>
                        <span className="text-md mt-4 text-white">/10</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-2 bg-white/80 backdrop-blur-sm rounded-lg shadow-sm">
                    <p className="text-primary">Reviews</p>
                    <p className="text-4xl text-center font-bold text-primary">{doctor.reviewCount || 0}</p>
                  </div>
                  <div className="p-2 bg-white/80 backdrop-blur-sm rounded-lg shadow-sm">
                    <p className="text-primary text-xs">Experience</p>
                    <p className="text-4xl text-center font-bold text-primary">10+</p>
                  </div>
                </div>

                {/* Generate Report Button */}
                <button
                  onClick={() => navigateToPayment(doctor)}
                  className="mt-4 w-full bg-[#14183E] text-white py-3 rounded-lg font-semibold hover:bg-[#14183E]/90 transition-colors flex items-center justify-center gap-2"
                >
                  Generate Report
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default DoctorSearch;