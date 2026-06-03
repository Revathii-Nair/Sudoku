import React from "react";

export default function ActionBtn({ action, Icon, color }) {
  return (
    <>
      <button
        className="group flex flex-col justify-center items-center w-20 h-20 rounded-full shadow-lg border-2 transition-colors duration-200 hover:shadow-lg hover:border-4 hover:scale-110"
        style={{
          backgroundColor: "var(--color-surface-2)",
          borderColor: "var(--color-pink-border)",
          "--hover-color": `var(--${color})`,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = `var(--${color})`;
          const span = e.currentTarget.querySelector("span");
          if (span) span.style.color = `var(--${color})`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "var(--color-pink-border)";
          const span = e.currentTarget.querySelector("span");
          if (span) span.style.color = "var(--color-black)";
        }}
      >
        {Icon && <Icon className="w-6 h-6 transition-transform duration-200 group-hover:rotate-10" style={{ color: `var(--${color})` }} />}
        <span className="mt-1 text-sm font-semibold transition-colors duration-200 group-hover:font-bold">{action}</span>
      </button>
    </>
  );
}
