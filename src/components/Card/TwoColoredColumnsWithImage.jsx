import React from "react";
import { MyButton } from "../../components/Button";

export const TwoColoredColumnsWithImage = ({
  title,
  blueColumnText,
  whiteColumnTitle,
  whiteColumnList,
  instructions,
  image,
  buttonText,
  onButtonClick,
}) => {
  return (
    <div className="two-colored-columns-with-image">
      <h1 className="slide-title">{title}</h1>
      <div className="columns" style={{ display: "flex", gap: "20px" }}>
        {/* Blue Column (Left) */}
        <div
          className="column column-blue"
          style={{
            flex: 1,
            backgroundColor: "#007bff", // Blue background
            color: "#fff", // White text
            padding: "20px",
            borderRadius: "8px",
          }}
        >
          <p>{blueColumnText}</p>
        </div>

        {/* White Column (Right) */}
        <div
          className="column column-white"
          style={{
            flex: 1,
            backgroundColor: "#fff", // White background
            color: "#000", // Black text
            padding: "20px",
            borderRadius: "8px",
            border: "1px solid #ddd", // Optional border
          }}
        >
          <h3>{whiteColumnTitle}</h3>
          <ol>
            {whiteColumnList.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ol>
        </div>
      </div>
      <p className="instructions">{instructions}</p>
      <div className="image-10point">
        <img src={image} alt="10 LEEP Points" style={{ maxWidth: "100%" }} />
      </div>
      <button
        onClick={onButtonClick}
        style={{
          backgroundColor: "#007bff",
          color: "#fff",
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginTop: "20px",
        }}
      >
        {buttonText}
      </button>
    </div>
  );
};