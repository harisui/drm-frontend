"use client";
import * as React from "react";
import { useState } from "react";

const doctors = Array(5).fill({
  name: "Dr. Bryson",
  specialty: "Plastic Surgeon",
  subSpecialty: "Mamoplastika",
  score: 9,
  yearsOfPractice: 17,
  surgeonsCount: 240,
  image:
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-sJgIAln7PTivHLfqAXOMRqFzqnDQVm.png",
});

const DoctorSearch = () => {
  const [searchText, setSearchText] = useState("");
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
            <div className="flex gap-4 pb-4">
              {doctors.map((doctor, index) => (
                <div
                  key={index}
                  className="flex-none rounded-3xl bg-[#EDF3FF] p-4 shadow-lg"
                  style={{ width: "500px" }}
                >
                  <div className="flex gap-4 rounded-2xl bg-[#EDF3FF] p-4">
                    <img
                      src={doctor.image || "/placeholder.svg"}
                      alt={doctor.name}
                      className="h-48 w-48 rounded-xl object-cover"
                    />
                    <div className="flex flex-col justify-between">
                      <div>
                        <h3 className="text-3xl font-bold">{doctor.name}</h3>
                        <div className="mb-4 flex items-baseline justify-between">
                          <p className="text-xl">{doctor.specialty}</p>
                          <p className="text-xl">{doctor.subSpecialty}</p>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="rounded-xl bg-white p-2 flex flex-col justify-between">
                            <div className="text-sm">Score</div>

                            <div className="text-3xl self-end font-bold">
                              {doctor.score}{" "}
                              <span className="text-lg font-bold self-end">
                                /10
                              </span>
                            </div>
                          </div>

                          <div className="rounded-xl bg-white p-2 flex flex-col justify-between">
                            <div className="text-sm">Years of Practice</div>
                            <div className="text-3xl font-bold self-end">
                              {doctor.yearsOfPractice}
                            </div>
                          </div>
                          <div className="rounded-xl bg-white p-2 flex flex-col justify-between">
                            <div className="text-sm">Surgeons per 2024</div>
                            <div className="text-3xl font-bold self-end">
                              {doctor.surgeonsCount}
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
        </div>
      </div>
    </main>
  );
};

export default DoctorSearch;
