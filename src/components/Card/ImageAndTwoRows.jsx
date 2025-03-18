import React from "react";

export const ImageAndTwoRows = ({ image, altText, firstRowText, firstRowAction, secondRowText, secondRowAction }) => {
  return (
    <div className="image-and-two-rows d-flex align-items-center">
      {/* Left Image */}
      <div className="image-milestone me-3">
        <img src={image} alt={altText} className="left-image img-fluid rounded-lg" />
      </div>

      {/* Right Text Section */}
      <div className="text-section">
        <div className="row row-blue mb-3">
          <h2>{firstRowText}</h2>
          <p className="click-here" onClick={firstRowAction}>CLICK HERE</p>
        </div>
        <div className="row row-green">
          <h2>{secondRowText}</h2>
          <p className="click-here" onClick={secondRowAction}>CLICK HERE</p>
        </div>
      </div>
    </div>
  );
};
