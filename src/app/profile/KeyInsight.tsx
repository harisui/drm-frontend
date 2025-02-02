import * as React from "react";

interface KeyInsightProps {
  title: string;
  description: string;
  imgSrc: string;
  imgAlt: string;
}

const KeyInsight: React.FC<KeyInsightProps> = ({ title, description, imgSrc, imgAlt }) => (
  <div className="flex flex-col w-full text-slate-900 max-md:mt-10">
    <div className="flex gap-5 px-5 py-3 text-3xl font-semibold whitespace-nowrap bg-orange-100 rounded-xl shadow-[0px_4px_17px_rgba(0,0,0,0.08)] max-md:px-5">
      <img
        loading="lazy"
        src={imgSrc}
        alt={imgAlt}
        className="object-contain shrink-0 self-start aspect-square w-[31px]"
      />
      <div className="flex-auto">{title}</div>
    </div>
    <div className="self-center mt-7 text-lg font-medium text-center">
      {description}
    </div>
  </div>
);

export default KeyInsight;