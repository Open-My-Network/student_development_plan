import React from "react";

const DynamicRenderer = ({ content }) => {
  const renderContent = (item, keyPrefix = "") => {
    if (!item) return null;

    const renderChildren = (children) =>
      children?.map((child, idx) => (
        <div key={`${keyPrefix}-child-${idx}`}>
          {renderContent(child, `${keyPrefix}-${idx}`)}
        </div>
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
            onClick={() => (window.location.href = item.link || "#")}
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
        if (Array.isArray(item.content)) {
          return (
            <div className="row">
              {item.content.map((colBlock, index) => {
                if (typeof colBlock === "object" && !Array.isArray(colBlock)) {
                  const isNamedCol =
                    Object.keys(colBlock).length === 1 &&
                    colBlock[Object.keys(colBlock)[0]].items;
                  if (isNamedCol) {
                    const [_, colValue] = Object.entries(colBlock)[0];
                    return (
                      <div
                        key={`${keyPrefix}-col-named-${index}`}
                        className={colValue.css}
                      >
                        {renderChildren(colValue.items)}
                      </div>
                    );
                  } else {
                    return (
                      <div
                        key={`${keyPrefix}-col-${index}`}
                        className={colBlock.css}
                      >
                        {renderChildren(colBlock.items)}
                      </div>
                    );
                  }
                }
                return null;
              })}
            </div>
          );
        }
        return null;

      case "column":
        return <div className={item.css}>{renderChildren(item.items)}</div>;

      default:
        // Handle generic containers like outer slides
        if (item.div && Array.isArray(item.content)) {
          return (
            <div className={item.css || ""}>{renderChildren(item.content)}</div>
          );
        } else if (Array.isArray(item.content)) {
          return <>{renderChildren(item.content)}</>;
        }
        return null;
    }
  };

  if (Array.isArray(content)) {
    return (
      <>{content.map((item, index) => renderContent(item, `top-${index}`))}</>
    );
  } else if (typeof content === "object" && content !== null) {
    return <>{renderContent(content)}</>;
  } else {
    return null;
  }
};

export default DynamicRenderer;
