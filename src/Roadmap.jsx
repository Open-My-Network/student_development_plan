import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaBox, FaWarehouse, FaBoxOpen, FaTruck, FaRedo, FaLock, FaCheck } from "react-icons/fa";
import "./style/Roadmap.css";

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

export default function Roadmap() {
  const [activeStep, setActiveStep] = useState(0);
  const navigate = useNavigate();

  const handleStepClick = (index, stepId) => {
    if (index <= activeStep + 1) {
      setActiveStep(index);
      navigate(`/step/${stepId}`); // Navigate to the step detail page
    }
  };

  return (
    <div className="roadmap-container">
      <h2 className="roadmap-title">The Order Fulfillment Process</h2>
      <div className="progress-bar">
        <div
          className="progress"
          style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
        ></div>
      </div>
      <div className="roadmap-grid">
        {steps.map((step, index) => (
          <div key={step.id} className="roadmap-step-wrapper">
            <motion.div
              className={`roadmap-item ${index > activeStep ? "locked" : ""}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => handleStepClick(index, step.id)}
              whileHover={{ scale: index <= activeStep ? 1.1 : 1 }}
              whileTap={{ scale: index <= activeStep ? 0.9 : 1 }}
            >
              <div className="icon">
                {index > activeStep ? <FaLock /> : step.icon}
              </div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
              {index <= activeStep && <FaCheck className="badge" />}
            </motion.div>
            {index < steps.length - 1 && (
              <div className={`connecting-line ${index < activeStep ? "active" : ""}`}></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}