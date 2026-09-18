/**
 * Button Component
 * Multi-variant button with loading state
 * @param {Object} props - Component props
 * @param {ReactNode} props.children - Button text
 * @param {Function} [props.onClick=null] - Click handler
 * @param {string} [props.variant="primary"] - Style variant
 * @param {string} [props.size="md"] - Size (sm, md, lg)
 * @param {boolean} [props.disabled=false] - Disabled state
 * @param {boolean} [props.loading=false] - Loading state
 * @param {boolean} [props.fullWidth=false] - Full width button
 * @param {string} [props.type="button"] - Button type
 * @param {string} [props.className=""] - Additional CSS class
 * @returns {JSX.Element} Button element
 */

import "./Button.scss";

export function Button({ children, onClick = null, variant = "primary", size = "md", disabled = false, loading = false, fullWidth = false, type = "button", className = "" }) {
  const classes = ["button", `button-${variant}`, `button-${size}`, fullWidth && "full-width", (disabled || loading) && "disabled", className].filter(Boolean).join(" ");

  return (
    <button type={type} onClick={onClick} disabled={disabled || loading} className={classes} aria-busy={loading}>
      {loading ? (
        <>
          <span className="spinner"></span>
          {children}
        </>
      ) : (
        children
      )}
    </button>
  );
}
