import Image from "next/image";
import * as React from "react";

interface TestimonialProps {
  author: string;
  procedure: string;
  date: string;
  description: string;
  imgSrc: string;
  imgAlt: string;
}

const Testimonial: React.FC<TestimonialProps> = ({ author, procedure, date, description, imgSrc, imgAlt }) => (
  <div className="flex flex-col px-8 py-7 mx-auto w-full bg-white rounded-2xl shadow-[0px_2px_18px_rgba(0,0,0,0.1)] max-md:px-5 max-md:mt-6">
    <div className="flex gap-5 justify-between w-full font-semibold text-center">
      <div className="flex gap-4">
        <Image
          loading="lazy"
          src={imgSrc}
          alt={imgAlt}
          className="object-contain shrink-0 rounded-full aspect-[0.98] w-[62px]"
        />
        <div className="flex flex-col self-start">
          <div className="text-xl text-black">{author}</div>
          <div className="self-start mt-1 text-sm text-zinc-400">
            {procedure}
          </div>
        </div>
      </div>
      <div className="self-end mt-8 text-sm text-zinc-400">
        {date}
      </div>
    </div>
    <div className="self-end mt-3 text-base font-medium text-slate-900">
      {description}
    </div>
  </div>
);

export default Testimonial;