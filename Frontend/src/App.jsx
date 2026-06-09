import { useState } from "react";
import Header from "./components/Header";
import GamePage from "./pages/GamePage";

function App() {
  return (
    <>
      <div>
        <div class="absolute top-0 z-[-2] min-h-screen w-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]">
          <Header />
          <GamePage />
        </div>
      </div>
    </>
  );
}

export default App;
