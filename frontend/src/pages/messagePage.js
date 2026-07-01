import { sendMessage } from "../api/message.js";
import { logout } from "../api/auth.js";
import { getErrorMessage } from "../lib/errorMessage.js";
import { navigate } from "../app.js";

export function messagePage() {
  const root = document.createElement("div");

  root.innerHTML = `
    <h2>Form Laporan</h2>
    <p>Tuliskan laporan Anda.</p>
    <form id="message-form">
      <textarea id="message" rows="8" required></textarea>
      <button type="submit">Kirim</button>
    </form>
    <button id="back-btn" type="button">Kembali</button>
  `;

  const form = root.querySelector("#message-form");
  const textarea = root.querySelector("#message");
  const backBtn = root.querySelector("#back-btn");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    try {
      const response = await sendMessage({ message: textarea.value });
      const data = await response.json();

      if (response.status === 401) {
        alert("Please log in first");
        navigate("login");
        return;
      }

      if (!response.ok) {
        alert(getErrorMessage(data));
        return;
      }

      sessionStorage.setItem("ticketId", data.ticket_id);

      await logout();
      navigate("success");
    } catch (error) {
      alert(error.message);
    }
  });

  backBtn.addEventListener("click", async () => {
    try {
      await logout();
      navigate("landing");
    } catch (error) {
      alert(error.message);
    }
  });

  return { root };
}
