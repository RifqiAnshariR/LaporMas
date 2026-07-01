import { BASE_URL } from "../constants.js";
import { getErrorMessage } from "../lib/errorMessage.js";

export async function getTicket(ticketId) {
  const response = await fetch(`${BASE_URL}/ticket/${ticketId}`);
  const data = await response.json();

  if (!response.ok) {
    const error = new Error(getErrorMessage(data));
    error.status = response.status;
    throw error;
  }

  return data;
}
