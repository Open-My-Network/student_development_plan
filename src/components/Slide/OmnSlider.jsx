import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Slide from "./OmnSlide";
import slidesData from "../../utils/json/slides.json";

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = slidesData.slides.length;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev < totalSlides - 1 ? prev + 1 : prev));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : prev));
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") {
        nextSlide();
      } else if (e.key === "ArrowLeft") {
        prevSlide();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

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
    </div>
  );
};

export default Slider;
