import { BASE_URL } from "../constants.js";

/**
 * Sends a login request to the backend.
 *
 * @param {Object} payload - The user login credentials.
 * @returns {Promise<Response>} The network response.
 */
export async function login(payload) {
  return fetch(`${BASE_URL}/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
}

/**
 * Sends a logout request to the backend.
 *
 * @returns {Promise<Response>} The network response.
 */
export async function logout() {
  return fetch(`${BASE_URL}/logout`, {
    method: "POST",
    credentials: "include",
  });
}
