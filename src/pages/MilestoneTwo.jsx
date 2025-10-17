import React from "react";
import Slider from "../components/Slide/OmnSlider";

export const MilestoneTwo = () => {
  return (
    <div className="container my-5">
      <div
        className="card"
        style={{
          minHeight: "70vh", // Start at 70vh minimum
          height: "auto", // Allow it to expand beyond 70vh if needed
        }}
      >
        <Slider />
      </div>
    </div>
  );
};
