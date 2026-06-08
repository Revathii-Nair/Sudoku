import react from "react";
import { useState } from "react";

export default function ProgressBar({ progress }) {
  return (
    <>
      <div className="flex flex-col justify-center items-center my-10">
        <div className=" bg-gray-100 rounded-full w-full max-w-[300px] md:max-w-[600px] shadow-md  ">
          <div
            className="bg-gradient-to-r from-[#279eec] to-[#16ffbd] h-2 rounded-full transition-all duration-300 ease-linear shadow-md shadow-[#34a988]"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="text-2xl font-semibold"></div>
      </div>
    </>
  );
}
