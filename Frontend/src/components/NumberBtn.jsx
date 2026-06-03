import React from "react";

export default function NumberBtn({ num, onClick, selected }) {
  return (
    <>
      <div>
        <button
          className={`mx-2 my-2 px-6 py-6 rounded-md  font-bold text-xl   text-[var(--color-pink-border)] shadow-lg hover:bg-[#f6b3f6] hover:border-0 hover:scale-115 hover:text-xl hover:rotate-2 ${selected ? "bg-[#f6b3f6] border-2 border-amber-50 " : "bg-[var(--color-surface)] border-2 border-[var(--color-pink-border)]"}`}
          onClick={() => onClick(num)}
        >
          {num}
        </button>
      </div>
    </>
  );
}
