/**
 * Formattering
 * Formater tal, datoer og priser
 */

/**
 * Formatér pris
 */
export function formatPrice(amount, currency = '') {
  if (amount === null || amount === undefined) return '';
  const formatted = Number(amount).toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
  return currency ? `${formatted} ${currency}` : formatted;
}

/**
 * Formatér dato
 */
export function formatDate(dateString) {
  if (!dateString) return '';
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '';
    return date.toLocaleDateString('da-DK', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  } catch {
    return '';
  }
}

/**
 * Formatér som valuta
 */
export function formatCurrency(amount, locale = 'en-US', currency = 'USD') {
  if (amount === null || amount === undefined) return '';
  return Number(amount).toLocaleString(locale, {
    style: 'currency',
    currency,
  });
}

/**
 * Afkort tekst
 */
export function truncateText(text, length = 50) {
  if (!text || typeof text !== 'string') return '';
  if (text.length <= length) return text;
  return text.substring(0, length) + '...';
}

/**
 * Formatér filstørrelse
 */
export function formatFileSize(bytes) {
  if (bytes === null || bytes === undefined) return '';
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return (bytes / Math.pow(k, i)).toFixed(2) + ' ' + sizes[i];
}

/**
 * Formatér telefon
 */
export function formatPhone(phone) {
  if (!phone || typeof phone !== 'string') return '';
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }
  if (cleaned.length === 11) {
    return `+${cleaned[0]} (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
  }
  return phone;
}

/**
 * Formatér tal
 */
export function formatNumber(value) {
  if (value === null || value === undefined) return '';
  return Number(value).toLocaleString('en-US');
}
