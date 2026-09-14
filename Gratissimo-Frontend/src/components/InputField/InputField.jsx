/**
 * InputField Component
 * Form input with label and error display
 * @param {Object} props - Component props
 * @param {string} props.name - Input name attribute
 * @param {string} [props.label=""] - Label text
 * @param {string} [props.value=""] - Input value
 * @param {Function} [props.onChange=null] - Change handler
 * @param {Function} [props.onBlur=null] - Blur handler
 * @param {string} [props.type="text"] - Input type
 * @param {string} [props.placeholder=""] - Placeholder text
 * @param {string} [props.error=null] - Error message
 * @param {boolean} [props.disabled=false] - Disabled state
 * @param {boolean} [props.required=false] - Required field
 * @param {string} [props.className=""] - Additional CSS class
 * @returns {JSX.Element} Input field
 */

import "./InputField.scss";

export function InputField({ name, label = "", value = "", onChange = null, onBlur = null, type = "text", placeholder = "", error = null, disabled = false, required = false, className = "", autoComplete = "on" }) {
  return (
    <div className={`input-field ${className}`.trim()}>
      {label && (
        <label htmlFor={name} className="input-label">
          {label}
          {required && <span className="required">*</span>}
        </label>
      )}
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        disabled={disabled}
        autoComplete={autoComplete}
        className={`input-control ${error ? "error" : ""}`.trim()}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : null}
      />
      {error && (
        <span id={`${name}-error`} className="input-error">
          {error}
        </span>
      )}
    </div>
  );
}
