import { useState } from "react";
import Header from "./components/Header";
import SudokuGrid from "./components/SudoGrid";

function App() {
  return (
    <>
      <body className="bg-linear-to-t from-[#e1d4fe] to-[#aaacfb]">
        <Header />
        <SudokuGrid />
      </body>
    </>
  );
}

export default App;
