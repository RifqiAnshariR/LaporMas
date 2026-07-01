import { BASE_URL } from "../constants.js";
import { getErrorMessage } from "../lib/errorMessage.js";

export async function sendMessage(payload) {
  const response = await fetch(`${BASE_URL}/message`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    const error = new Error(getErrorMessage(data));
    error.status = response.status;
    throw error;
  }

  return data;
}
