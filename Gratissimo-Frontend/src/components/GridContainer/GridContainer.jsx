/**
 * GridContainer Component
 * Grid layout wrapper using CSS Grid
 * @param {Object} props - Component props
 * @param {ReactNode} props.children - Grid items
 * @param {number} [props.columns=1] - Number of columns
 * @param {string|number} [props.gap="1rem"] - Space between items
 * @param {boolean} [props.autoFit=true] - Auto-fit columns to width
 * @param {string} [props.minColWidth="200px"] - Minimum column width
 * @param {string} [props.className=""] - Additional CSS class
 * @param {Object} [props.style={}] - Inline styles
 * @returns {JSX.Element} Grid container
 */

import "./GridContainer.scss";

export function GridContainer({ children, columns = 1, gap = "1rem", autoFit = true, minColWidth = "200px", className = "", style = {} }) {
  const gapValue = typeof gap === "number" ? `${gap}rem` : gap;

  const gridTemplateColumns = autoFit ? `repeat(auto-fit, minmax(${minColWidth}, 1fr))` : `repeat(${columns}, 1fr)`;

  const gridStyle = {
    display: "grid",
    gridTemplateColumns,
    gap: gapValue,
    ...style,
  };

  return (
    <div className={`grid-container ${className}`.trim()} style={gridStyle}>
      {children}
    </div>
  );
}
