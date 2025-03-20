'use client'
import { useEffect, useState } from "react";
import OtherDoctorCard from "./OtherDoctorCard";
import { Doctor, Report } from "@/types";
import Loading from "../loading/page";
import { LanguageSwitcher } from "@/components/languageSwitcher/language-switcher";

const DoctorProfile = () => {
  const [report, setReport] = useState<Report | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

//  const storedDoctor = localStorage.getItem('doctor');
  const [storedDoctor, setStoredDoctor] = useState<string | null>(null);

  useEffect(() => {
    const doctor = localStorage.getItem("doctor");
    setStoredDoctor(doctor);
  }, []);
  const doctor: Doctor | null = storedDoctor ? JSON.parse(storedDoctor) : null;

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchReport = async () => {
      const searchParams = new URLSearchParams(window.location.search);
      const slugParam = searchParams.get('slug');
      const idParam = searchParams.get('id');
  
      // If we have a slug, use the RateMDs endpoint
      if (slugParam) {
        try {
          const response = await fetch(
            `${API_BASE_URL}/doctors/ratemds/report/${encodeURIComponent(slugParam)}`
          );
          const data = await response.json();
          if (data.success) {
            setReport(data);
          } else {
            setError('Failed to generate report');
          }
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Unknown error');
        } finally {
          setIsLoading(false);
        }
      } 
      // If no slug but we have an id, use the RealSelf endpoint
      else if (idParam) {
        try {
          const response = await fetch(
            `${API_BASE_URL}/doctors/realself/report/${encodeURIComponent(idParam)}`
          );
          const data = await response.json();
          if (data.success) {
            setReport(data);
          } else {
            setError('Failed to generate report');
          }
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Unknown error');
        } finally {
          setIsLoading(false);
        }
      } else {
        setError('Invalid doctor identifier');
        setIsLoading(false);
      }
    };
  
    fetchReport();
  }, []);
  

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
      imgAlt: "Anonymous profile"
    } : null,
    report.positiveComments?.second ? {
      author: report.positiveComments.second.author || "Anonymous",
      date: report.positiveComments.second.date || "Unknown date",
      comment: stripHtml(report.positiveComments.second.comment) || "No comment available",
      imgSrc: "/avatar.png",
      imgAlt: "Anonymous profile"
    } : null,
    report.negativeComment ? {
      author: report.negativeComment.author || "Anonymous",
      date: report.negativeComment.date || "Unknown date",
      comment: stripHtml(report.negativeComment.comment) || "No comment available",
      imgSrc: "/avatar.png",
      imgAlt: "Anonymous profile"
    } : null
  ].filter(Boolean) : [];
  

  const otherDoctors = [
    { doctorName: "Dr. Bryson", speciality: "Plastic Surgeon", practices: 240, score: 9, years: 17, imgSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/5ce59305fa8206dc231d77f3c42313c9eafba1cec12bc965d6aaf3e1acaa3ad6?placeholderIfAbsent=true&apiKey=94fb06f7e4d44f66bb1cedf1d92b4f27", imgAlt: "Dr. Bryson profile", btnText: "Generate Report" },
    { doctorName: "Dr. Bryson", speciality: "Plastic Surgeon", practices: 240, score: 9, years: 17, imgSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/f72ca2a141f983162a45111238163124a9c4fd774868ce5cfba7c2510910592f?placeholderIfAbsent=true&apiKey=94fb06f7e4d44f66bb1cedf1d92b4f27", imgAlt: "Dr. Bryson profile", btnText: "Generate Report" },
    { doctorName: "Dr. Bryson", speciality: "Plastic Surgeon", practices: 240, score: 9, years: 17, imgSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/22efb22cd138ca4d8a77c79c9efb3519fe8c20749cb68ea46d8091b835556311?placeholderIfAbsent=true&apiKey=94fb06f7e4d44f66bb1cedf1d92b4f27", imgAlt: "Dr. Bryson profile", btnText: "Generate Report" }
  ];

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
                Specializes in {doctor?.specialty} in {doctor?.city}, {doctor?.state}.
              </div>
            </div>
          </div>
          <div className="flex flex-col ml-5 w-[37%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col mt-9 w-full max-md:mt-10">
              <div className="self-end text-4xl font-medium text-slate-900 max-md:mr-1">
                Practicing in {doctor?.city}, {doctor?.state}
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
              report.insights.map((insight, index) => (
                <div key={index} className="flex flex-col w-full text-slate-900 max-md:mt-10">
                  <div className="flex gap-5 px-5 py-3 text-3xl font-semibold whitespace-nowrap bg-orange-100 rounded-xl shadow-[0px_4px_17px_rgba(0,0,0,0.08)] max-md:px-5">
                    <img
                      loading="lazy"
                      src="https://via.placeholder.com/31"
                      alt={`Insight ${index + 1} icon`}
                      className="object-contain shrink-0 self-start aspect-square w-[31px]"
                    />
                    <div className="flex-auto">Insight {index + 1}</div>
                  </div>
                  <div className="self-center mt-7 text-lg font-medium text-center">
                    {insight}
                  </div>
                </div>
              ))
            ) : (
              <div>No insights available</div>
            )}
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="self-start mt-20 text-4xl font-bold text-slate-900 max-md:mt-10">
          Top Testimonials
        </div>
        <div className="mt-10 max-md:mr-1.5 max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`flex flex-col px-8 py-7 mx-auto w-full rounded-2xl shadow-[0px_2px_18px_rgba(0,0,0,0.1)] max-md:px-5 max-md:mt-6 ${
                  index < 2 ? "bg-blue-100" : "bg-red-100"
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
            {otherDoctors.map((doctor, index) => (
              <OtherDoctorCard
                key={index}
                doctorName={doctor?.doctorName}
                speciality={doctor?.speciality}
                practices={doctor?.practices}
                score={doctor?.score}
                years={doctor?.years}
                imgSrc={doctor?.imgSrc}
                imgAlt={doctor?.imgAlt}
                btnText={doctor?.btnText}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
