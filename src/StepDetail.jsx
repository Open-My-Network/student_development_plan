import { useParams } from "react-router-dom";
import { FaBox, FaWarehouse, FaBoxOpen, FaTruck, FaRedo } from "react-icons/fa";

const steps = [
  { id: 1, title: "Inventory Handling", icon: <FaBox />, description: "Sourcing, storing, and shipping products." },
  { id: 2, title: "Warehouse Storage", icon: <FaWarehouse />, description: "Pallet racking & material handling." },
  { id: 3, title: "Order Processing", icon: <FaBoxOpen />, description: "Packing & processing of orders." },
  { id: 4, title: "Packing", icon: <FaBox />, description: "Boxing & preparing orders for shipping." },
  { id: 5, title: "Shipping", icon: <FaTruck />, description: "3PL shipping based on customer choice." },
  { id: 6, title: "Returns", icon: <FaRedo />, description: "Handling refunds & product replacements." },
  { id: 7, title: "Quality Check", icon: <FaBoxOpen />, description: "Ensuring product quality before dispatch." },
  { id: 8, title: "Customer Support", icon: <FaBox />, description: "Managing queries and resolving issues." },
  { id: 9, title: "Feedback & Review", icon: <FaRedo />, description: "Collecting customer feedback." },
];

export default function StepDetail() {
  const { id } = useParams(); // Get the step ID from the URL
  const step = steps.find((step) => step.id === parseInt(id));

  if (!step) {
    return <div>Step not found!</div>;
  }

  return (
    <div className="step-detail-container">
      <h2>{step.title}</h2>
      <div className="icon">{step.icon}</div>
      <p>{step.description}</p>
      <button onClick={() => window.history.back()}>Go Back</button>
    </div>
  );
}