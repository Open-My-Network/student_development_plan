import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Roadmap from "./Roadmap";
import StepDetail from "./StepDetail";
import { MilestoneThree } from "./pages/MilestoneThree";
import {MilestoneTwo } from "./pages/MilestoneTwo";


function App() {
  return (
    <Router>
      <Routes>
        
        <Route path="/" element={<Roadmap />} />
        <Route path="/milestone" element={<MilestoneThree />} />
         <Route path="/demo2" element={<MilestoneTwo/>} />
        <Route path="/step/:id" element={<StepDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
