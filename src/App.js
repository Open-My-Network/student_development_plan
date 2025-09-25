import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Roadmap from "./Roadmap";
import StepDetail from "./StepDetail";
import { MilestoneThree } from "./pages/MilestoneThree";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Roadmap />} />
        <Route path="/demo" element={<MilestoneThree />} />
        <Route path="/step/:id" element={<StepDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
