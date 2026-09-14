/**
 * API
 * HTTP-kald med automatisk login-token
 */

import { API_BASE_URL, STORAGE_KEYS } from './constants.js';

let authToken = null;

/**
 * Gemmer login-token
 */
export function setAuthToken(token) {
  authToken = token;
  if (token) {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
    }
  } else {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    }
  }
}

/**
 * Henter login-token
 */
export function getAuthToken() {
  if (authToken) return authToken;
  if (typeof localStorage !== 'undefined') {
    authToken = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
  }
  return authToken;
}

/**
 * Udfører API-kald med automatisk token
 */
export async function apiCall(url, options = {}) {
  const fullUrl = url.startsWith('http') ? url : `${API_BASE_URL}${url}`;

  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const token = getAuthToken();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(fullUrl, {
      method: options.method || 'GET',
      headers,
      body: options.body ? JSON.stringify(options.body) : undefined,
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      const error = new Error(data.error || `HTTP ${response.status}`);
      error.status = response.status;
      error.details = data;
      throw error;
    }

    return data;
  } catch (error) {
    throw {
      message: error.message,
      status: error.status || 500,
      details: error.details || null,
    };
  }
}
