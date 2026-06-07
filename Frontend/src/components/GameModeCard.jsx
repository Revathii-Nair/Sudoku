import React from "react";

export default function GameModeCard({ mode, setGameMode }) {
  return (
    <>
      <div className=" ">
        <button
          className="flex flex-col justify-center items-center w-25 h-10 rounded-4xl shadow-lg border-[var(--color-pink-border)]/50  border-2 transition-colors duration-200 hover:shadow-lg hover:bg-[#f6b3f6] hover:border-0 hover:scale-110  text-[var(--color-pink-border)] bg-neutral-400/20 backdrop-blur-[1px]"
          onClick={() => setGameMode(mode)}
        >
          <span className="mt-1 text-sm font-semibold transition-colors duration-200 group-hover:font-bold">{mode}</span>
        </button>
      </div>
    </>
  );
}
