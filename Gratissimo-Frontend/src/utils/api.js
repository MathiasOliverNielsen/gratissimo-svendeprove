/**
 * API
 * HTTP-kald med automatisk login-token
 */

import { API_BASE_URL, STORAGE_KEYS } from './constants.js';
import { setCookie, getCookie, deleteCookie } from './cookieUtils.js';

let authToken = null;

/**
 * Gemmer login-token i cookies
 */
export function setAuthToken(token) {
  authToken = token;
  if (token) {
    setCookie(STORAGE_KEYS.AUTH_TOKEN, token, 7);
  } else {
    deleteCookie(STORAGE_KEYS.AUTH_TOKEN);
  }
}

/**
 * Henter login-token fra cookies
 */
export function getAuthToken() {
  if (authToken) return authToken;
  authToken = getCookie(STORAGE_KEYS.AUTH_TOKEN);
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

/**
 * Gemmer jobopslag som favorit
 */
export async function saveFavorite(jobListingId) {
  const fullUrl = `${API_BASE_URL}/favorites`;
  const token = getAuthToken();

  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const body = new URLSearchParams();
  body.append('jobListingId', jobListingId);

  try {
    const response = await fetch(fullUrl, {
      method: 'POST',
      headers,
      body: body.toString(),
    });

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      const error = new Error(data.error || `HTTP ${response.status}`);
      error.status = response.status;
      throw error;
    }

    return true;
  } catch (error) {
    throw {
      message: error.message,
      status: error.status || 500,
    };
  }
}

/**
 * Fjerner jobopslag fra favoritter
 */
export async function deleteFavorite(favoriteId) {
  const fullUrl = `${API_BASE_URL}/favorites/${favoriteId}`;
  const token = getAuthToken();

  const headers = {};

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(fullUrl, {
      method: 'DELETE',
      headers,
    });

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      const error = new Error(data.error || `HTTP ${response.status}`);
      error.status = response.status;
      throw error;
    }

    return true;
  } catch (error) {
    throw {
      message: error.message,
      status: error.status || 500,
    };
  }
}
