import React from "react";
import DynamicRenderer from "./DynamicRender";

const Slide = ({ slide, goNext, goToSlide }) => {
  return (
    <div className="carousel">
      <div key={slide.id} className={slide.css || ""}>
        {slide.row ? (
          <div className="row">
            {Object.entries(slide.content[0]).map(([key, col]) => (
              <div key={key} className={col.css || "col"}>
                <DynamicRenderer
                  content={col.items}
                  goNext={goNext}
                  goToSlide={goToSlide}
                />
              </div>
            ))}
          </div>
        ) : (
          <DynamicRenderer
            content={slide.content}
            goNext={goNext}
            goToSlide={goToSlide}
          />
        )}
      </div>
    </div>
  );
};

export default Slide;
