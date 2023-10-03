import React from "react";
import Image, { StaticImageData } from "next/image";

interface Porps {
  title: string;
  desc: string;
  img: StaticImageData;
}

export default function Card({ title, desc, img }: Porps) {
  return (
    <div className=" cursor-pointer hover:scale-105 p-3 transition-all ease-in-out group rounded-xl  w-[250px] min-h-[250px] border border-gray-800 bg-white flex flex-col items-center justify-center">
      <Image
        className="transition-all ease-in-out group-hover:scale-105 max-h-[230px] object-cover"
        src={img}
        alt=""
      />
      <div className=" self-start mt-2 font-semibold text-black tracking-wide">
        {title}
      </div>
      <div className=" self-start mt-2 text-sm font-semibold text-black tracking-wide">
        {desc}
      </div>
    </div>
  );
}
