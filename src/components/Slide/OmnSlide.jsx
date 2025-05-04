import React from "react";
import DynamicRenderer from "./DynamicRender";

const Slide = ({ slide }) => {
  return (
    <div className="carousel">
      <div key={slide.id} className={slide.css || ""}>
        {slide.row ? (
          <div className="row">
            {Object.entries(slide.content[0]).map(([key, col]) => (
              <div key={key} className={col.css || "col"}>
                {console.log(col ?? "N/A")}
                <DynamicRenderer content={col.items} />
              </div>
            ))}
          </div>
        ) : (
          <DynamicRenderer content={[slide.content]} />
        )}
      </div>
    </div>
  );
};

export default Slide;
