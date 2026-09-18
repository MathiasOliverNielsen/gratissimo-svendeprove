/**
 * Fejlhåndtering Utilities
 * Centraliseret fejlhåndtering og formatering
 */

/**
 * Håndter API-fejlrespons
 * Udvinder brugervenlig fejlmeddelelse fra forskellige responsformater
 */
export function handleApiError(error) {
  if (!error) return { message: 'Unknown error occurred', status: 500 };

  let message = 'An error occurred';
  let status = 500;
  let details = null;

  if (typeof error === 'string') {
    message = error;
  } else if (error.message) {
    message = error.message;
  } else if (error.error) {
    message = error.error;
  }

  if (error.status) status = error.status;
  if (error.details) details = error.details;

  return { message, status, details };
}

/**
 * Format validering
 * Converts validation errors to readable format
 */
export function formatValidationError(errors) {
  if (!errors || typeof errors !== 'object') return 'Validation error';

  if (Array.isArray(errors)) {
    return errors
      .map((err) => {
        if (typeof err === 'string') return err;
        if (err.message) return err.message;
        return 'Unknown validation error';
      })
      .join(', ');
  }

  return Object.entries(errors)
    .map(([field, message]) => `${field}: ${message}`)
    .join('; ');
}

/**
 * Format besked
 */
export function formatErrorMessage(error) {
  const { message, status } = handleApiError(error);

  const statusMessages = {
    400: 'Invalid request',
    401: 'Please log in',
    403: 'Access denied',
    404: 'Not found',
    500: 'Server error',
    503: 'Service unavailable',
  };

  const prefix = statusMessages[status] || `Error (${status})`;
  return `${prefix}: ${message}`;
}

/**
 * Lav fejl
 */
export function createError(message, status = 500, details = null) {
  return {
    message: message || 'An error occurred',
    status,
    details,
    timestamp: new Date().toISOString(),
  };
}

/**
 * Gem fejl
 */
export function logError(error, context = '') {
  const timestamp = new Date().toISOString();
  const { message, status, details } = handleApiError(error);

  const errorLog = {
    timestamp,
    context,
    message,
    status,
    details,
    stack: error?.stack,
  };

  if (process.env.NODE_ENV === 'development') {
    console.error('[Error]', errorLog);
  }

  return errorLog;
}

/**
 * Prøv igen
 */
export async function retryWithBackoff(fn, maxRetries = 3, baseDelay = 1000) {
  let lastError;

  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      if (i < maxRetries - 1) {
        const delay = baseDelay * Math.pow(2, i);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }

  throw lastError;
}

/**
 * Kan prøve igen
 */
export function isRetryableError(error) {
  if (!error) return false;
  const status = error.status || error.code;
  return [408, 429, 500, 502, 503, 504].includes(status);
}
