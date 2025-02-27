"use client";
import { useRouter } from 'next/navigation';
import * as React from "react";
import { useState, useEffect } from "react";

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  reviewCount: number;
  city: string;
  state: string;
  imagePath: string | null;
  // Add these if available in your API response, otherwise keep commented
  // yearsOfPractice?: number;
  // surgeonsCount?: number;
}

const DoctorSearch = () => {
  const [searchText, setSearchText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [totalPages, setTotalPages] = useState(1);
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
    }, 500);

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
          setError("No doctors found in either RateMDs or RealSelf");
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch doctors");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#EDF3FF] px-4 py-8 flex flex-col">
      <div className="mx-auto max-w-6xl flex-1 flex flex-col w-full">
        {/* Header Section */}
        <div className="flex-1 flex flex-col justify-center">
          <div className="w-full max-w-2xl mx-auto">
            <div className="text-left">
              <h1 className="text-5xl font-bold mb-4">
                Hello <span className="inline-block animate-wave">👋</span>
              </h1>
              <h2 className="text-6xl font-bold mb-8">Find your doctor</h2>
            </div>

            {/* Search Input */}
            <div className="relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="absolute left-4 top-1/2 h-6 w-6 -translate-y-1/2 text-gray-400"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              <input
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                type="text"
                placeholder="Search doctor by name or department"
                className="w-full rounded-full bg-white py-4 pl-12 pr-4 text-lg shadow-lg outline-none ring-1 ring-gray-100"
              />
            </div>
          </div>
        </div>

        {/* Doctor Cards */}
        <div className="mt-auto pb-8">
          <div className="scrollbar-hide overflow-x-auto">
            {isLoading && <div className="text-center py-4">Loading...</div>}
            {error && <div className="text-center py-4 text-red-500">{error}</div>}           
            <div className="flex gap-4 pb-4">
              {doctors.map((doctor) => (
                <div
                  key={doctor.id}
                  className="flex-none rounded-3xl bg-[#EDF3FF] p-4 shadow-lg"
                  style={{ width: "500px", minHeight: "400px" }}
                >
                  <div className="flex gap-4 rounded-2xl bg-[#EDF3FF] p-4 h-full">
                    <div className="shrink-0">
                      <img
                        src={doctor.imagePath || "/placeholder.svg"}
                        alt={doctor.name}
                        className="h-48 w-48 rounded-xl object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "/placeholder.png";
                        }}
                      />
                    </div>
                    <div className="flex flex-col flex-grow">
                      <div className="flex-grow">
                        <h3 className="text-3xl font-bold">{doctor.name}</h3>
                        <div className="mb-4 flex items-baseline justify-between">
                          <p className="text-xl">{doctor.specialty}</p>
                          {/* Uncomment if subSpecialty is available
                          <p className="text-xl">{doctor.subSpecialty}</p> */}
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="rounded-xl bg-white p-2 flex flex-col justify-between">
                            <div className="text-sm">Score</div>
                            <div className="text-3xl self-end font-bold">
                              {doctor.rating.toFixed(1)}
                              <span className="text-lg font-bold">/5</span>
                            </div>
                          </div>

                          <div className="rounded-xl bg-white p-2 flex flex-col justify-between">
                            <div className="text-sm">Reviews</div>
                            <div className="text-3xl font-bold self-end">
                              {doctor.reviewCount}
                            </div>
                          </div>
                          
                          {/* Example placeholder - update with actual data if available */}
                          <div className="rounded-xl bg-white p-2 flex flex-col justify-between">
                            <div className="text-sm">Experience</div>
                            <div className="text-3xl font-bold self-end">
                              {/* {doctor.yearsOfPractice || 'N/A'} */}
                              10+
                            </div>
                          </div>
                        </div>
                      </div>
                      <button onClick={() => router.push('/generate-full-report')} className="mt-4 w-full rounded-xl bg-[#14183E] py-3 text-center text-lg font-semibold text-white hover:bg-[#14183E]/90">
                        Generate Report
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>


        </div>
      </div>
    </main>
  );
};

export default DoctorSearch;