"use client";
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

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (searchText.trim()) {
        setSearchQuery(searchText);
        setCurrentPage(1);
      } else {
        setDoctors([]);
        setSearchQuery("");
      }
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [searchText]);

  useEffect(() => {
    if (searchQuery.trim()) {
      fetchDoctors(searchQuery, currentPage);
    }
  }, [searchQuery, currentPage]);

  const generatePageNumbers = (current: number, total: number): number[] => {
    const maxPagesToShow = 10;
    let startPage = Math.max(1, current - 5);
    let endPage = Math.min(total, current + 4);

    if (current <= 5) {
      startPage = 1;
      endPage = Math.min(maxPagesToShow, total);
    } else if (current >= total - 4) {
      endPage = total;
      startPage = Math.max(1, total - 9);
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  };

  async function fetchDoctors(query: string, page: number) {
    setIsLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8000/api/doctors/ratemds-search?query=${encodeURIComponent(query)}&page=${page}`
      );
      const data = await response.json();
      
      if (data.success) {
        setDoctors(data.results);
        setTotalPages(data.totalPages);
      } else {
        setError(data.error || "No doctors found");
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
                          (e.target as HTMLImageElement).src = "/placeholder.svg";
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
                      <button className="mt-4 w-full rounded-xl bg-[#14183E] py-3 text-center text-lg font-semibold text-white hover:bg-[#14183E]/90">
                        Generate Report
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pagination Controls */}
          {doctors.length > 0 && (
            <div className="flex justify-center items-center mt-4">
              {/* First Page Button */}
              <button
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1 || isLoading}
                className="px-3 py-2 bg-[#14183E] text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#14183E]/90 transition-colors"
              >
                <span className="sr-only">First</span>
                {"<<"}
              </button>

              {/* Previous Page Button */}
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1 || isLoading}
                className="px-3 py-2 bg-[#14183E] text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#14183E]/90 transition-colors"
              >
                <span className="sr-only">Previous</span>
                {"<"}
              </button>

              {/* Page Number Buttons */}
              {generatePageNumbers(currentPage, totalPages).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  disabled={isLoading}
                  className={`px-3 py-2 min-w-[30px] transition-colors ${
                    currentPage === page
                      ? 'bg-[#14183E] text-white rounded-md'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-md'
                  }`}
                >
                  {page}
                </button>
              ))}

              {/* Next Page Button */}
              <button
                onClick={() => setCurrentPage(prev => prev + 1)}
                disabled={currentPage >= totalPages || isLoading}
                className="px-3 py-2 bg-[#14183E] text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#14183E]/90 transition-colors"
              >
                <span className="sr-only">Next</span>
                {">"}
              </button>

              {/* Last Page Button */}
              <button
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages || isLoading}
                className="px-3 py-2 bg-[#14183E] text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#14183E]/90 transition-colors"
              >
                <span className="sr-only">Last</span>
                {">>"}
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default DoctorSearch;