import { BASE_URL } from "../constants.js";
import { getErrorMessage } from "../lib/errorMessage.js";

export async function login(payload) {
  const response = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(getErrorMessage(data));
  }

  return data;
}

export async function logout() {
  const response = await fetch(`${BASE_URL}/logout`, {
    method: "POST",
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    const error = new Error(getErrorMessage(data));
    error.status = response.status;
    throw error;
  }

  return data;
}
