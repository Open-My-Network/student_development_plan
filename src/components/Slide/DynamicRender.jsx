import React from "react";

const DynamicRenderer = ({ content }) => {
  const renderContent = (item) => {
    switch (item.type) {
      case "heading":
        return <h2 className={item.css}>{item.body}</h2>;
      case "paragraph":
        return <p className={item.css} style={item.style}>{item.body}</p>;
      case "image":
        return <img src={item.body} alt="" className={item.css} />;
      case "button":
        return (
          <button
            className={item.css}
            onClick={() => (window.location.href = item.link)}
          >
            {item.body}
          </button>
        );
      case "table":
        return (
          <table className={item.css}>
            <thead>
              <tr>
                {item.items[0].map((header, index) => (
                  <th key={index}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {item.items.slice(1).map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        );
      default:
        return null;
    }
  };

  // Check if content is an array (multiple items) or a single object
  if (Array.isArray(content)) {
    return (
      <div>
        {content.map((item, index) => (
          <div key={index}>{renderContent(item)}</div>
        ))}
      </div>
    );
  } else {
    // Handle single content item
    return <div>{renderContent(content)}</div>;
  }
};

export default DynamicRenderer;