import { useState } from "react";
import GameGrid from "../components/GameGrid";
import ControlPanel from "../components/ControlPanel";
import ProgressBar from "../components/ProgressBar";

export default function GamePage() {
  const [selectedCell, setSelectedCell] = useState({ row: null, col: null });
  const [selectedNumber, setSelectedNumber] = useState(null);

  const handleNumberSelect = (num) => {
    if (selectedNumber === num) setSelectedNumber(null);
    else setSelectedNumber(num);
  };

  return (
    <>
      <div>
        <ProgressBar />
      </div>
      <div className="flex flex-col md:flex-row justify-center items-center gap-12">
        <GameGrid selectedCell={selectedCell} setSelectedCell={setSelectedCell} selectedNumber={selectedNumber} />
        <ControlPanel selectedNumber={selectedNumber} setSelectedNumber={handleNumberSelect} />
      </div>
    </>
  );
}
