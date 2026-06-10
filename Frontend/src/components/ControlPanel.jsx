import react from "react";
import { useState } from "react";
import ActionBtn from "./ActionBtn";
import StatsBar from "./StatsBar";
import NumberBtn from "./NumberBtn";
import { X, Undo2, Lightbulb, PencilLine, Eraser, Redo2, BrushCleaning } from "lucide-react";
import NumberPanel from "./NumberPanel";

export default function ControlPanel({
  selectedNumber,
  setSelectedNumber,
  handleErase,
  handleHint,
  handleUndo,
  handleRedo,
  handleClear,
  onSolve,
  markMode,
  setMarkMode,
  hints,
  errors,
  progress,
  time,
  mode = "play",
}) {
  return (
    <>
      <div className="flex flex-col gap-6 items-center">
        <div className="flex gap-4">
          <ActionBtn action="Erase" Icon={Eraser} color="color-red-500" onClick={handleErase}></ActionBtn>
          <ActionBtn action="Undo" Icon={Undo2} color="color-btn" onClick={handleUndo}></ActionBtn>
          <ActionBtn action="Redo" Icon={Redo2} color="color-btn" onClick={handleRedo}></ActionBtn>

          {mode === "play" ? (
            <>
              <ActionBtn action="Hint" Icon={Lightbulb} color="color-yellow" onClick={handleHint}></ActionBtn>
              <ActionBtn
                action="Mark"
                Icon={PencilLine}
                color="color-secondary"
                onClick={() => setMarkMode(!markMode)}
                markMode={markMode}
              ></ActionBtn>
            </>
          ) : (
            <>
              <ActionBtn action="Clear All" Icon={BrushCleaning} color="color-secondary" onClick={handleClear}></ActionBtn>
            </>
          )}
        </div>

        <NumberPanel selectedNumber={selectedNumber} setSelectedNumber={setSelectedNumber} />
        {mode === "play" ? (
          <StatsBar hints={hints} errors={errors} progress={progress} time={time} />
        ) : (
          <>
            <button
              onClick={onSolve}
              className={`flex flex-col justify-center items-center w-35 h-15 rounded-2xl shadow-lg border-2 m-4 transition-all duration-200 text-[var(--color-pink-border)] hover:bg-[#f6b3f6] hover:scale-110 cursor-pointer
          `}
            >
              <span className="mt-1 text-2xl font-bold">SOLVE</span>
            </button>
          </>
        )}
      </div>
    </>
  );
}
