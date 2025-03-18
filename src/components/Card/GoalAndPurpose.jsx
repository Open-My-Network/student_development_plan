import React from "react";

export const TwoColumnsWithImage = ({ title, description, rightColumnText, image, altText, onButtonClick }) => {
  return (
    <div className="two-columns-with-image container">
      <div className="row">
        <div className="col-12 col-md-6 mb-3">
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        <div className="col-12 col-md-6 mb-3">
          <p dangerouslySetInnerHTML={{ __html: rightColumnText }} />
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-12 text-center">
          <img src={image} alt={altText} className="img-fluid w-100 rounded-lg" />
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-12 text-center">
          <button onClick={onButtonClick} className="btn btn-primary mt-3">
            CLICK TO MOVE FORWARD ON YOUR JOURNEY
          </button>
        </div>
      </div>
    </div>
  );
};
