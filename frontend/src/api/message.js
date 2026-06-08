import { BASE_URL } from "../constants.js";

/**
 * Sends a message payload to the backend.
 *
 * @param {Object} payload - The message data to send.
 * @returns {Promise<Response>} The network response.
 */
export async function sendMessage(payload) {
  return fetch(`${BASE_URL}/message`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
}
