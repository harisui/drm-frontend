"use client";
import { useRouter } from 'next/navigation';
import * as React from "react";
import { useState, useEffect } from "react";
import { Doctor } from '@/types';
import Image from 'next/image';
import { v4 as uuidv4 } from 'uuid';

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

    // Try RateMDs
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
        setIsLoading(false);
        return;
      }
    } catch (err) {
      console.error("RateMDs fetch failed:", err);
    }

    // Try RealSelf
    try {
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
        setIsLoading(false);
        return;
      }
    } catch (err) {
      console.error("RealSelf fetch failed:", err);
    }

    // Try IWGC if both RateMDs and RealSelf didn't return results
    try {
      const iwgcResponse = await fetch(
        `${API_BASE_URL}/doctors/iwgc-search?query=${encodeURIComponent(query)}`
      );
      const iwgcData = await iwgcResponse.json();

      if (iwgcData.success && iwgcData.results?.length > 0) {
        const formattedIwgcResults = iwgcData.results.map((doc: Doctor) => ({
          ...doc,
          source: 'I Want Great Care'
        }));
        setDoctors(formattedIwgcResults);
        setIsLoading(false);
        return; // Exit if successful
      }
    } catch (err) {
      console.error("IWGC fetch failed:", err);
      // No more APIs to try
    }

    // If all APIs fail or return no results
    setError("No doctors found");
    setIsLoading(false);
  }

  const getSlugFromProfileLink = (profileLink: string): string | null => {
    const match = profileLink.match(/\/doctors\/([^/]+)/);
    return match ? match[1] : null;
  };
  

  const navigateToPayment = (doctor: any) => {
    localStorage.setItem('doctor', JSON.stringify(doctor));

    // If slug (from RateMDs) otherwise use id (from RealSelf), profileLink for IWGC
    if (doctor.slug) {
      router.push(`/generate-full-report?slug=${encodeURIComponent(doctor.slug)}`);
    } else if (doctor.id) {
      router.push(`/generate-full-report?id=${encodeURIComponent(doctor.id)}`);
    } else if (doctor.profileLink) {
      const slug = getSlugFromProfileLink(doctor.profileLink);
      if (slug) {
        router.push(`/generate-full-report?iwgc_slug=${encodeURIComponent(slug)}`);
      }
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
9