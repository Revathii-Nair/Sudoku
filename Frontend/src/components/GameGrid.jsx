import React from "react";
import StatsBar from "./StatBar";
import NumberBtn from "./NumberBtn";
import { useState } from "react";
import ActionBtn from "./ActionBtn";
import NumberPad from "./ControlPanel";

const sudokuPuzzle = [
  [5, 3, 0, 0, 7, 0, 0, 0, 0],
  [6, 0, 0, 1, 9, 5, 0, 0, 0],
  [0, 9, 8, 0, 0, 0, 0, 6, 0],
  [8, 0, 0, 0, 6, 0, 0, 0, 3],
  [4, 0, 0, 8, 0, 3, 0, 0, 1],
  [7, 0, 0, 0, 2, 0, 0, 0, 6],
  [0, 6, 0, 0, 0, 0, 2, 8, 0],
  [0, 0, 0, 4, 1, 9, 0, 0, 5],
  [0, 0, 0, 0, 8, 0, 0, 7, 9],
];

export default function GameGrid() {
  const flatPuzzle = sudokuPuzzle.flat();
  const cells = Array(81).fill(null);

  return (
    <>
      <div className="flex justify-center items-center ">
        <div className="grid grid-cols-9 aspect-square w-[540px] h-[540px] bg-[var(--color-surface)] rounded-3xl shadow-2xl overflow-hidden border-2 border-[var(--color-pink-border)]">
          {Array(81)
            .fill(null)
            .map((_, i) => {
              const row = Math.floor(i / 9);
              const col = i % 9;

              const borderClasses = [
                "border border-[var(--color-pink-border)]",
                col % 3 === 0 && col != 0 ? "border-l-2 border-l-[var(--color-pink-border)]" : "",
                row % 3 === 0 && row != 0 ? "border-t-2 border-t-[var(--color-pink-border)]" : "",
              ].join(" ");

              return (
                <div key={i} className={`flex justify-center items-center text-blue-500 text-2xl font-semibold ${borderClasses} hover:bg-[#aedcea] `}>
                  {flatPuzzle[i] == 0 ? "" : flatPuzzle[i]}
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}
