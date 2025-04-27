"use client";
import { useRouter } from 'next/navigation';
import * as React from "react";
import { useState, useEffect } from "react";
import { Doctor } from '@/types';
import Image from 'next/image';
import { v4 as uuidv4 } from 'uuid';
import { paymentPageUrlRenderer } from "@/services/helper";
import ReportCard from '@/components/report-cards/report-card';

const DoctorSearch = () => {
  const [searchText, setSearchText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [apiSources, setApiSources] = useState<string>("");





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

  async function fetchDoctors(query: string) {
    setIsLoading(true);
    setError(null);
    setDoctors([]);

    // Try RateMDs
    try {
      const rateMDsResponse = await fetch(
        `${API_BASE_URL}/doctors/search?query=${encodeURIComponent(query)}`
      );
      const doctorsFetched = await rateMDsResponse.json();

      if (doctorsFetched.success && doctorsFetched.results?.length > 0) {
        // const formattedRateMDsResults = doctorsFetched.results.map((doc: Doctor) => ({
        //   ...doc,
        //   // source: 'RateMDs'
        // }));
        console.log('formattedRateMDsResults', doctorsFetched);
        setDoctors(doctorsFetched.results);
        setApiSources(doctorsFetched.source);
        setIsLoading(false);
        return;
      }
    } catch (err) {
      console.error("RateMDs fetch failed:", err);
    }

    // Try RealSelf
    // try {
    //   const realSelfResponse = await fetch(
    //     `${API_BASE_URL}/doctors/realself-search?query=${encodeURIComponent(query)}`
    //   );
    //   const realSelfData = await realSelfResponse.json();
    //
    //   if (realSelfData.success && realSelfData.results?.length > 0) {
    //     const formattedRealSelfResults = realSelfData.results.map((doc: Doctor) => ({
    //       ...doc,
    //       source: 'RealSelf'
    //     }));
    //     setDoctors(formattedRealSelfResults);
    //     setIsLoading(false);
    //     return;
    //   }
    // } catch (err) {
    //   console.error("RealSelf fetch failed:", err);
    // }
    //
    // // Try IWGC if both RateMDs and RealSelf didn't return results
    // try {
    //   const iwgcResponse = await fetch(
    //     `${API_BASE_URL}/doctors/iwgc-search?query=${encodeURIComponent(query)}`
    //   );
    //   const iwgcData = await iwgcResponse.json();
    //
    //   if (iwgcData.success && iwgcData.results?.length > 0) {
    //     const formattedIwgcResults = iwgcData.results.map((doc: Doctor) => ({
    //       ...doc,
    //       source: 'I Want Great Care'
    //     }));
    //     setDoctors(formattedIwgcResults);
    //     setIsLoading(false);
    //     return; // Exit if successful
    //   }
    // } catch (err) {
    //   console.error("IWGC fetch failed:", err);
    //   // No more APIs to try
    // }

    // If all APIs fail or return no results
    setError("No doctors found");
    setIsLoading(false);
  }



  const navigateToPayment = (doctor: any) => {

    paymentPageUrlRenderer(doctor, apiSources, router);

  };


  return (
    <main className="min-h-screen bg-[#EDF3FF] px-4 py-8">
      <div className="mx-auto max-w-6xl mt-12">
        {/* Header Section */}
        <div className="mb-8 lg:mb-12">
          <div className="max-w-2xl mx-auto relative">
            {/* Country Filter */}
            {/* <div className="absolute right-0 top-0">
              <div className="relative">
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <input
                      type="text"
                      value={countrySearch}
                      onChange={(e) => setCountrySearch(e.target.value)}
                      placeholder="Search country..."
                      className="w-48 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    />
                    {countrySearch && (
                      <button
                        onClick={() => setCountrySearch("")}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    )}
                  </div>
                  <button
                    onClick={() => setIsCountryOpen(!isCountryOpen)}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-g
                            ray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo00"
                  >
                    <span>{selectedCountry || 'Select Country'}</span>
                    <svg
                      className={`w-5 h-5 transition-transform duration-200 ${isCountryOpen ? 'transform rotate-180' : ''}`}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>

                {isCountryOpen && (
                  <div className="absolute z-10 w-48 mt-1 bg-white rounded-md shadow-lg">
                    <ul className="py-1 overflow-auto text-base max-h-60">
                      {filteredCountries.map((country) => (
                        <li
                          key={country}
                          className={`px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100 ${selectedCountry === country ? 'bg-gray-100' : ''
                            }`}
                          onClick={() => {
                            setSelectedCountry(country);
                            setIsCountryOpen(false);
                            setCountrySearch("");
                          }}
                        >
                          {country}
                        </li>
                      ))}
                      {filteredCountries.length === 0 && (
                        <li className="px-4 py-2 text-sm text-gray-500 text-center">
                          No countries found
                        </li>
                      )}
                    </ul>
                  </div>
                )}
              </div>
            </div> */}

            {/* Left-aligned text within search input's width */}
            <div className="text-left mb-6">
              <h1 className="text-4xl font-bold mb-2 lg:text-5xl lg:mb-4">
                Hello <span className="inline-block animate-wave">👋</span>
              </h1>
              <h2 className="text-5xl font-bold lg:text-6xl">Find your doctor</h2>
            </div>

            {/* Search Input */}
            <div className="relative">
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
                className="w-full rounded-full bg-white py-3 pl-12 pr-4 text-base shadow-lg outline-none ring-1 ring-gray-100 lg:py-4 lg:text-lg"
              />
            </div>
          </div>
        </div>

        {/* Doctor Cards Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
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

          {doctors.map((doctor) => (
            <div
              key={doctor.id || uuidv4()}
              className="bg-white rounded-2xl shadow-lg p-4 transition-transform hover:scale-[1.02]"
            >
              <div className="flex flex-col h-full">
                <div className="shrink-0 mb-4">
                  <img
                    src={doctor.imagePath || "/placeholder.svg"}
                    alt={doctor.name}
                    className="w-full h-48 object-contain rounded-xl"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/placeholder.png";
                    }}
                  />
                </div>
                <div className="flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold mb-2">{doctor.name}</h3>
                  <p className="text-gray-600 mb-4 text-lg">
                    {Array.isArray(doctor.specialties)
                      ? doctor.specialties.join(', ')
                      : doctor.specialty || 'N/A'}
                  </p>

                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="bg-[#EDF3FF] rounded-lg p-2 text-center">
                      <div className="text-sm text-gray-600">Score</div>
                      <div className="text-xl font-bold">
                        {doctor.rating?.toFixed(1)}/5
                      </div>
                    </div>
                    <div className="bg-[#EDF3FF] rounded-lg p-2 text-center">
                      <div className="text-sm text-gray-600">Reviews</div>
                      <div className="text-xl font-bold">{doctor.reviewCount}</div>
                    </div>
                    <div className="bg-[#EDF3FF] rounded-lg p-2 text-center">
                      <div className="text-sm text-gray-600">Experience</div>
                      <div className="text-xl font-bold">10+</div>
                    </div>
                  </div>

                  <button
                    onClick={() => navigateToPayment(doctor)}
                    className="mt-auto w-full bg-[#14183E] text-white py-3 rounded-lg font-semibold hover:bg-[#14183E]/90 transition-colors flex items-center justify-center gap-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Generate Report
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-24">
        <ReportCard />
      </div>
    </main>
  );
};

export default DoctorSearch;
9
