// src/helpers/dateHelper.js

/**
 * Format a date to "Full Month DD, YYYY".
 * @param {string} dateStr - The date string to format.
 * @returns {string} - The formatted date string.
 */
export function formatDate(dateStr) {
  const date = new Date(dateStr)
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return date.toLocaleDateString(undefined, options)
}
