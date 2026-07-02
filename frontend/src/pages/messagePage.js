import { sendMessage } from "../api/message.js";
import { logout } from "../api/auth.js";
import { navigate } from "../app.js";

export function messagePage() {
  const root = document.createElement("div");

  root.innerHTML = `
    <div id="loading-overlay" hidden>
      <div class="spinner"></div>
    </div>
    <h2>Form Laporan</h2>
    <form id="message-form">
      <textarea id="message" rows="8" placeholder="Tuliskan laporan Anda..." required></textarea>
      <button type="submit">Kirim</button>
    </form>
    <button id="back-btn" type="button">Kembali</button>
  `;

  const messageForm = root.querySelector("#message-form");
  const textarea = root.querySelector("#message");
  const backBtn = root.querySelector("#back-btn");
  const overlay = root.querySelector("#loading-overlay");

  let isLoading = false;

  messageForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (isLoading) return;
    isLoading = true;
    overlay.hidden = false;

    try {
      const data = await sendMessage({ message: textarea.value });

      sessionStorage.setItem("ticketId", data.ticket_id);

      await logout();

      navigate("success");
    } catch (error) {
      if (error.status === 401) {
        alert("Please log in first");

        navigate("login");
        return;
      }

      alert(error.message);
    } finally {
      overlay.hidden = true;
      isLoading = false;
    }
  });

  backBtn.addEventListener("click", async () => {
    if (isLoading) return;
    isLoading = true;
    overlay.hidden = false;

    try {
      await logout();

      navigate("login");
    } catch (error) {
      alert(error.message);
    } finally {
      overlay.hidden = true;
      isLoading = false;
    }
  });

  return { root };
}
