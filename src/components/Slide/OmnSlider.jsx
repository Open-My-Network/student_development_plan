import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Slide from "./OmnSlide";
import slidesData from ".././../utils/json/slides.json";

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slidesData.slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? slidesData.slides.length - 1 : prev - 1
    );
  };

  return (
    <div className="slider-container vh-100 d-flex align-items-center justify-content-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
        >
          <Slide slide={slidesData.slides[currentSlide]} />
        </motion.div>
      </AnimatePresence>

      <button
        className="btn btn-secondary position-absolute start-0"
        onClick={prevSlide}
      >
        Previous
      </button>
      <button
        className="btn btn-secondary position-absolute end-0"
        onClick={nextSlide}
      >
        Next
      </button>
    </div>
  );
};

export default Slider;