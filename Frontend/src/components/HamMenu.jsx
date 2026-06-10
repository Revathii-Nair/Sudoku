import React, { useState } from "react";
import { Menu } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export default function HamMenu() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="px-5 py-2 text-white  bg-linear-65 hover:from-[#8b5cf6]/40 hover:to-[#6366f1]/40 transition-all duration-300 rounded-lg"
      >
        <Menu className="w-6 h-6" />
      </button>

      <div
        className={`fixed flex-row mt-2  p-1 right-5 w-35 text-center bg-linear-65 font-bold text-xl shadow-[0_0_30px_rgba(80,30,224,0.3)] bg-[#0b183d]/90 rounded-lg border border-[#ba9bf8]/20  transition-all z-[9999] backdrop-blur-[10px]  ${open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"}`}
      >
        <div
          className={`px-5 py-4 mb-1 bg-linear-65 transition-all rounded  hover:from-[#6021f2]/40 hover:to-[#272bec]/40 cursor-pointer ${location.pathname === "/" ? "bg-gradient-to-r from-[#8b5cf6]/40 to-[#6366f1]/40 text-blue-400" : ""} `}
        >
          <button
            onClick={() => {
              navigate("/");
              setOpen(false);
            }}
            className="w-full cursor-pointer"
          >
            Play
          </button>
        </div>

        <div
          className={`px-5 py-4 mb-1 bg-linear-65 transition-all rounded  hover:from-[#6021f2]/40 hover:to-[#272bec]/40 cursor-pointer ${location.pathname === "/solver" ? "bg-gradient-to-r from-[#8b5cf6]/40 to-[#6366f1]/40 text-blue-400" : ""} `}
        >
          <button
            onClick={() => {
              navigate("/solver");
              setOpen(false);
            }}
            className="w-full cursor-pointer"
          >
            Solver
          </button>
        </div>
      </div>
    </div>
  );
}
