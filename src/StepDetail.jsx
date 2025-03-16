import { useParams } from "react-router-dom";
import { FaBox, FaWarehouse, FaBoxOpen, FaTruck, FaRedo } from "react-icons/fa";
import MilestoneOne from "./pages/Milestone_One";
import { MilestoneTwo } from "./pages/MilestoneTwo";
import { MilestoneThree } from "./pages/MilestoneThree";

const steps = [
  { id: 1, page: <MilestoneOne /> },
  { id: 2, page: <MilestoneTwo /> },
  { id: 3, page: <MilestoneThree /> },
  { id: 4, page: <MilestoneOne /> },
  { id: 5, page: <MilestoneOne /> },
];

export default function StepDetail() {
  const { id } = useParams(); // Get the step ID from the URL
  const step = steps.find((step) => step.id === parseInt(id));

  if (!step) {
    return <div>Step not found!</div>;
  }

  return <>{step.page}</>;
}
