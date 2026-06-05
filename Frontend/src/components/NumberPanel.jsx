import React from "react";
import NumberBtn from "./NumberBtn";
import { useState } from "react";

export default function NumberPanel({ selectedNumber, setSelectedNumber }) {
  return (
    <>
      <div className="grid grid-cols-3">
        {Array(9)
          .fill(null)
          .map((_, i) => {
            if (i != 9) {
              return <NumberBtn key={i} num={i + 1} onClick={setSelectedNumber} selected={selectedNumber === i + 1} />;
            } else return <div></div>;
          })}
      </div>
    </>
  );
}
