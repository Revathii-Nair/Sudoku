import React from "react";
import StatsBar from "./StatBar";
import NumberBtn from "./NumberBtn";
import { useState, useEffect } from "react";
import ActionBtn from "./ActionBtn";
import NumberPad from "./ControlPanel";

export default function GameGrid({ selectedCell, setSelectedCell, selectedNumber }) {
  const mainPuzzle = [
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
  const [puzzle, setPuzzle] = useState(mainPuzzle);
  const [userBoard, setUserBoard] = useState(mainPuzzle.map((row) => row.map(() => null)));

  const handleSetUserBoard = (row, col, num) => {
    const updatedUserBoard = [...userBoard];
    updatedUserBoard[row][col] = num;
    setUserBoard(updatedUserBoard);
  };

  useEffect(() => {
    if (selectedNumber !== null && selectedCell.row !== null && selectedCell.col !== null) {
      handleSetUserBoard(selectedCell.row, selectedCell.col, selectedNumber);
    }
  }, [selectedNumber, selectedCell]);

  return (
    <div className="flex justify-center items-center">
      <div className="grid grid-cols-9 aspect-square w-[540px] h-[540px] bg-[var(--color-surface)] rounded-3xl shadow-2xl overflow-hidden border-2 border-[var(--color-pink-border)]">
        {puzzle.map((rowArr, row) =>
          rowArr.map((val, col) => {
            const borderClasses = [
              "border border-[var(--color-pink-border)]",
              col % 3 === 0 && col !== 0 ? "border-l-2 " : "",
              row % 3 === 0 && row !== 0 ? "border-t-2 " : "",
            ].join(" ");

            const isSelected =
              selectedCell.row === row && selectedCell.col === col
                ? "bg-[var(--color-cell-select)] !text-blue-900 hover:bg-[var(--color-cell-select)] border-blue-200 "
                : "";

            const isSameRowOrCol = !isSelected && (selectedCell.row === row || selectedCell.col === col) ? "bg-[var(--color-cell-highlight)]" : "";

            const isSameBlock =
              selectedCell.row !== null &&
              selectedCell.col !== null &&
              !isSameRowOrCol &&
              Math.floor(row / 3) === Math.floor(selectedCell.row / 3) &&
              Math.floor(col / 3) === Math.floor(selectedCell.col / 3)
                ? "bg-[var(--color-cell-highlight)]"
                : "";

            const selectedValue =
              selectedCell.row !== null && selectedCell.col !== null
                ? puzzle[selectedCell.row][selectedCell.col] !== 0
                  ? puzzle[selectedCell.row][selectedCell.col]
                  : userBoard[selectedCell.row][selectedCell.col]
                : null;

            const value = puzzle[row][col] !== 0 ? puzzle[row][col] : userBoard[row][col];

            const isSameNumber = selectedValue !== null && value === selectedValue ? "bg-[var(--color-cell-highlight)] !text-blue-900" : "";

            const textColor = userBoard[row][col] !== null && puzzle[row][col] === 0 ? "text-cyan-500 " : "text-blue-500";

            return (
              <div
                key={`${row}-${col}`}
                className={`flex justify-center items-center  text-2xl font-semibold ${borderClasses}  hover:bg-[var(--color-cell-highlight)] ${textColor} ${isSelected} ${isSameNumber} ${isSameRowOrCol} ${isSameBlock} `}
                onClick={() => {
                  setSelectedCell({ row, col });
                }}
              >
                {value}
              </div>
            );
          }),
        )}
      </div>
    </div>
  );
}
