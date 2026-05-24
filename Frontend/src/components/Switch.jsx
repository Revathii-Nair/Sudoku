import { useState } from "react";

function Switch() {
  const [isOn, setIsOn] = useState(false);

  return (
    <button
      onClick={() => setIsOn(!isOn)}
      className={`w-14 h-8 inline-flex items-center rounded-full p-1 transition-colors duration-300 ${
        isOn ? "bg-blue-500" : "bg-gray-300"
      } focus:outline-none`}
      aria-pressed={isOn}
    >
      <span
        className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 
        ${isOn ? "translate-x-6" : "translate-x-0"}`}
      ></span>
    </button>
  );
}

export default Switch;
