import react from "react";
import { useState } from "react";
import ActionBtn from "./ActionBtn";
import StatsBar from "./StatBar";
import NumberBtn from "./NumberBtn";
import { X, Undo2, Lightbulb, PencilLine, Eraser } from "lucide-react";
import NumberPanel from "./NumberPanel";

export default function ControlPanel({ selectedNumber, setSelectedNumber }) {
  return (
    <>
      <div className="ml-10 flex flex-col gap-6 items-center">
        <div className="flex gap-6">
          <ActionBtn action="Erase" Icon={Eraser} color="color-red-500"></ActionBtn>
          <ActionBtn action="Undo" Icon={Undo2} color="color-btn"></ActionBtn>
          <ActionBtn action="Hint" Icon={Lightbulb} color="color-yellow"></ActionBtn>
          <ActionBtn action="Mark" Icon={PencilLine} color="color-secondary"></ActionBtn>
        </div>

        <NumberPanel selectedNumber={selectedNumber} setSelectedNumber={setSelectedNumber} />

        <StatsBar />
      </div>
    </>
  );
}
