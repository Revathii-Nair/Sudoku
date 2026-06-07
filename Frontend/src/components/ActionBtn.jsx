import React from "react";

export default function ActionBtn({ action, Icon, color, onClick, markMode }) {
  return (
    <>
      <div className="group relative inline-block">
        <button
          className="flex flex-col justify-center items-center w-20 h-20 rounded-full shadow-lg border-2 transition-colors duration-200 hover:shadow-lg hover:border-4 hover:scale-110 bg-neutral-400/20  text-neutral-300/80  backdrop-blur-[1px] border-[var(--color-pink-border)]"
          style={{
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
            if (span) span.style.color = "var(--color-neutral)";
          }}
          onClick={onClick}
        >
          {Icon && <Icon className="w-6 h-6 transition-transform duration-200 group-hover:rotate-10" style={{ color: `var(--${color})` }} />}
          <span className="mt-1 text-sm font-medium transition-colors duration-200 group-hover:font-bold">{action}</span>
        </button>

        {action === "Mark" && (
          <span
            className={`absolute -top-1 -right-1 text-xs font-bold text-white rounded-full px-2 py-1 shadow-md transition-transform duration-200 group-hover:scale-110 ${
              markMode ? "bg-purple-600" : "bg-gray-400"
            }`}
          >
            {markMode ? "ON" : "OFF"}
          </span>
        )}
      </div>
    </>
  );
}
