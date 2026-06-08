import React from "react";
import { X, Trophy } from "lucide-react";

export default function GameCompleteModal({ ModalOpen, setModalOpen, time = 4, errors = 5, hints = 0, gameMode, setGameMode }) {
  const onNextMode = () => {
    const nextModeMap = {
      EASY: "MEDIUM",
      MEDIUM: "HARD",
      HARD: "EASY",
    };
    setModalOpen(false);
    setGameMode((prev) => nextModeMap[prev]);
  };

  return (
    <div
      className={`fixed inset-0 flex items-center  justify-center   ${ModalOpen ? "visible backdrop-blur-[3px] bg-black/60" : "invisible"}  transition-all`}
    >
      <div className="relative bg-[#0b0b1d] text-white rounded-3xl p-8 shadow-[0_0_30px_rgba(80,30,224,0.3)] border border-[#ba9bf8]/40 flex flex-col items-center justify-center">
        <button
          onClick={() => {
            setModalOpen(false);
          }}
          className="absolute scale-80 top-4 right-4 cursor-pointer text-gray-400 hover:text-white "
        >
          <X />
        </button>

        <div className="w-20 h-20  flex items-center justify-center  mb-4">
          <Trophy className="items-center justify-center  w-16 h-16 text-[var(--color-pink-border)]  animate-pulse stroke-1 " />
        </div>

        <p className="text-sm text-[#5ac8fa] tracking-widest text-center my-1">LEVEL COMPLETE</p>

        <h2 className="text-3xl font-extrabold text-center text-white my-1">Puzzle Solved!</h2>

        <div className="flex justify-center gap-4 m-4 my-10">
          <div className="flex flex-col items-center bg-[#1a1a2e] rounded-xl px-4 py-2">
            <span className="text-yellow-200 text-lg font-bold">{time}</span>
            <span className="text-xs text-gray-400">TIME</span>
          </div>
          <div className="flex flex-col items-center bg-[#1a1a2e] rounded-xl px-4 py-2">
            <span className="text-yellow-200 text-lg font-bold">{errors}</span>
            <span className="text-xs text-gray-400">ERRORS</span>
          </div>
          <div className="flex flex-col items-center bg-[#1a1a2e] rounded-xl px-4 py-2">
            <span className="text-yellow-200 text-lg font-bold">{hints}</span>
            <span className="text-xs text-gray-400">HINTS</span>
          </div>
        </div>

        <div className="flex justify-center gap-4  ">
          <button
            onClick={onNextMode}
            className="px-6 py-3 border cursor-pointer bg-neutral-800/30 border-[#ba9bf8]/40  rounded-xl hover:bg-[#f6b3f6]/60 hover:scale-110  transition-transform transition-colors duration-300 ease-in-out"
          >
            Play Next Mode
          </button>
          <button
            onClick={() => {
              setModalOpen(false);
            }}
            className="px-6 py-3 border cursor-pointer bg-neutral-800/30 border-[#ba9bf8]/40  rounded-xl   hover:bg-[#f6b3f6]/60 hover:scale-110 transition-transform transition-colors duration-300 ease-in-out  "
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
