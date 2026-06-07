import React from "react";

const StatsBar = ({ hints = 0, errors = 0, progress }) => {
  return (
    <div className="flex items-center justify-between w-[400px] bg-neutral-400/20 rounded-full py-3 px-6 shadow-lg border border-[var(--color-pink-border)] backdrop-blur-[2px]">
      <div className="flex flex-col items-center flex-1">
        <span className="text-[#5cd3de] text-2xl font-bold">{hints}</span>
        <span className="text-xs tracking-widest text-neutral-300">HINTS</span>
      </div>

      <div className="h-8 w-px bg-[var(--color-pink-border)]" />

      <div className="flex flex-col items-center flex-1">
        <span className="text-red-500 text-2xl font-bold">{errors}</span>
        <span className="text-xs tracking-widest text-neutral-300">ERRORS</span>
      </div>

      <div className="h-8 w-px bg-[var(--color-pink-border)]" />

      <div className="flex flex-col items-center flex-1">
        <span className="text-[#5cd3de] text-2xl font-bold">{progress.toFixed(0)}%</span>
        <span className="text-xs tracking-widest text-neutral-300">DONE</span>
      </div>
    </div>
  );
};

export default StatsBar;
