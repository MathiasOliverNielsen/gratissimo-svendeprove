/**
 * Constants
 * Delte konstanter for API, Nøgler og konfiguration
 */

export const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'authToken',
  USER: 'user',
  THEME: 'theme',
  PREFERENCES: 'preferences',
  CACHE: 'cache',
};

export const HTTP_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
};

export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error occurred',
  SERVER_ERROR: 'Server error occurred',
  UNAUTHORIZED: 'Unauthorized access',
  NOT_FOUND: 'Resource not found',
  VALIDATION_ERROR: 'Validation error occurred',
};
