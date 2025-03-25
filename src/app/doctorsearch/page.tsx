"use client";
import { useRouter } from 'next/navigation';
import * as React from "react";
import { useState, useEffect } from "react";
import { Doctor } from '@/types';
import Image from 'next/image';

const DoctorSearch = () => {
  const [searchText, setSearchText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

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

    try {
      const rateMDsResponse = await fetch(
        `${API_BASE_URL}/doctors/ratemds-search?query=${encodeURIComponent(query)}`
      );
      const rateMDsData = await rateMDsResponse.json();

      if (rateMDsData.success && rateMDsData.results?.length > 0) {
        const formattedRateMDsResults = rateMDsData.results.map((doc: Doctor) => ({
          ...doc,
          source: 'RateMDs'
        }));
        setDoctors(formattedRateMDsResults);
      } else {
        const realSelfResponse = await fetch(
          `${API_BASE_URL}/doctors/realself-search?query=${encodeURIComponent(query)}`
        );
        const realSelfData = await realSelfResponse.json();

        if (realSelfData.success && realSelfData.results?.length > 0) {
          const formattedRealSelfResults = realSelfData.results.map((doc: Doctor) => ({
            ...doc,
            source: 'RealSelf'
          }));
          setDoctors(formattedRealSelfResults);
        } else {
          setError("No doctors found");
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch doctors");
    } finally {
      setIsLoading(false);
    }
  }

  const navigateToPayment = (doctor: any) => {
    localStorage.setItem('doctor', JSON.stringify(doctor));

    // If slug (from RateMDs) otherwise use id (from RealSelf)
    if (doctor.slug) {
      router.push(`/generate-full-report?slug=${encodeURIComponent(doctor.slug)}`);
    } else if (doctor.id) {
      router.push(`/generate-full-report?id=${encodeURIComponent(doctor.id)}`);
    }
  };


  return (
    <main className="min-h-screen bg-[#EDF3FF] px-4 py-8">
      <div className="mx-auto max-w-6xl">
        {/* Header Section */}
        <div className="mb-8 lg:mb-12">
          <div className="max-w-2xl mx-auto">
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
              key={doctor.id}
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
                  <p className="text-gray-600 mb-4 text-lg">{doctor.specialty}</p>

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
                    className="mt-auto w-full bg-[#14183E] text-white py-2 rounded-lg font-semibold hover:bg-[#14183E]/90 transition-colors"
                  >
                    Generate Report
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default DoctorSearch;
