import React from "react";

const DynamicRenderer = ({ content }) => {
  const renderContent = (item, keyPrefix = "") => {
    if (!item) return null;

    // Support recursively rendering nested items
    const renderChildren = (children) =>
      children?.map((child, idx) => (
        <div key={`${keyPrefix}-child-${idx}`}>{renderContent(child, `${keyPrefix}-${idx}`)}</div>
      ));

    switch (item.type) {
      case "heading":
        return (
          <h2
            className={item.css}
            dangerouslySetInnerHTML={{ __html: item.body }}
          />
        );

      case "paragraph":
        return (
          <p
            className={item.css}
            dangerouslySetInnerHTML={{ __html: item.body }}
          />
        );

      case "image":
        return <img src={item.body} alt="" className={item.css} />;

      case "button":
        return (
          <button
            className={item.css}
            onClick={() => window.location.href = item.link || "#"}
          >
            {item.body}
          </button>
        );

      case "table":
        return (
          <table className={item.css}>
            <thead>
              <tr>
                {item.items?.[0]?.map((header, index) => (
                  <th key={index}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {item.items?.slice(1)?.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        );

      case "row":
        // Handle row with named columns (col-1, col-2)
        if (Array.isArray(item.content)) {
          return (
            <div className="row">
              {item.content.map((colBlock, index) =>
                Object.entries(colBlock).map(([colKey, colValue]) => (
                  <div key={`${keyPrefix}-${colKey}-${index}`} className={colValue.css}>
                    {renderChildren(colValue.items)}
                  </div>
                ))
              )}
            </div>
          );
        }
        return null;

      case "column":
        return (
          <div className={item.css}>
            {renderChildren(item.items)}
          </div>
        );

      default:
        // For generic containers or div wrappers
        if (Array.isArray(item.content)) {
          return (
            <div className={item.css || ""}>
              {renderChildren(item.content)}
            </div>
          );
        }
        return null;
    }
  };

  if (Array.isArray(content)) {
    return <>{content.map((item, index) => renderContent(item, `top-${index}`))}</>;
  } else if (typeof content === "object" && content !== null) {
    return <>{renderContent(content)}</>;
  } else {
    return null;
  }
};

export default DynamicRenderer;