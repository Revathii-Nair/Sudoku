import { useState, useEffect } from "react";
import GameGrid from "../components/GameGrid";
import ControlPanel from "../components/ControlPanel";
import ProgressBar from "../components/ProgressBar";
import api from "../../api";

export default function GamePage() {
  const [selectedCell, setSelectedCell] = useState({ row: null, col: null });
  const [selectedNumber, setSelectedNumber] = useState(null);

  useEffect(() => {
    const handleApi = async () => {
      try {
        const puzzle = await api.get("/");
        console.log(puzzle.data);
      } catch {
        console.error("API fetch error:", err);
      }
    };
    handleApi();
  }, []);

  return (
    <>
      <div>
        <ProgressBar />
      </div>
      <div className="flex flex-col md:flex-row justify-center items-center gap-12">
        <GameGrid
          selectedCell={selectedCell}
          setSelectedCell={setSelectedCell}
          selectedNumber={selectedNumber}
          setSelectedNumber={setSelectedNumber}
        />
        <ControlPanel selectedNumber={selectedNumber} setSelectedNumber={setSelectedNumber} />
      </div>
    </>
  );
}
