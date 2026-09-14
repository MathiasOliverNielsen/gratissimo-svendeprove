/**
 * Lager
 * Lokalt lager
 */

/**
 * Henter værdi
 */
export function getStorageItem(key, defaultValue = null) {
  if (typeof localStorage === 'undefined') return defaultValue;

  try {
    const item = localStorage.getItem(key);
    if (item === null) return defaultValue;

    try {
      return JSON.parse(item);
    } catch {
      return item;
    }
  } catch (error) {
    console.error(`Error reading from storage key "${key}":`, error);
    return defaultValue;
  }
}

/**
 * Gemmer værdi
 */
export function setStorageItem(key, value) {
  if (typeof localStorage === 'undefined') return false;

  try {
    if (value === null || value === undefined) {
      localStorage.removeItem(key);
    } else {
      const serialized = typeof value === 'string' ? value : JSON.stringify(value);
      localStorage.setItem(key, serialized);
    }
    return true;
  } catch (error) {
    console.error(`Error writing to storage key "${key}":`, error);
    return false;
  }
}

/**
 * Fjerner værdi
 */
export function removeStorageItem(key) {
  if (typeof localStorage === 'undefined') return false;

  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error removing storage key "${key}":`, error);
    return false;
  }
}

/**
 * Ryd hele localStorage
 */
export function clearStorage() {
  if (typeof localStorage === 'undefined') return false;

  try {
    localStorage.clear();
    return true;
  } catch (error) {
    console.error('Error clearing storage:', error);
    return false;
  }
}

/**
 * Kontroller om lagernøgle findes
 */
export function storageKeyExists(key) {
  if (typeof localStorage === 'undefined') return false;

  try {
    return localStorage.getItem(key) !== null;
  } catch {
    return false;
  }
}

/**
 * Få alle lagernøgler
 */
export function getAllStorageKeys() {
  if (typeof localStorage === 'undefined') return [];

  try {
    return Object.keys(localStorage);
  } catch {
    return [];
  }
}

/**
 * Få lagerstørrelse i bytes
 */
export function getStorageSize() {
  if (typeof localStorage === 'undefined') return 0;

  try {
    let size = 0;
    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        size += localStorage[key].length + key.length;
      }
    }
    return size;
  } catch {
    return 0;
  }
}
