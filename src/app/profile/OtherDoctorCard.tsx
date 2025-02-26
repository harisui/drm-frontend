import * as React from "react";

interface OtherDoctorCardProps {
  doctorName: string;
  speciality: string;
  practices: number;
  score: number;
  years: number;
  imgSrc: string;
  imgAlt: string;
  btnText: string;
}

const OtherDoctorCard: React.FC<OtherDoctorCardProps> = ({ doctorName, speciality, practices, score, years, imgSrc, imgAlt, btnText }) => (
  <div className="grow px-8 py-6 w-full bg-blue-200 rounded-3xl max-md:px-5 max-md:mt-6">
    <div className="flex gap-5 max-md:flex-col">
      <div className="flex flex-col w-[31%] max-md:ml-0 max-md:w-full">
        <img
          loading="lazy"
          src={imgSrc}
          alt={imgAlt}
          className="object-contain grow shrink-0 max-w-full rounded-lg aspect-[0.65] w-[102px] max-md:mt-9"
        />
      </div>
      <div className="flex flex-col ml-5 w-[69%] max-md:ml-0 max-md:w-full">
        <div className="flex flex-col w-full max-md:mt-9">
          <div className="flex gap-5 justify-between text-black">
            <div className="flex flex-col items-start">
              <div className="text-xl font-bold">{doctorName}</div>
              <div className="mt-2 text-xs font-medium">{speciality}</div>
              <div className="flex gap-4 self-stretch mt-2 w-full">
                <div className="flex flex-1 gap-1 items-start px-1 py-px whitespace-nowrap bg-white rounded">
                  <div className="flex gap-0.5 self-start">
                    <div className="grow self-start text-xs font-medium">Score</div>
                    <div className="text-3xl font-bold">{score}</div>
                  </div>
                  <div className="self-end mt-6 text-xs font-bold">/10</div>
                </div>
                <div className="flex flex-col flex-1 px-1 py-px bg-white rounded">
                  <div className="text-xs font-medium">Years of Practice</div>
                  <div className="self-end text-xl font-bold text-right">
                    {years}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col self-start mt-5">
              <div className="text-xs font-medium text-right"><br /> Mamoplastika </div>
              <div className="flex flex-col items-start px-1 py-px mt-2 bg-white rounded">
                <div className="text-xs font-medium">Surgeons per 2024</div>
                <div className="ml-5 text-xl font-bold text-right max-md:ml-2.5">{practices}</div>
              </div>
            </div>
          </div>
          <button className="px-14 py-3 mt-7 text-sm font-medium text-center text-white rounded-lg bg-slate-900 max-md:px-5">
            {btnText}
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default OtherDoctorCard;