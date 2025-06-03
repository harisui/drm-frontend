"use client"
import React, {Suspense, useEffect, useState} from "react";
import { useRouter, useSearchParams } from "next/navigation";
import LoadingScreen from "@/components/ui/loader/page";
import {
  extractParamsFromUrl,
  fetchReportData,
  fetchSpecialtyData,
  getSlugFromProfileLink
} from "@/services/paramsHelper";

const EmailReport = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  const doctorName = searchParams.get("_nme");
  const [params, setParams] = useState<ReturnType<typeof extractParamsFromUrl>>({
    _spt: "",
    _spt_slug: "",
    _nme: "",
    _ct: "",
    _st: "",
    _rt: 0,
    slug: "",
    _sr: "",
    lang: "en",
  });

  const [specialtyData, setSpecialtyData] = useState<any[]>([]);
  const [report, setReport] = useState<null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Extract params once component mounts
    setParams(extractParamsFromUrl());
  }, []);

  useEffect(() => {
    const fetchAllData = async () => {
      if (!params._sr || !params.slug) return;

      setIsLoading(true);
      setError(null);

      try {
        // 1. Fetch specialty data
        const specialtyResults = await fetchSpecialtyData(params._spt_slug, params._sr);
        setSpecialtyData(specialtyResults);

        // Fallback to different specialty
        if (specialtyResults.length === 0) {
          const fallbackSpecialty = await fetchSpecialtyData("physician", params._sr);
          setSpecialtyData(fallbackSpecialty);
        }

        // 2. Handle slug adjustments (specific to iwgc source)
        let identifier = params.slug;
        if (params._sr === "iwgc") {
          const slugFromProfile = getSlugFromProfileLink(params.slug);
          identifier = slugFromProfile || params.slug;
        }

        // 3. Fetch report data
        const fetchedReport = await fetchReportData(identifier, params._sr);

        // TODO Can be continoued in future, fetchedReport variable is useless for now

      } catch (error) {
        console.warn("Error:", error);
        setError("Failed to fetch data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllData();
  }, [params]);

  if (isLoading) return <LoadingScreen />;


  const navigateToFullReport = () => {
    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.has("slug") && searchParams.has("_sr")) {
      router.push(`/fullreport?${searchParams.toString()}`);
    } else {
      console.warn("No identifier to navigate with");
    }
  };



  if (isLoading) {
    return <LoadingScreen />;
  }


  return (
      <section className="flex min-h-screen items-center justify-center bg-sky-100 p-6 sm:p-10 lg:p-20">
        <div className="w-full max-w-4xl space-y-8 lg:space-y-10">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl font-bold text-black sm:text-5xl md:text-6xl">
              Success!
            </h1>
            <p className="mt-3 text-lg text-black sm:mt-4 sm:text-xl md:text-2xl">
              The report on {doctorName} has been generated.
            </p>
          </div>

          <form className="flex w-full flex-col gap-4 rounded-2xl bg-white p-6 shadow-lg sm:flex-row sm:items-stretch sm:gap-4 sm:p-6 md:rounded-3xl">
            <div className="flex-1">
              <label htmlFor="emailInput" className="sr-only">Email address</label>
              <input
                  type="email"
                  id="emailInput"
                  placeholder="Enter your email to get the report"
                  className="h-full w-full py-4 text-lg placeholder-gray-400 focus:outline-none sm:py-5 sm:text-xl md:py-6"
                  aria-label="Enter your email address to receive the report"
              />
            </div>

            <button
                type="button"
                onClick={() => navigateToFullReport()}
                className="w-full rounded-xl bg-slate-900 px-6 py-4 text-lg font-medium text-white transition-colors hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-600 focus:ring-offset-2 sm:w-auto sm:px-8 sm:py-5 md:py-6 md:text-xl"
            >
              Get Report
            </button>
          </form>
        </div>
      </section>
  );
};

const EmailReportWithSuspense = () => (
    <Suspense fallback={<div>Loading...</div>}>
      <EmailReport />
    </Suspense>
);

export default EmailReportWithSuspense;
