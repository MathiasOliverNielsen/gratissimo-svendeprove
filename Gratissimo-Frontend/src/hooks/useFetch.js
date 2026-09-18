/**
 * useFetch Hook
 * Henter data fra API
 * @param {string} url - API-adresse
 * @param {Object} options - Indstillinger
 * @returns {Object} Data og status
 */

import { useState, useEffect, useCallback } from 'react';
import { apiCall, getAuthToken } from '../utils/api.js';

const cache = new Map();
const cacheTimestamps = new Map();

export function useFetch(url, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const cacheTimeout = options.cacheTimeout || 5 * 60 * 1000;
  const optionsString = JSON.stringify(options);

  const fetchData = useCallback(async () => {
    if (!url) {
      setLoading(false);
      return;
    }

    const cacheKey = `${url}_${optionsString}`;
    const cachedData = cache.get(cacheKey);
    const cachedTime = cacheTimestamps.get(cacheKey);
    const isCacheValid = cachedData && cachedTime && Date.now() - cachedTime < cacheTimeout;

    if (options.cache && isCacheValid) {
      setData(cachedData);
      setLoading(false);
      setError(null);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const result = await apiCall(url, {
        method: options.method || 'GET',
        body: options.body,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      const responseData = result.data || result;
      setData(responseData);

      if (options.cache) {
        cache.set(cacheKey, responseData);
        cacheTimestamps.set(cacheKey, Date.now());
      }
    } catch (err) {
      setError({
        message: err.message || 'Failed to fetch data',
        status: err.status,
        details: err.details,
      });
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [url, optionsString, options.cache, cacheTimeout]);

  useEffect(() => {
    fetchData();
  }, [url, optionsString]);

  const refetch = useCallback(() => {
    cache.delete(`${url}_${optionsString}`);
    fetchData();
  }, [url, optionsString, fetchData]);

  return {
    data,
    loading,
    error,
    refetch,
    isError: !!error,
    isLoading: loading,
    isSuccess: !loading && !error && data !== null,
  };
}
