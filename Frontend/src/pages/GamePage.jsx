import { useState, useEffect } from "react";
import GameGrid from "../components/GameGrid";
import ControlPanel from "../components/ControlPanel";
import ProgressBar from "../components/ProgressBar";
import api from "../../api";

export default function GamePage() {
  const [selectedCell, setSelectedCell] = useState({ row: null, col: null });
  const [puzzle, setPuzzle] = useState(null);
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [userBoard, setUserBoard] = useState(null);
  const [solvedPuzzle, setSolvedPuzzle] = useState(null);
  const [history, setHistory] = useState([]);
  const [redoHistory, setRedoHistory] = useState([]);
  const [progress, setProgress] = useState(0);
  const [puzzleSum, setPuzzleSum] = useState(0);
  const [isMarked, setMarked] = useState(false);

  const handleErase = () => {
    if (
      selectedCell.row !== null &&
      selectedCell.col !== null &&
      userBoard[selectedCell.row][selectedCell.col] !== null &&
      puzzle[selectedCell.row][selectedCell.col] === 0
    ) {
      const updatedUserBoard = [...userBoard];
      updatedUserBoard[selectedCell.row][selectedCell.col] = null;
      setUserBoard(updatedUserBoard);
    }
  };

  const handleHint = () => {
    for (var r = 0; r !== 9; r++) {
      for (var c = 0; c !== 9; c++) {
        if ((userBoard[r][c] === null || userBoard[r][c] !== solvedPuzzle[r][c]) && solvedPuzzle && puzzle[r][c] === 0) {
          const updatedUserBoard = [...userBoard];
          var value = solvedPuzzle[r][c];
          updatedUserBoard[r][c] = value;
          setUserBoard(updatedUserBoard);
          setHistory([...history, { row: r, col: c, value: value }]);
          return;
        }
      }
    }
  };

  const handleUndo = () => {
    if (userBoard !== null && history.length > 0) {
      const newHistory = [...history];
      const value = newHistory.pop();
      if (value) {
        const updatedUserBoard = [...userBoard];
        updatedUserBoard[value.row][value.col] = null;
        setUserBoard(updatedUserBoard);
        setHistory(newHistory);
        setRedoHistory([...redoHistory, value]);
      }
    }
  };

  const handleRedo = () => {
    if (userBoard !== null && redoHistory.length > 0) {
      const newRedoHistory = [...redoHistory];
      const value = newRedoHistory.pop();
      if (value) {
        const updatedUserBoard = [...userBoard];
        updatedUserBoard[value.row][value.col] = value.value;
        setUserBoard(updatedUserBoard);
        setRedoHistory(newRedoHistory);
        setHistory([...history, value]);
      }
    }
  };

  const handleMark = () => {
    isMarked ? setMarked(false) : setMarked(true);
  };

  useEffect(() => {
    if (userBoard === null) return;
    const sum = userBoard.reduce((acc, row) => acc + row.reduce((rowAcc, col) => rowAcc + (col !== null ? 1 : 0), 0), 0);

    const total = 81 - puzzleSum;
    setProgress((sum / total) * 100);
  }, [userBoard]);

  useEffect(() => {
    const handleApi = async () => {
      try {
        const p = await api.get("/getPuzzle");
        setPuzzle(p.data);
        setUserBoard(p.data.map((row) => row.map(() => null)));
        const firstsum = p.data.reduce((acc, row) => acc + row.reduce((rowAcc, col) => rowAcc + (col !== 0 ? 1 : 0), 0), 0);
        setPuzzleSum(firstsum);
        const solvedPuzzle = await api.post("/solve", { puzzle: p.data });
        setSolvedPuzzle(solvedPuzzle.data);
      } catch (err) {
        console.error("Puzzle API error:", err.response?.data || err.message);
      }
    };

    handleApi();
  }, []);

  return (
    <>
      {puzzle && userBoard && solvedPuzzle && (
        <>
          <div>
            <ProgressBar progress={progress} />
          </div>

          <div className="flex flex-col md:flex-row justify-center items-center gap-12">
            <GameGrid
              selectedCell={selectedCell}
              setSelectedCell={setSelectedCell}
              selectedNumber={selectedNumber}
              setSelectedNumber={setSelectedNumber}
              userBoard={userBoard}
              setUserBoard={setUserBoard}
              puzzle={puzzle}
              solvedPuzzle={solvedPuzzle}
              history={history}
              setHistory={setHistory}
            />
            <ControlPanel
              selectedNumber={selectedNumber}
              setSelectedNumber={setSelectedNumber}
              handleErase={handleErase}
              handleHint={handleHint}
              handleUndo={handleUndo}
              handleRedo={handleRedo}
            />
          </div>
        </>
      )}
    </>
  );
}
