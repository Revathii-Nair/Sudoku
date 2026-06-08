import React from "react";

export default function GameModeCard({ mode, setGameMode, selectedGameMode }) {
  const isActive = selectedGameMode === mode;

  return (
    <div>
      <button
        onClick={() => setGameMode(mode)}
        className={`flex flex-col justify-center items-center w-25 h-10 rounded-4xl shadow-lg border-2
          transition-all duration-200   text-[var(--color-pink-border)] hover:bg-[#f6b3f6] cursor-pointer
          ${isActive ? "!bg-[#6d0d6da6]  border-neutral-400/80  " : "bg-neutral-400/15  border-[var(--color-pink-border)]/70 backdrop-blur-[1px]"}  }
        `}
      >
        <span className="mt-1 text-sm font-semibold">{mode}</span>
      </button>
    </div>
  );
}
