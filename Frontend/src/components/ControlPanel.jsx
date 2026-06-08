import react from "react";
import { useState } from "react";
import ActionBtn from "./ActionBtn";
import StatsBar from "./StatsBar";
import NumberBtn from "./NumberBtn";
import { X, Undo2, Lightbulb, PencilLine, Eraser, Redo2 } from "lucide-react";
import NumberPanel from "./NumberPanel";

export default function ControlPanel({
  selectedNumber,
  setSelectedNumber,
  handleErase,
  handleHint,
  handleUndo,
  handleRedo,
  markMode,
  setMarkMode,
  hints,
  errors,
  progress,
  time,
}) {
  return (
    <>
      <div className="ml-1 flex flex-col gap-6 items-center">
        <div className="flex gap-6">
          <ActionBtn action="Erase" Icon={Eraser} color="color-red-500" onClick={handleErase}></ActionBtn>
          <ActionBtn action="Undo" Icon={Undo2} color="color-btn" onClick={handleUndo}></ActionBtn>
          <ActionBtn action="Redo" Icon={Redo2} color="color-btn" onClick={handleRedo}></ActionBtn>

          <ActionBtn action="Hint" Icon={Lightbulb} color="color-yellow" onClick={handleHint}></ActionBtn>
          <ActionBtn action="Mark" Icon={PencilLine} color="color-secondary" onClick={() => setMarkMode(!markMode)} markMode={markMode}></ActionBtn>
        </div>

        <NumberPanel selectedNumber={selectedNumber} setSelectedNumber={setSelectedNumber} />

        <StatsBar hints={hints} errors={errors} progress={progress} time={time} />
      </div>
    </>
  );
}
