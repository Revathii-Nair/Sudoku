import { useState, useEffect, useRef } from "react";
import GameGrid from "../components/GameGrid";
import ControlPanel from "../components/ControlPanel";
import ProgressBar from "../components/ProgressBar";
import GameModeCard from "../components/GameModeCard";
import LoadingScreen from "../components/LoadingPage";
import api from "../../api";
import GameCompleteModal from "../components/GameCompleteModal";

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
  const [markMode, setMarkMode] = useState(false);
  const [marking, setMarking] = useState(null);
  const [gameMode, setGameMode] = useState("EASY");
  const [hints, setHints] = useState(0);
  const [errors, setErrors] = useState(0);
  const [totalErrors, setTotalErrors] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef(null);

  const handleErase = () => {
    if (
      selectedCell.row !== null &&
      selectedCell.col !== null &&
      (userBoard[selectedCell.row][selectedCell.col] !== null || marking[selectedCell.row][selectedCell.col].some((value) => value)) &&
      puzzle[selectedCell.row][selectedCell.col] === 0
    ) {
      const updatedUserBoard = [...userBoard];
      updatedUserBoard[selectedCell.row][selectedCell.col] = null;
      setUserBoard(updatedUserBoard);

      const updatedMarking = [...marking];
      updatedMarking[selectedCell.row][selectedCell.col] = Array(9).fill(false);
      setMarking(updatedMarking);
    }
  };

  const handleHint = () => {
    for (let r = 0; r !== 9; r++) {
      for (let c = 0; c !== 9; c++) {
        if ((userBoard[r][c] === null || userBoard[r][c] !== solvedPuzzle[r][c]) && solvedPuzzle && puzzle[r][c] === 0) {
          const updatedUserBoard = [...userBoard];
          let value = solvedPuzzle[r][c];
          updatedUserBoard[r][c] = value;
          setUserBoard(updatedUserBoard);
          setHistory([...history, { row: r, col: c, value: value }]);
          setHints(hints + 1);
          return;
        }
      }
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

  const formatTime = (s) => {
    const min = Math.floor(s / 60);
    const sec = s % 60;
    return `${min}:${sec.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    if (userBoard === null) return;
    const filled = userBoard.reduce((acc, row) => acc + row.reduce((rowAcc, col) => rowAcc + (col !== null ? 1 : 0), 0), 0);
    const sum = filled - errors;
    const total = 81 - puzzleSum;
    setProgress((sum / total) * 100);
  }, [userBoard, errors]);

  useEffect(() => {
    if (progress === 100) {
      setModalOpen(true);

      setSelectedCell({ row: null, col: null });
      setSelectedNumber(null);

      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, [progress]);

  useEffect(() => {
    const handleApi = async () => {
      try {
        const p = await api.get(`/getRandomPuzzle/${gameMode}`);
        setPuzzle(p.data);
        setUserBoard(p.data.map((row) => row.map(() => null)));

        const firstsum = p.data.reduce((acc, row) => acc + row.reduce((rowAcc, col) => rowAcc + (col !== 0 ? 1 : 0), 0), 0);
        setPuzzleSum(firstsum);

        const solvedPuzzle = await api.post("/solve", { puzzle: p.data });
        setSolvedPuzzle(solvedPuzzle.data);

        setMarking(p.data.map((row) => row.map(() => Array(9).fill(false))));
        console.log(p.data.map((row) => row.map(() => Array(9).fill(false))));

        setHints(0);
        setSeconds(0);
        clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
          setSeconds((s) => s + 1);
        }, 1000);
      } catch (err) {
        console.error("Puzzle API error:", err.response?.data || err.message);
      }

      return () => clearInterval(intervalRef.current);
    };

    handleApi();
  }, [gameMode]);

  return (
    <>
      {puzzle && userBoard && solvedPuzzle ? (
        <>
          <div>
            <div className="flex flex-row gap-3 justify-center items-center mx-4 my-6">
              <GameModeCard mode="EASY" setGameMode={setGameMode} selectedGameMode={gameMode}></GameModeCard>
              <GameModeCard mode="MEDIUM" setGameMode={setGameMode} selectedGameMode={gameMode}></GameModeCard>
              <GameModeCard mode="HARD" setGameMode={setGameMode} selectedGameMode={gameMode}></GameModeCard>
            </div>

            <div>
              <ProgressBar progress={progress} />
            </div>

            <div className="flex flex-col lg:flex-row  justify-center items-center gap-12 my-15">
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
                marking={marking}
                setMarking={setMarking}
                markMode={markMode}
                errors={errors}
                setErrors={setErrors}
                setTotalErrors={setTotalErrors}
                modalOpen={modalOpen}
              />
              <ControlPanel
                selectedNumber={selectedNumber}
                setSelectedNumber={setSelectedNumber}
                handleErase={handleErase}
                handleHint={handleHint}
                handleUndo={handleUndo}
                handleRedo={handleRedo}
                markMode={markMode}
                setMarkMode={setMarkMode}
                hints={hints}
                errors={errors}
                progress={progress}
                time={formatTime(seconds)}
              />
            </div>
          </div>
          <div>
            <GameCompleteModal
              ModalOpen={modalOpen}
              setModalOpen={setModalOpen}
              errors={totalErrors}
              hints={hints}
              time={formatTime(seconds)}
              gameMode={gameMode}
              setGameMode={setGameMode}
            ></GameCompleteModal>
          </div>
        </>
      ) : (
        <LoadingScreen />
      )}
    </>
  );
}
