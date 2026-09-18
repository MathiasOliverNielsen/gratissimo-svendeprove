/**
 * Box Component
 * Generic container for spacing and layout
 * @param {Object} props - Component props
 * @param {ReactNode} props.children - Content
 * @param {string|number} [props.p="0"] - Padding (alias)
 * @param {string|number} [props.padding="0"] - Padding
 * @param {string|number} [props.m="0"] - Margin (alias)
 * @param {string|number} [props.margin="0"] - Margin
 * @param {string} [props.bg="transparent"] - Background color (alias)
 * @param {string} [props.backgroundColor="transparent"] - Background color
 * @param {string} [props.radius="0"] - Border radius (alias)
 * @param {string} [props.borderRadius="0"] - Border radius
 * @param {string} [props.border="none"] - Border style
 * @param {string} [props.minHeight="auto"] - Minimum height
 * @param {string} [props.className=""] - Additional CSS class
 * @param {Object} [props.style={}] - Inline styles
 * @returns {JSX.Element} Box container
 */

import "./Box.scss";

export function Box({ children, p = "0", padding = p, m = "0", margin = m, bg = "transparent", backgroundColor = bg, radius = "0", borderRadius = radius, border = "none", minHeight = "auto", className = "", style = {}, ...props }) {
  const spacingToRem = (value) => {
    if (typeof value === "number") return `${value}rem`;
    if (typeof value === "string" && !isNaN(value)) return `${value}rem`;
    return value;
  };

  const boxStyle = {
    padding: spacingToRem(padding),
    margin: spacingToRem(margin),
    backgroundColor,
    borderRadius: spacingToRem(borderRadius),
    border,
    minHeight,
    ...style,
  };

  return (
    <div className={`box ${className}`.trim()} style={boxStyle} {...props}>
      {children}
    </div>
  );
}
