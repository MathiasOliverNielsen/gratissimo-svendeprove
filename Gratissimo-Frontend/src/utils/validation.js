/**
 * Validering
 * Tjekker om data er gyldige
 */

/**
 * Tjek e-mail
 */
export function validateEmail(email) {
  if (!email || typeof email !== 'string') return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Tjek adgangskode (mindst 6 tegn)
 */
export function validatePassword(password) {
  if (!password || typeof password !== 'string') return false;
  return password.length >= 6;
}

/**
 * Tjek telefonnummer
 */
export function validatePhone(phone) {
  if (!phone || typeof phone !== 'string') return false;
  const phoneRegex = /^[\d\s\-\+\(\)]{7,}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
}

/**
 * Tjek URL
 */
export function validateURL(url) {
  if (!url || typeof url !== 'string') return false;
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Tjek om værdi ikke er tom
 */
export function isRequired(value) {
  if (value === null || value === undefined) return false;
  if (typeof value === 'string') return value.trim().length > 0;
  if (Array.isArray(value)) return value.length > 0;
  return true;
}

/**
 * Tjek minimum længde
 */
export function validateMinLength(value, minLength) {
  if (!value || !value.toString) return false;
  return value.toString().length >= minLength;
}

/**
 * Tjek maximum længde
 */
export function validateMaxLength(value, maxLength) {
  if (!value || !value.toString) return true;
  return value.toString().length <= maxLength;
}

/**
 * Tjek tal i område
 */
export function validateRange(value, min, max) {
  if (value === null || value === undefined) return false;
  const num = Number(value);
  return !isNaN(num) && num >= min && num <= max;
}

/**
 * Tjek for farlige tegn (XSS prevention)
 */
export function validateNoScriptTags(value) {
  if (!value || typeof value !== 'string') return true;
  const dangerousRegex = /<|>|script|onerror|onclick|javascript|eval/i;
  return !dangerousRegex.test(value);
}
