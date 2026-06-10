import React from "react";

export default function LoadingScreen() {
  return (
    <div className="absolute top-0 lg:h-screen w-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]">
      <div className="flex items-center justify-center h-screen w-screen">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-t-transparent border-[#ba9bf8] rounded-full animate-spin"></div>

          <p className="text-[#ba9bf8] text-lg font-semibold tracking-wide">Loading your puzzle...</p>
        </div>
      </div>
    </div>
  );
}
