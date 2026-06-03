import { useState } from "react";
import Header from "./components/Header";
import GamePage from "./pages/GamePage";

function App() {
  return (
    <>
      <div className="bg-linear-to-t from-[#e1d4fe] to-[#aaacfb]">
        <Header />
        <GamePage />
      </div>
    </>
  );
}

export default App;
