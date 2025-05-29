import React from "react";

const DynamicRenderer = ({ content, goNext, goToSlide }) => {
  const renderContent = (item, keyPrefix = "") => {
    if (!item) return null;

    switch (item.type) {
      case "button":
        return (
          <button
            key={keyPrefix}
            className={item.css}
            onClick={() => {
              if (item.action === "goNext" && goNext) {
                goNext();
              } else if (
                item.action === "goToSlide" &&
                goToSlide &&
                item.targetSlideId
              ) {
                goToSlide(item.targetSlideId);
              } else if (item.link) {
                window.location.href = item.link;
              }
            }}
          >
            {item.body}
          </button>
        );

      case "heading":
        return (
          <h2
            key={keyPrefix}
            className={item.css}
            dangerouslySetInnerHTML={{ __html: item.body }}
          />
        );

      case "paragraph":
        return (
          <p key={keyPrefix} className={item.css}>
            {item.body}
          </p>
        );

      case "image":
        return <img key={keyPrefix} src={item.body} alt="" className={item.css} />;

      case "input":
        return (
          <input
            key={keyPrefix}
            className={item.css}
            type={item.attributes?.type || "text"}
            placeholder={item.attributes?.placeholder || ""}
          />
        );

      case "textarea":
        return (
          <textarea
            key={keyPrefix}
            className={item.css}
            rows={item.attributes?.rows || 3}
            placeholder={item.attributes?.placeholder || ""}
          />
        );

      case "table":
        return (
          <table key={keyPrefix} className={item.css}>
            <thead>
              <tr>
                {item.items?.[0]?.map((header, index) => (
                  <th key={index}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {item.items
                ?.slice(1)
                ?.map((row, rowIndex) => (
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
            <div key={keyPrefix} className="row">
              {item.content.map((colBlock, index) => {
                if (typeof colBlock === "object" && !Array.isArray(colBlock)) {
                  const isNamedCol =
                    Object.keys(colBlock).length === 1 &&
                    colBlock[Object.keys(colBlock)[0]].items;
                  if (isNamedCol) {
                    const [colValue] = Object.entries(colBlock)[0];
                    return (
                      <div
                        key={`${keyPrefix}-col-named-${index}`}
                        className={colValue.css}
                      >
                        {colValue.items.map((child, idx) =>
                          renderContent(child, `${keyPrefix}-${index}-child-${idx}`)
                        )}
                      </div>
                    );
                  } else {
                    return (
                      <div
                        key={`${keyPrefix}-col-${index}`}
                        className={colBlock.css}
                      >
                        {colBlock.items.map((child, idx) =>
                          renderContent(child, `${keyPrefix}-${index}-child-${idx}`)
                        )}
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
        return (
          <div key={keyPrefix} className={item.css}>
            {item.items?.map((child, idx) => renderContent(child, `${keyPrefix}-child-${idx}`))}
          </div>
        );

      default:
        if (item.div && Array.isArray(item.content)) {
          return (
            <div key={keyPrefix} className={item.css || ""}>
              {item.content.map((child, idx) => renderContent(child, `${keyPrefix}-child-${idx}`))}
            </div>
          );
        } else if (Array.isArray(item.content)) {
          return <>{item.content.map((child, idx) => renderContent(child, `${keyPrefix}-child-${idx}`))}</>;
        }
        return null;
    }
  };

  if (Array.isArray(content)) {
    return <>{content.map((item, index) => renderContent(item, `top-${index}`))}</>;
  } else if (typeof content === "object" && content !== null) {
    return <>{renderContent(content)}</>;
  }
  return null;
};

export default DynamicRenderer;
