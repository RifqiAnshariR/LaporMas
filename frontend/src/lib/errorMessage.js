/**
 * Extracts a user-friendly error message from API response data.
 *
 * @param {Object} data - The error response data object.
 * @param {string|[Object]} data.detail - Error details as a string or array.
 * @returns {string} - The formatted error message.
 */
export function getErrorMessage(data) {
  if (typeof data.detail === "string") {
    return data.detail;
  }

  if (Array.isArray(data.detail)) {
    return data.detail[0]?.msg ?? "Invalid input";
  }

  return "An error occurred";
}
