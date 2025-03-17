import React, { useState } from "react";
import { MyButton } from "../components/Button";
import { slides } from "../utils/slide_items";
import "../App.css";

export const MilestoneTwo = () => {
  const [currentSlide, setCurrentSlide] = useState(17); // Start from slide 18

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide((prev) => prev + 1);
    }
  };

  return (
    <div className="milestone-slide">
      {slides[currentSlide]?.milestoneSlide2 ? (
        <>
          <MyButton onClick={nextSlide} style={{ backgroundColor: "transparent", hover: "none" }}>
            <div className="milestone-text">
              <h2>CLICK HERE</h2>
              <h2>AND</h2>
              <h2>TAKE ACTION</h2>
            </div>
          </MyButton>
          <div className="milestone-image">
            <img src={slides[currentSlide].image} alt="Milestone Slide" className="curved-image" />
          </div>
        </>
      ) : (
        <p>Slide not found</p>
      )}
    </div>
  );
};
