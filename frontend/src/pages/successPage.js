import { navigate } from "../app.js";

export function successPage() {
  const root = document.createElement("div");
  const ticketId = sessionStorage.getItem("ticketId");

  root.innerHTML = `
    <h2>Laporan Berhasil Dikirim</h2>
    <div class="info-box copy-box">
      <span id="ticket-result">${ticketId}</span>
      <button id="copy-btn" type="button">Copy</button>
    </div>
    <button id="back-btn" type="button">Kembali ke Beranda</button>
  `;

  const copyBtn = root.querySelector("#copy-btn");
  const backBtn = root.querySelector("#back-btn");

  copyBtn.addEventListener("click", async () => {
    await navigator.clipboard.writeText(ticketId);
  });

  backBtn.addEventListener("click", () => {
    sessionStorage.removeItem("ticketId");

    navigate("landing");
  });

  return { root };
}
