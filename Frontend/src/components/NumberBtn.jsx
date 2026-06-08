import React from "react";

export default function NumberBtn({ num, onClick, selected }) {
  return (
    <>
      <div>
        <button
          className={`mx-2 my-2 px-6 py-6 rounded-md  font-bold text-xl transition-all duration-200  text-[var(--color-pink-border)] cursor-pointer shadow-lg hover:bg-[#f6b3f6] hover:border-1 hover:scale-115 hover:text-xl hover:rotate-2 ${selected ? "bg-[#f6b3f6] border-2 border-amber-50 " : "bg-neutral-400/20 border-2 border-[var(--color-pink-border)] backdrop-blur-[1px]"}`}
          onClick={() => onClick(num)}
        >
          {num}
        </button>
      </div>
    </>
  );
}
