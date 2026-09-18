/**
 * Card Component
 * Container with header, body, and footer sections
 * @param {Object} props - Component props
 * @param {ReactNode} props.children - Card content
 * @param {ReactNode} [props.header=null] - Header content
 * @param {ReactNode} [props.footer=null] - Footer content
 * @param {string} [props.title=null] - Title text
 * @param {string} [props.className=""] - Additional CSS class
 * @param {Function} [props.onClick=null] - Click handler
 * @param {boolean} [props.hoverable=false] - Hover effect
 * @returns {JSX.Element} Card element
 */

import "./Card.scss";

export function Card({ children, header = null, footer = null, title = null, className = "", onClick = null, hoverable = false }) {
  const classes = ["card", hoverable && "hoverable", className].filter(Boolean).join(" ");

  return (
    <div className={classes} onClick={onClick} role={onClick ? "button" : undefined} tabIndex={onClick ? 0 : undefined}>
      {(header || title) && <div className="card-header">{title ? <h3 className="card-title">{title}</h3> : header}</div>}

      <div className="card-body">{children}</div>

      {footer && <div className="card-footer">{footer}</div>}
    </div>
  );
}
