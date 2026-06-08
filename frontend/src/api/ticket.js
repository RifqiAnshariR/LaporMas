import { BASE_URL } from "../constants.js";

/**
 * Fetches a specific ticket by its ID.
 *
 * @param {string|number} ticketId - The unique ID of the ticket.
 * @returns {Promise<Response>} The network response.
 */
export async function getTicket(ticketId) {
  return fetch(`${BASE_URL}/ticket/${ticketId}`);
}
