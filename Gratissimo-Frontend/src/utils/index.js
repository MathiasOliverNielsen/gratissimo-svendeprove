/**
 * Utils Index
 * Exports all utility functions
 */

export { validateEmail, validatePassword, validatePhone, validateURL, isRequired, validateMinLength, validateMaxLength, validateRange } from './validation.js';

export { formatPrice, formatDate, formatCurrency, truncateText, formatFileSize, formatPhone, formatNumber } from './formatters.js';

export { apiCall, setAuthToken, getAuthToken } from './api.js';

export { getStorageItem, setStorageItem, removeStorageItem, clearStorage, storageKeyExists, getAllStorageKeys, getStorageSize } from './storage.js';

export { filterByProperty, filterByProperties, filterBySearch, sortByProperty, sortByProperties, filterByDateRange, removeDuplicates, groupByProperty } from './filters.js';

export { handleApiError, formatValidationError, formatErrorMessage, createError, logError, retryWithBackoff, isRetryableError } from './errorHandler.js';

export { API_BASE_URL, STORAGE_KEYS, HTTP_METHODS, ERROR_MESSAGES } from './constants.js';
