import React from "react";

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

const SudokuGrid = () => {
  const flatPuzzle = sudokuPuzzle.flat();
  const cells = Array(81).fill(null);

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="grid grid-cols-9 w-[540px] h-[540px] bg-[#ffecec] rounded-3xl shadow-2xl overflow-hidden border-4 border-[#d946ef] ">
        {Array(81)
          .fill(null)
          .map((_, i) => {
            const row = Math.floor(i / 9);
            const col = i % 9;

            const borderClasses = [
              "border border-[#d946ef]",
              col % 3 === 0 && col != 0 ? "border-l-4 border-l-[#d946ef]" : "",
              row % 3 === 0 && row != 0 ? "border-t-3 border-t-[#d946ef]" : "",
            ].join(" ");

            return (
              <div key={i} className={`flex justify-center items-center text-blue-500 text-2xl font-semibold ${borderClasses}`}>
                {flatPuzzle[i] == 0 ? "" : flatPuzzle[i]}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default SudokuGrid;
