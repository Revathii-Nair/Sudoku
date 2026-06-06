import { useState } from "react";
import Header from "./components/Header";
import GamePage from "./pages/GamePage";

function App() {
  return (
    <>
      <div>
        <Header />
        <GamePage />
      </div>
    </>
  );
}

export default App;
