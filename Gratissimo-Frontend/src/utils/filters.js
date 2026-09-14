/**
 * Filtrering
 * Filtrér og sorter lister
 */

/**
 * Filtrér efter værdi
 */
export function filterByProperty(items, property, value) {
  if (!Array.isArray(items)) return [];
  if (value === null || value === undefined) return items;
  return items.filter((item) => item?.[property] === value);
}

/**
 * Filtrér efter flere værdier
 * @example filterByProperties(users, { status: "active", role: "admin" })
 */
export function filterByProperties(items, filters) {
  if (!Array.isArray(items)) return [];
  if (!filters || typeof filters !== 'object') return items;

  return items.filter((item) => {
    return Object.entries(filters).every(([key, value]) => {
      return item?.[key] === value;
    });
  });
}

/**
 * Søg i felt
 * @example filterBySearch(users, "john", ["name", "email"])
 */
export function filterBySearch(items, searchTerm, fields = []) {
  if (!Array.isArray(items)) return [];
  if (!searchTerm || typeof searchTerm !== 'string') return items;

  const term = searchTerm.toLowerCase().trim();

  return items.filter((item) => {
    return fields.some((field) => {
      const value = item?.[field];
      if (value === null || value === undefined) return false;
      return value.toString().toLowerCase().includes(term);
    });
  });
}

/**
 * Sorter array efter egenskab
 * @example sortByProperty(users, "name", "asc")
 */
export function sortByProperty(items, property, order = 'asc') {
  if (!Array.isArray(items)) return [];

  const sorted = [...items].sort((a, b) => {
    const aVal = a?.[property];
    const bVal = b?.[property];

    if (aVal === null || aVal === undefined) return 1;
    if (bVal === null || bVal === undefined) return -1;

    if (typeof aVal === 'string') {
      return order === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
    }

    return order === 'asc' ? aVal - bVal : bVal - aVal;
  });

  return sorted;
}

/**
 * Sorter efter flere værdier
 * @example sortByProperties(users, [{ property: "status", order: "asc" }, { property: "name", order: "asc" }])
 */
export function sortByProperties(items, sortConfigs = []) {
  if (!Array.isArray(items)) return [];

  return [...items].sort((a, b) => {
    for (const config of sortConfigs) {
      const { property, order = 'asc' } = config;
      const aVal = a?.[property];
      const bVal = b?.[property];

      if (aVal === bVal) continue;

      if (aVal === null || aVal === undefined) return 1;
      if (bVal === null || bVal === undefined) return -1;

      if (typeof aVal === 'string') {
        const result = aVal.localeCompare(bVal);
        return order === 'asc' ? result : -result;
      }

      return order === 'asc' ? aVal - bVal : bVal - aVal;
    }
    return 0;
  });
}

/**
 * Filtrér efter dato
 * @example filterByDateRange(events, "date", "2026-01-01", "2026-12-31")
 */
export function filterByDateRange(items, dateProperty, startDate, endDate) {
  if (!Array.isArray(items)) return [];

  const start = new Date(startDate);
  const end = new Date(endDate);

  return items.filter((item) => {
    const itemDate = new Date(item?.[dateProperty]);
    return itemDate >= start && itemDate <= end;
  });
}

/**
 * Filtrér bort efter værdi
 * @example excludeByProperty(products, 'id', 1)
 */
export function excludeByProperty(items, property, value) {
  if (!Array.isArray(items)) return [];
  return items.filter((item) => item?.[property] !== value);
}

/**
 * Fjern dubletter
 */
export function removeDuplicates(items, property) {
  if (!Array.isArray(items)) return [];

  if (!property) {
    return [...new Set(items)];
  }

  const seen = new Set();
  return items.filter((item) => {
    const value = item?.[property];
    if (seen.has(value)) return false;
    seen.add(value);
    return true;
  });
}

/**
 * Grupper efter værdi
 */
export function groupByProperty(items, property) {
  if (!Array.isArray(items)) return {};

  return items.reduce((acc, item) => {
    const key = item?.[property] ?? 'undefined';
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});
}
