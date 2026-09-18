/**
 * useAuth Hook
 * Administrerer brugeren og login
 * @returns {Object} Bruger, login og logout
 */

import { useState, useEffect, useCallback } from 'react';
import { setAuthToken, getAuthToken, setRefreshToken, getRefreshToken, apiCall } from '../utils/api.js';
import { getStorageItem, setStorageItem, removeStorageItem } from '../utils/storage.js';
import { STORAGE_KEYS } from '../utils/constants.js';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const initializeAuth = useCallback(() => {
    try {
      const token = getAuthToken();
      const storedUser = getStorageItem(STORAGE_KEYS.USER);

      if (token && storedUser) {
        setUser(storedUser);
        setIsAuthenticated(true);
      }
    } catch (err) {
      console.error('Auth initialization error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  const login = useCallback(async (email, password) => {
    try {
      setLoading(true);
      setError(null);

      const response = await apiCall('/login', {
        method: 'POST',
        body: { username: email, password },
      });

      const {
        accessToken,
        refreshToken,
        user: { id, firstname, lastname },
      } = response;

      if (!accessToken || !refreshToken) {
        throw new Error('Invalid response from server');
      }

      setAuthToken(accessToken);
      setRefreshToken(refreshToken);

      const userData = { id, firstname, lastname, email };
      setStorageItem(STORAGE_KEYS.USER, userData);
      setUser(userData);
      setIsAuthenticated(true);

      return { success: true, user: userData };
    } catch (err) {
      const message = err.message || 'Login failed';
      setError(message);
      setUser(null);
      setIsAuthenticated(false);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    try {
      setAuthToken(null);
      setRefreshToken(null);
      removeStorageItem(STORAGE_KEYS.USER);
      setUser(null);
      setIsAuthenticated(false);
      setError(null);
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }, []);

  const register = useCallback(async (userData) => {
    try {
      setLoading(true);
      setError(null);

      await apiCall('/users', {
        method: 'POST',
        body: {
          email: userData.email,
          password: userData.password,
          firstname: userData.firstname,
          lastname: userData.lastname,
          phone: userData.phone,
          address: userData.address,
          city: userData.city,
          zipcode: userData.zipcode,
        },
      });

      return { success: true };
    } catch (err) {
      const message = err.message || 'Registration failed';
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  }, []);

  const updateUser = useCallback((updatedUser) => {
    setUser(updatedUser);
    setStorageItem(STORAGE_KEYS.USER, updatedUser);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    user,
    isAuthenticated,
    loading,
    error,
    login,
    register,
    logout,
    updateUser,
    clearError,
    isLoading: loading,
  };
}
