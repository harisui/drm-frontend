import * as React from "react";

interface ProfileHeaderProps {
  doctorName: string;
  speciality: string;
  description: string;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  doctorName,
  speciality,
  description,
}) => (
  <div className="px-20 pt-16 pb-8 w-full bg-orange-100 max-md:px-5 max-md:max-w-full">
    <div className="flex gap-5 max-md:flex-col">
      <div className="flex flex-col w-[63%] max-md:ml-0 max-md:w-full">
        <div className="flex flex-col grow items-start font-medium text-slate-900 max-md:mt-10 max-md:max-w-full">
          <div className="text-7xl font-bold max-md:max-w-full max-md:text-4xl">
            {doctorName}
          </div>
          <div className="mt-1 text-4xl">{speciality}</div>
          <div className="self-stretch mt-20 text-2xl max-md:mt-10 max-md:max-w-full">
            {description}
          </div>
        </div>
      </div>
      <div className="flex flex-col ml-5 w-[37%] max-md:ml-0 max-md:w-full">
        <div className="flex flex-col mt-9 w-full max-md:mt-10">
          <div className="self-end text-4xl font-medium text-slate-900 max-md:mr-1">
            At Blah Clinic
          </div>
          <div className="flex gap-10 items-start px-8 pt-4 mt-14 text-white whitespace-nowrap rounded-3xl bg-slate-900 max-md:px-5 max-md:mt-10">
            <div className="grow shrink text-2xl font-medium w-[90px]">
              Execellent
            </div>
            <div className="flex gap-px">
              <div className="grow text-9xl max-md:text-4xl">9</div>
              <div className="self-end mt-20 text-6xl max-md:mt-10 max-md:text-4xl">
                /10
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default ProfileHeader;
