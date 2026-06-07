import React from "react";
import StatsBar from "./StatsBar";
import NumberBtn from "./NumberBtn";
import { useState, useEffect } from "react";
import ActionBtn from "./ActionBtn";
import NumberPad from "./ControlPanel";
import api from "../../api";
import { TruckElectricIcon } from "lucide-react";

export default function GameGrid({
  selectedCell,
  setSelectedCell,
  selectedNumber,
  setSelectedNumber,
  userBoard,
  setUserBoard,
  puzzle,
  solvedPuzzle,
  history,
  setHistory,
  marking,
  setMarking,
  markMode,
  errors,
  setErrors,
}) {
  const handleSetUserBoard = (row, col, num) => {
    if (markMode) {
      const updatedMarking = [...marking];
      updatedMarking[row][col][num - 1] = !updatedMarking[row][col][num - 1];
      setMarking(updatedMarking);
      setHistory([...history, { row, col, value: num, marking: true }]);
    } else {
      const updatedUserBoard = [...userBoard];
      updatedUserBoard[row][col] = num;
      setUserBoard(updatedUserBoard);
      setHistory([...history, { row, col, value: num }]);
    }
  };

  const handleMarking = (row, col, num) => {};

  useEffect(() => {
    if (selectedNumber !== null && selectedCell.row !== null && selectedCell.col !== null && puzzle[selectedCell.row][selectedCell.col] === 0) {
      handleSetUserBoard(selectedCell.row, selectedCell.col, selectedNumber);
      setSelectedNumber(null);
    }
  }, [selectedNumber, selectedCell]);

  useEffect(() => {
    if (solvedPuzzle && userBoard) {
      let count = 0;
      for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
          if (userBoard[r][c] !== null && userBoard[r][c] !== solvedPuzzle[r][c]) {
            count++;
          }
        }
      }
      setErrors(count);
    }
  }, [userBoard, solvedPuzzle]);

  return (
    <div className="flex justify-center  items-center border-3 overflow-hidden rounded-3xl border-[var(--color-pink-border)]/70 shadow-2xl">
      <div className="grid grid-cols-9 w-[540px] h-[540px] bg-[var(--color-surface)]/10  backdrop-blur-[2px] ">
        {puzzle.map((rowArr, row) =>
          rowArr.map((val, col) => {
            const borderClasses = [
              "border border-[var(--color-pink-border)]/70",
              col % 3 === 0 && col !== 0 ? "border-l-2 " : "",
              row % 3 === 0 && row !== 0 ? "border-t-2 " : "",
            ].join(" ");

            const isSelected =
              selectedCell.row === row && selectedCell.col === col
                ? "!bg-[var(--color-cell-same-highlight)]/40 !text-white hover:bg-[var(--color-cell-select)]"
                : "";

            const isSameRowOrCol = !isSelected && (selectedCell.row === row || selectedCell.col === col) ? "bg-[var(--color-cell-highlight)]/10" : "";

            const isSameBlock =
              selectedCell.row !== null &&
              selectedCell.col !== null &&
              !isSameRowOrCol &&
              Math.floor(row / 3) === Math.floor(selectedCell.row / 3) &&
              Math.floor(col / 3) === Math.floor(selectedCell.col / 3)
                ? "bg-[var(--color-cell-highlight)]/10"
                : "";

            const selectedValue =
              selectedCell.row !== null && selectedCell.col !== null
                ? puzzle[selectedCell.row][selectedCell.col] !== 0
                  ? puzzle[selectedCell.row][selectedCell.col]
                  : userBoard[selectedCell.row][selectedCell.col]
                : null;

            const value = puzzle[row][col] !== 0 ? puzzle[row][col] : userBoard[row][col];

            const textColor = userBoard[row][col] !== null && puzzle[row][col] === 0 ? "text-[var(--color-cell-text)]" : "text-cyan-500/95";
            const isCorrect =
              solvedPuzzle && userBoard[row][col] !== null && userBoard[row][col] !== solvedPuzzle[row][col]
                ? "!text-[var(--color-cell-error))] !bg-[var(--color-cell-error-highlight)]"
                : "";
            const isSameNumber =
              isCorrect === "" && selectedValue !== null && value === selectedValue ? "bg-[var(--color-cell-same-highlight)]/30 text-white" : "";

            return (
              <div
                key={`${row}-${col}`}
                className={`flex justify-center items-center w-[60px] h-[60px] text-2xl font-semibold ${borderClasses}  hover:bg-[var(--color-cell-same-highlight)]/20 hover:text-white ${textColor} ${isSelected} ${isSameNumber} ${isSameRowOrCol} ${isSameBlock} ${isCorrect}`}
                onClick={() => {
                  setSelectedCell({ row, col });
                }}
              >
                {value ? (
                  value
                ) : marking[row][col].length > 0 ? (
                  <div className="grid grid-cols-3 grid-rows-3  text-[#ba9bf8]/70 w-full h-full text-xs gap-1 font-light">
                    {Array.from({ length: 9 }).map((_, i) => (
                      <div key={i} className="flex justify-center items-center">
                        {marking[row][col][i] ? i + 1 : ""}
                      </div>
                    ))}
                  </div>
                ) : (
                  ""
                )}
              </div>
            );
          }),
        )}
      </div>
    </div>
  );
}
