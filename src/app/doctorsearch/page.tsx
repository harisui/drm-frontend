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

    try {
      const rateMDsResponse = await fetch(
        `${API_BASE_URL}/doctors/search?query=${encodeURIComponent(query)}`
      );
      const doctorsFetched = await rateMDsResponse.json();

      if (doctorsFetched.success && doctorsFetched.results?.length > 0) {
        console.log('formattedRateMDsResults', doctorsFetched);
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
              className="bg-white rounded-2xl shadow-lg p-4 transition-transform hover:scale-[1.02] hover:shadow-xl"
            >
              <div className="flex flex-col h-full">
                <div className="shrink-0 mb-4">
                  <img
                    src={doctor.imagePath || "/placeholder-doctor.svg"}
                    alt={`${doctor.name}'s profile`}
                    className="w-full h-48 object-contain rounded-xl"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/placeholder-doctor.png";
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