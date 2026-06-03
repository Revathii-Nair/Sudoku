import React from "react";

export default function StatBar({ num }) {
  return (
    <>
      <div>
        <button className=" mx-2 my-2 px-6 py-6 rounded-md bg-[var(--color-surface)] font-bold text-xl border-2 border-[var(--color-pink-border)] text-[var(--color-pink-border)] shadow-lg hover:bg-[#f6b3f6] hover:border-0 hover:scale-115 hover:text-xl hover:rotate-2">
          {num}
        </button>
      </div>
    </>
  );
}
