import * as React from "react";
import ProfileHeader from "./ProfileHeader";
import KeyInsight from "./KeyInsight";
import Testimonial from "./Testimonial";
import OtherDoctorCard from "./OtherDoctorCard";


const DoctorProfile = () => {
  const insights = [
    { title: "Talkative", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.", imgSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/3e6856f17acd5993f98f392c7f3bd8582ac1562aba225530db3e991dfbeb31b9?placeholderIfAbsent=true&apiKey=94fb06f7e4d44f66bb1cedf1d92b4f27", imgAlt: "Talkative icon" },
    { title: "Bedside Manner", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.", imgSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/4b39c205c216880e98608584018d1651d656f2f3c1fee0044f2ffab8df974227?placeholderIfAbsent=true&apiKey=94fb06f7e4d44f66bb1cedf1d92b4f27", imgAlt: "Bedside Manner icon" },
    { title: "Lorem ipsum", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.", imgSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/666994f52dc4036e61400399272daaadb3ab28d0acd6bdfbafb5573bc3850d23?placeholderIfAbsent=true&apiKey=94fb06f7e4d44f66bb1cedf1d92b4f27", imgAlt: "Lorem ipsum icon" },
  ];

  const testimonials = [
    { author: "Agnes Remi", procedure: "Rhinoplasty", date: "June, 2024", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.", imgSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/188b383ec4cf7de95bfe5a20e9678e4e06f75a558ab9c8b580bef297555670d9?placeholderIfAbsent=true&apiKey=94fb06f7e4d44f66bb1cedf1d92b4f27", imgAlt: "Agnes Remi profile" },
    { author: "Agnes Remi", procedure: "Rhinoplasty", date: "June, 2024", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.", imgSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/9b36d038a0a14d20abe4f6722ad31408a91769eebce9c92240d396a631271ec3?placeholderIfAbsent=true&apiKey=94fb06f7e4d44f66bb1cedf1d92b4f27", imgAlt: "Agnes Remi profile" },
    { author: "Agnes Remi", procedure: "Rhinoplasty", date: "June, 2024", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.", imgSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/9ec28965abc87b7677c351bb24c9024b604d7ebda7adde722b17896579cb5771?placeholderIfAbsent=true&apiKey=94fb06f7e4d44f66bb1cedf1d92b4f27", imgAlt: "Agnes Remi profile" }
  ];

  const otherDoctors = [
    { doctorName: "Dr. Bryson", speciality: "Plastic Surgeon", practices: 240, score: 9, years: 17, imgSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/5ce59305fa8206dc231d77f3c42313c9eafba1cec12bc965d6aaf3e1acaa3ad6?placeholderIfAbsent=true&apiKey=94fb06f7e4d44f66bb1cedf1d92b4f27", imgAlt: "Dr. Bryson profile", btnText: "Generate Report" },
    { doctorName: "Dr. Bryson", speciality: "Plastic Surgeon", practices: 240, score: 9, years: 17, imgSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/f72ca2a141f983162a45111238163124a9c4fd774868ce5cfba7c2510910592f?placeholderIfAbsent=true&apiKey=94fb06f7e4d44f66bb1cedf1d92b4f27", imgAlt: "Dr. Bryson profile", btnText: "Generate Report" },
    { doctorName: "Dr. Bryson", speciality: "Plastic Surgeon", practices: 240, score: 9, years: 17, imgSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/22efb22cd138ca4d8a77c79c9efb3519fe8c20749cb68ea46d8091b835556311?placeholderIfAbsent=true&apiKey=94fb06f7e4d44f66bb1cedf1d92b4f27", imgAlt: "Dr. Bryson profile", btnText: "Generate Report" }
  ];

  return (
    <div className="flex overflow-hidden flex-col bg-white">
      <ProfileHeader 
        doctorName="Dr John Doe"
        speciality="Plastic Surgeon"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      />
      <div className="flex flex-col px-20 mt-16 w-full max-md:px-5 max-md:mt-10 max-md:max-w-full">
        <div className="self-start text-4xl font-bold text-slate-900">
          Key Insights
        </div>
        <div className="mt-6 max-md:mr-2.5 max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col">
            {insights.map((insight, index) => (
              <KeyInsight
                key={index}
                title={insight.title}
                description={insight.description}
                imgSrc={insight.imgSrc}
                imgAlt={insight.imgAlt}
              />
            ))}
          </div>
        </div>
        <div className="self-start mt-20 text-4xl font-bold text-slate-900 max-md:mt-10">
          Top Testimonials
        </div>
        <div className="mt-10 max-md:mr-1.5 max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col">
            {testimonials.map((testimonial, index) => (
              <Testimonial
                key={index}
                author={testimonial.author}
                procedure={testimonial.procedure}
                date={testimonial.date}
                description={testimonial.description}
                imgSrc={testimonial.imgSrc}
                imgAlt={testimonial.imgAlt}
              />
            ))}
          </div>
        </div>
        <div className="self-start mt-20 text-4xl font-bold text-slate-900 max-md:mt-10">
          Summary
        </div>
        <div className="mt-5 text-2xl font-medium text-slate-900 max-md:max-w-full">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu.
        </div>
      </div>
      <div className="flex flex-col px-20 pt-14 pb-24 mt-20 w-full bg-sky-100 max-md:px-5 max-md:mt-10 max-md:max-w-full">
        <div className="self-start text-4xl font-bold text-slate-900 max-md:max-w-full">
          Get Reports on Other Doctors
        </div>
        <div className="mt-11 w-full max-md:mt-10 max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col">
            {otherDoctors.map((doctor, index) => (
              <OtherDoctorCard
                key={index}
                doctorName={doctor.doctorName}
                speciality={doctor.speciality}
                practices={doctor.practices}
                score={doctor.score}
                years={doctor.years}
                imgSrc={doctor.imgSrc}
                imgAlt={doctor.imgAlt}
                btnText={doctor.btnText}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;