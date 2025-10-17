// Slider.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Slide from "./OmnSlide";
import slideOne from "../../utils/json/slide-one.json";
import slideTwo from "../../utils/json/slide-two.json";

const Slider = ({ page }) => {
  const slidesData = page === "two" ? slideTwo : slideOne;
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const goNext = () => {
    setCurrentSlideIndex((prev) =>
      prev < slidesData.slides.length - 1 ? prev + 1 : prev
    );
  };

  const goToSlide = (id) => {
    const idx = slidesData.slides.findIndex((slide) => slide.id === id);
    if (idx !== -1) setCurrentSlideIndex(idx);
  };

  const prevSlide = () => {
    setCurrentSlideIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") goNext();
      else if (e.key === "ArrowLeft") prevSlide();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="slider-container d-flex align-items-center justify-content-center w-100 h-100">
      <div className="w-100 h-100">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlideIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="h-100"
          >
            <Slide
              slide={slidesData.slides[currentSlideIndex]}
              goNext={goNext}
              goToSlide={goToSlide}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Slider;
