/**
 * Hook constants and configuration
 */

export const FORM_STATES = {
  IDLE: 'idle',
  LOADING: 'loading',
  ERROR: 'error',
  SUCCESS: 'success',
};

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'authToken',
  USER_DATA: 'userData',
  FORM_CACHE: 'formCache',
  PREFERENCES: 'preferences',
};

export const API_ENDPOINTS = {
  LOGIN: '/auth/login',
  LOGOUT: '/auth/logout',
  REGISTER: '/auth/register',
  USER: '/user',
  REFRESH: '/auth/refresh',
};
