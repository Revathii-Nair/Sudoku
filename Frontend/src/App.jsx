import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import GamePage from "./pages/GamePage";
import SolverPage from "./pages/SolvePage";

function App() {
  return (
    <Router>
      <div className="absolute top-0 z-[-2] min-h-screen w-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]">
        <Header />
        <Routes>
          <Route path="/" element={<GamePage />} />
          <Route path="/solver" element={<SolverPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
