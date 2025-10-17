import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Roadmap from "./Roadmap";
import BaseMilestone from "./pages/base.milestone";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Roadmap />} />
        <Route path="/milestone/:id" element={<BaseMilestone />} />
      </Routes>
    </Router>
  );
}

export default App;
