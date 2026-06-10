import React, { useState } from "react";
import GameGrid from "../components/GameGrid";
import ControlPanel from "../components/ControlPanel";
import api from "../../api";

export default function SolverPage() {
  const emptyBoard = Array(9)
    .fill(0)
    .map(() => Array(9).fill(0));

  const [userBoard, setUserBoard] = useState(emptyBoard);
  const [solvedPuzzle, setSolvedPuzzle] = useState(null);
  const [selectedCell, setSelectedCell] = useState({ row: null, col: null });
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [history, setHistory] = useState([]);
  const [redoHistory, setRedoHistory] = useState([]);
  const [error, setError] = useState(null);

  const handleSolve = async () => {
    const isFull = userBoard.every((row) => row.every((cell) => cell !== 0));
    if (isFull) {
      setError("Board is already filled.");
      return;
    }

    let res;
    try {
      res = await api.post("/solve", { puzzle: userBoard });
    } catch (err) {
      if (err.response?.status === 429) {
        setError("Too many requests, please try again in some time.");
      } else {
        setError("Error solving puzzle.");
      }
    }

    if (res.data === false) {
      setError("No solution found for this puzzle.");
      return;
    } else {
      setError(null);
    }

    const solution = res.data;
    setSolvedPuzzle(solution);

    let i = 0;
    const interval = setInterval(() => {
      if (i >= 81) {
        clearInterval(interval);
        return;
      }

      const r = Math.floor(i / 9);
      const c = i % 9;

      setUserBoard((prev) => {
        const updated = prev.map((row) => [...row]);
        updated[r][c] = solution[r][c];
        return updated;
      });

      i++;
    }, 10);
  };

  const handleErase = () => {
    if (selectedCell.row !== null && selectedCell.col !== null && userBoard[selectedCell.row][selectedCell.col] !== null) {
      const updatedUserBoard = [...userBoard];
      updatedUserBoard[selectedCell.row][selectedCell.col] = 0;
      setUserBoard(updatedUserBoard);
    }
  };

  const handleUndo = () => {
    if (userBoard !== null && history.length > 0) {
      const newHistory = [...history];
      const value = newHistory.pop();
      if (value && value.marking !== true) {
        const updatedUserBoard = [...userBoard];
        updatedUserBoard[value.row][value.col] = null;
        setUserBoard(updatedUserBoard);
        setHistory(newHistory);
        setRedoHistory([...redoHistory, value]);
      } else {
        const updatedMarking = [...marking];
        updatedMarking[value.row][value.col][value.value - 1] = !updatedMarking[value.row][value.col][value.value - 1];
        setMarking(updatedMarking);
        setHistory(newHistory);
        setRedoHistory([...redoHistory, value]);
      }
    }
  };

  const handleRedo = () => {
    if (userBoard !== null && redoHistory.length > 0) {
      const newRedoHistory = [...redoHistory];
      const value = newRedoHistory.pop();
      if (value && value.marking !== true) {
        const updatedUserBoard = [...userBoard];
        updatedUserBoard[value.row][value.col] = value.value;
        setUserBoard(updatedUserBoard);
        setRedoHistory(newRedoHistory);
        setHistory([...history, value]);
      } else {
        const updatedMarking = [...marking];
        updatedMarking[value.row][value.col][value.value - 1] = !updatedMarking[value.row][value.col][value.value - 1];
        setMarking(updatedMarking);
        setRedoHistory(newRedoHistory);
        setHistory([...history, value]);
      }
    }
  };

  const handleClear = () => {
    const emptyBoard = Array(9)
      .fill(0)
      .map(() => Array(9).fill(0));

    setUserBoard(emptyBoard);
    setSolvedPuzzle(null);
    setSelectedCell({ row: null, col: null });
    setSelectedNumber(null);
    setHistory([]);
    setRedoHistory([]);
  };

  return (
    <>
      <div className="mb-6 flex flex-row justify-center text-center items-center mx-4 my-6 backdrop-blur-[1px]">
        {
          <p className="bg-blue-900/40   border-neutral-400/20  border transition-all transition-duration-200 text-[#1074b7fc] font-bold text-lg px-10 py-3 rounded-xl">
            Fill in the numbers in the grid and press <strong>'Solve'</strong> to get the solution.
          </p>
        }
      </div>
      <div className="flex flex-col z-0  lg:flex-row  justify-center items-center gap-12 my-11">
        <div>
          <div className="mb-6 text-center min-h-[2rem]">
            {error && (
              <span className="bg-red-700/40 border-neutral-400/20 border transition-all transition-duration-200 text-[#fa0808fc] font-bold text-lg px-10 py-3 rounded-xl">
                {error}
              </span>
            )}
          </div>

          <GameGrid
            selectedCell={selectedCell}
            setSelectedCell={setSelectedCell}
            selectedNumber={selectedNumber}
            setSelectedNumber={setSelectedNumber}
            userBoard={userBoard}
            setUserBoard={setUserBoard}
            puzzle={emptyBoard}
            history={history}
            setHistory={setHistory}
            solvedPuzzle={solvedPuzzle}
            modalOpen={false}
            mode="solver"
          />
        </div>
        <div className="mt-13">
          <ControlPanel
            selectedNumber={selectedNumber}
            setSelectedNumber={setSelectedNumber}
            handleErase={handleErase}
            handleUndo={handleUndo}
            handleRedo={handleRedo}
            handleClear={handleClear}
            onSolve={handleSolve}
            mode="solver"
          />
        </div>
      </div>
    </>
  );
}
