'use client'
import { useEffect, useState } from "react";
import { Doctor, Report } from "@/types";
import Loading from "../loading/page";
import {
  UserIcon,
  StarIcon,
  HeartIcon,
  ClockIcon,
  ScaleIcon,
  BanknotesIcon,
  FaceSmileIcon,
  ComputerDesktopIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import { LanguageSwitcher } from "@/components/languageSwitcher/language-switcher";
import { useRouter } from "next/navigation";

const DoctorProfile = () => {
  const [report, setReport] = useState<Report | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [specialtyData, setSpecialtyData] = useState<Doctor[]>([]);
    const router = useRouter();

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const doctorJSON = localStorage.getItem("doctor");
      if (doctorJSON) {
        try {
          const parsedDoctor = JSON.parse(doctorJSON);
          setDoctor(parsedDoctor);
        } catch (error) {
          console.error("Error parsing doctor from localStorage:", error);
        }
      }
    }
  }, []);

  useEffect(() => {
    const fetchAllData = async () => {
      
      setIsLoading(true);
      setError(null);

      try {
        // First API call - Specialty
        const specialtyResponse = await fetch(
          `${API_BASE_URL}/doctors/get-ratemd-doctor-specialty?specialty_name=${doctor.specialty_url || 'chiropractor'}`
        );
        if (!specialtyResponse.ok) {
          throw new Error('Specialty fetch failed');
        }
        const data = await specialtyResponse.json();
        setSpecialtyData(data.results);
        console.log("Specialty data:", data);

        // Get search params on client side
        const searchParams = typeof window !== 'undefined' 
          ? new URLSearchParams(window.location.search) 
          : new URLSearchParams();
        
        const slugParam = searchParams.get('slug');
        const idParam = searchParams.get('id');
        const iwgcSlugParam = searchParams.get('iwgc_slug');

        // Second API call - Report
        let reportResponse: any;
        let reportData: any;

        if (slugParam) {
          reportResponse = await fetch(
            `${API_BASE_URL}/doctors/ratemds/report/${encodeURIComponent(slugParam)}`
          );
        } else if (idParam && !slugParam) {
          reportResponse = await fetch(
            `${API_BASE_URL}/doctors/realself/report/${encodeURIComponent(idParam)}`
          );
        } else if (iwgcSlugParam) {
          reportResponse = await fetch(
            `${API_BASE_URL}/doctors/iwgc/report/${encodeURIComponent(iwgcSlugParam)}`
          )
        }

        if (reportResponse) {
          if (!reportResponse.ok) {
            throw new Error('Report fetch failed');
          }
          reportData = await reportResponse.json();
          setReport(reportData);
        }

      } catch (error) {
        console.error('Error in API chain:', error);
        setError(error instanceof Error ? error.message : 'API error');
      } finally {
        setIsLoading(false);
      }
    };

    if (doctor) {
      fetchAllData();
    }
  }, [doctor, API_BASE_URL]);

  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }
  if (!doctor) {
    return <div>No doctor data found.</div>;
  }

  const getRatingLabel = (rating: number | undefined): string => {
    if (rating == null) return "N/A";
    if (rating >= 4.5) return "Excellent";
    if (rating >= 3.5) return "Good";
    if (rating >= 2.5) return "Average";
    return "Poor";
  };

  const stripHtml = (html: string | null | undefined): string => {
    return html ? html.replace(/<[^>]*>/g, '') : '';
  };

  // Prepare testimonials from API response, handling null report
  const testimonials = report ? [
    report.positiveComments?.first ? {
      author: report.positiveComments.first.author || "Anonymous",
      date: report.positiveComments.first.date || "Unknown date",
      comment: stripHtml(report.positiveComments.first.comment) || "No comment available",
      imgSrc: "/avatar.png",
      imgAlt: "Anonymous profile",
      type: "positive"
    } : null,
    report.positiveComments?.second ? {
      author: report.positiveComments.second.author || "Anonymous",
      date: report.positiveComments.second.date || "Unknown date",
      comment: stripHtml(report.positiveComments.second.comment) || "No comment available",
      imgSrc: "/avatar.png",
      imgAlt: "Anonymous profile",
      type: "positive"
    } : null,
    report.negativeComment ? {
      author: report.negativeComment.author || "Anonymous",
      date: report.negativeComment.date || "Unknown date",
      comment: stripHtml(report.negativeComment.comment) || "No comment available",
      imgSrc: "/avatar.png",
      imgAlt: "Anonymous profile",
      type: "negative"
    } : null
  ].filter(Boolean) : [];


  // const otherDoctors = [
  //   { doctorName: "Dr. Bryson", speciality: "Plastic Surgeon", practices: 240, score: 9, years: 17, imgSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/5ce59305fa8206dc231d77f3c42313c9eafba1cec12bc965d6aaf3e1acaa3ad6?placeholderIfAbsent=true&apiKey=94fb06f7e4d44f66bb1cedf1d92b4f27", imgAlt: "Dr. Bryson profile", btnText: "Generate Report" },
  //   { doctorName: "Dr. Bryson", speciality: "Plastic Surgeon", practices: 240, score: 9, years: 17, imgSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/f72ca2a141f983162a45111238163124a9c4fd774868ce5cfba7c2510910592f?placeholderIfAbsent=true&apiKey=94fb06f7e4d44f66bb1cedf1d92b4f27", imgAlt: "Dr. Bryson profile", btnText: "Generate Report" },
  //   { doctorName: "Dr. Bryson", speciality: "Plastic Surgeon", practices: 240, score: 9, years: 17, imgSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/22efb22cd138ca4d8a77c79c9efb3519fe8c20749cb68ea46d8091b835556311?placeholderIfAbsent=true&apiKey=94fb06f7e4d44f66bb1cedf1d92b4f27", imgAlt: "Dr. Bryson profile", btnText: "Generate Report" }
  // ];

  const getInsightIcon = (insight: string) => {
    const lowerInsight = insight.toLowerCase();
    const iconClass = "w-8 h-8 text-white p-1.5 rounded-lg";

    if (/experience|years|practice/.test(lowerInsight)) {
      return <ClockIcon className={`${iconClass} bg-purple-600`} />;
    }
    if (/rating|score|reviews/.test(lowerInsight)) {
      return <StarIcon className={`${iconClass} bg-amber-500`} />;
    }
    if (/patient|care|satisfaction/.test(lowerInsight)) {
      return <UserIcon className={`${iconClass} bg-emerald-600`} />;
    }
    if (/technology|equipment|digital/.test(lowerInsight)) {
      return <ComputerDesktopIcon className={`${iconClass} bg-blue-600`} />;
    }
    if (/cost|price|affordable/.test(lowerInsight)) {
      return <BanknotesIcon className={`${iconClass} bg-green-600`} />;
    }
    if (/safety|protocol|standard/.test(lowerInsight)) {
      return <ScaleIcon className={`${iconClass} bg-red-600`} />;
    }
    if (/results|success|improvement/.test(lowerInsight)) {
      return <FaceSmileIcon className={`${iconClass} bg-pink-500`} />;
    }
    if (/care|treatment|procedure/.test(lowerInsight)) {
      return <HeartIcon className={`${iconClass} bg-rose-600`} />;
    }
    return <InformationCircleIcon className={`${iconClass} bg-gray-600`} />;
  };

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
    <div className="flex overflow-hidden flex-col bg-white">
    <LanguageSwitcher />
      {/* Header Section */}
      <div className="px-20 pt-16 pb-8 w-full bg-orange-100 max-md:px-5 max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col">
          <div className="flex flex-col w-[63%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow items-start font-medium text-slate-900 max-md:mt-10 max-md:max-w-full">
              <div className="text-7xl font-bold max-md:max-w-full max-md:text-4xl">
                {doctor?.name}
              </div>
              <div className="mt-1 text-4xl">{doctor?.specialty}</div>
              <div className="self-stretch mt-20 text-2xl max-md:mt-10 max-md:max-w-full">
                {doctor?.specialties
                  ? `Specializes in ${doctor.specialties.map((spec: any, i: any) => (
                    `${spec}${i < doctor.specialties.length - 1 ? ', ' : ''}`
                  )).join('')}.`
                  : `Specializes in ${doctor?.specialty} in ${doctor?.city}, ${doctor?.state}.`}
              </div>
            </div>
          </div>
          <div className="flex flex-col ml-5 w-[37%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col mt-9 w-full max-md:mt-10">
              <div className="self-end text-4xl font-medium text-slate-900 max-md:mr-1">
                Practicing in{" "}
                {Array.isArray(report?.locations) && report.locations.length > 0 ? (
                  report.locations.slice(0,2).map((loc, i) => (
                    <span key={i}>
                      {loc}
                      {i < report.locations.length - 1 ? ", " : ""}
                    </span>
                  ))
                ) : (
                  `${doctor?.city}, ${doctor?.state}`
                )}
              </div>
              <div className="flex gap-10 items-start px-8 pt-4 mt-14 text-white whitespace-nowrap rounded-3xl bg-slate-900 max-md:px-5 max-md:mt-10">
                <div className="grow shrink text-2xl font-medium w-[90px]">
                  {getRatingLabel(doctor?.rating)}
                </div>
                <div className="flex gap-px">
                  <div className="grow text-9xl max-md:text-4xl">{doctor?.rating.toFixed(1)}</div>
                  <div className="self-end mt-20 text-6xl max-md:mt-10 max-md:text-4xl">
                    /5
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col px-20 mt-16 w-full max-md:px-5 max-md:mt-10 max-md:max-w-full">
        {/* Key Insights Section */}
        <div className="self-start text-4xl font-bold text-slate-900">
          Key Insights
        </div>
        <div className="mt-6 max-md:mr-2.5 max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col">
            {report && report.insights && report.insights.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full">
                {report.insights.map((insight, index) => (
                  <div key={index} className="flex flex-col text-slate-900 h-full">
                    <div className="flex gap-4 items-start p-5 bg-white rounded-xl shadow-[0px_4px_17px_rgba(0,0,0,0.08)] border border-gray-200 transition-all duration-300 hover:shadow-lg hover:border-orange-100 h-full">
                      <div className="flex-shrink-0 mt-0.5">
                        {getInsightIcon(insight)}
                      </div>
                      <p className="text-lg font-medium">
                        {insight}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col w-full text-slate-900">
                <div className="flex gap-4 items-center p-5 bg-white rounded-xl shadow-[0px_4px_17px_rgba(0,0,0,0.08)] border border-gray-200">
                  <p className="text-lg font-medium">
                    No insights available
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="self-start mt-20 text-4xl font-bold text-slate-900 max-md:mt-10">
          Top Testimonials
        </div>
        {testimonials.length > 0 ? (
          <div className="mt-10 max-md:mr-1.5 max-md:max-w-full">
            <div className="flex gap-5 max-md:flex-col">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className={`flex flex-col px-8 py-7 mx-auto w-full rounded-2xl shadow-[0px_2px_18px_rgba(0,0,0,0.1)] max-md:px-5 max-md:mt-6 ${ testimonial.type === "positive" ? "bg-blue-100" : "bg-red-100"
                  }`}
                >
                  <div className="flex gap-5 justify-between w-full font-semibold text-center">
                    <div className="flex gap-4">
                      <img
                        loading="lazy"
                        src={testimonial?.imgSrc}
                        alt={testimonial?.imgAlt}
                        className="object-contain shrink-0 rounded-full aspect-[0.98] w-[62px]"
                      />
                      <div className="flex flex-col self-start">
                        <div className="text-xl text-black">{testimonial?.author}</div>
                        <div className="self-start mt-1 text-sm text-zinc-400">
                          {testimonial?.date}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="self-end mt-3 text-base font-medium text-slate-900">
                    {testimonial?.comment}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="mt-6 text-xl text-gray-500">No testimonials available</div>
        )}


        {/* Summary Section */}
        <div className="self-start mt-20 text-4xl font-bold text-slate-900 max-md:mt-10">
          Summary
        </div>
        <div className="mt-5 text-2xl font-medium text-slate-900 max-md:max-w-full">
          {report?.summary || "No summary available."}
        </div>
      </div>

{/* Other Doctors Section */}
<div className="flex flex-col px-20 pt-14 pb-24 mt-20 w-full bg-sky-100 max-md:px-5 max-md:mt-10 max-md:max-w-full">
  <div className="self-start text-4xl font-bold text-slate-900 max-md:max-w-full">
    Get Reports on Other Doctors
  </div>
  <div className="mt-11 w-full max-md:mt-10 max-md:max-w-full">
    <div className="flex gap-5 max-md:flex-col">
      {specialtyData.slice(0, 4).map((doctor: any, index) => (
        <div
          key={index}
          className="bg-white rounded-2xl shadow-lg p-4 transition-transform hover:scale-[1.02] flex-1"
        >
          <div className="flex flex-col h-full">
            <div className="shrink-0 mb-4">
              <img
                src={doctor?.imagePath || "/placeholder.svg"}
                alt={doctor?.name}
                className="w-full h-48 object-contain rounded-xl"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/placeholder.png";
                }}
              />
            </div>
            <div className="flex flex-col flex-grow">
              <h3 className="text-2xl font-bold mb-2">{doctor?.name}</h3>
              <p className="text-gray-600 mb-4 text-lg">{doctor?.specialty}</p>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-[#EDF3FF] rounded-lg p-2 text-center">
                  <div className="text-sm text-gray-600">Score</div>
                  <div className="text-xl font-bold">
                    {doctor?.rating?.toFixed(1)}/5
                  </div>
                </div>
                <div className="bg-[#EDF3FF] rounded-lg p-2 text-center">
                  <div className="text-sm text-gray-600">Reviews</div>
                  <div className="text-xl font-bold">{doctor?.reviewCount}</div>
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
      </div>
    </div>
  );
};

export default DoctorProfile;
