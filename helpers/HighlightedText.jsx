import React from "react";

const HighlightedText = ({ text, keywords }) => {
  const highlightKeywords = (text, keywords) => {
    const regex = new RegExp(keywords, "gi");
    const matches = text.match(regex);
    const parts = text.split(regex);
    return parts.map((part, index) => {
      if (matches) {
        return (
          <React.Fragment key={index}>
            {index !== 0 && (
              <span className={"orange_gradient"}>{matches[index - 1]}</span>
            )}
            {part}
          </React.Fragment>
        );
      } else {
        return part;
      }
    });
  };

  return <div>{highlightKeywords(text, keywords)}</div>;
};
export default HighlightedText;
