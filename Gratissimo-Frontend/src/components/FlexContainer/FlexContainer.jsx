/**
 * FlexContainer Component
 * Flexible layout wrapper using CSS flexbox
 * @param {Object} props - Component props
 * @param {ReactNode} props.children - Content to wrap
 * @param {string} [props.direction="row"] - flex-direction (row, column)
 * @param {string} [props.justify="flex-start"] - justify-content alignment
 * @param {string} [props.align="stretch"] - align-items alignment
 * @param {string|number} [props.gap="1rem"] - Space between items
 * @param {boolean} [props.wrap=false] - flex-wrap enabled
 * @param {string} [props.className=""] - Additional CSS class
 * @param {Object} [props.style={}] - Inline styles
 * @returns {JSX.Element} Flex container
 */

import "./FlexContainer.scss";

export function FlexContainer({ children, direction = "row", justify = "flex-start", align = "stretch", gap = "1rem", wrap = false, className = "", style = {} }) {
  const gapValue = typeof gap === "number" ? `${gap}rem` : gap;

  const flexStyle = {
    display: "flex",
    flexDirection: direction,
    justifyContent: justify,
    alignItems: align,
    gap: gapValue,
    flexWrap: wrap ? "wrap" : "nowrap",
    ...style,
  };

  return (
    <div className={`flex-container ${className}`.trim()} style={flexStyle}>
      {children}
    </div>
  );
}
