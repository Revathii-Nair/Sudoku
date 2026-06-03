import { useState } from "react";
import GameGrid from "../components/GameGrid";
import ControlPanel from "../components/ControlPanel";
import ProgressBar from "../components/ProgressBar";

export default function GamePage() {
  return (
    <>
      <div>
        <ProgressBar />
      </div>
      <div className="flex flex-col md:flex-row justify-center items-center gap-12">
        <GameGrid />
        <ControlPanel />
      </div>
    </>
  );
}
