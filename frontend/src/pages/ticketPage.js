import { getTicket } from "../api/ticket.js";
import { navigate } from "../app.js";
import { getErrorMessage } from "../lib/errorMessage.js";

export function ticketPage() {
  const root = document.createElement("section");

  root.innerHTML = `
    <div class="card">
      <h2>Cek Tiket</h2>
      <p>Masukkan ID tiket Anda.</p>
      <div id="ticket-info" class="info-box"></div>
      <form id="ticket-form">
        <input
          id="ticket-id"
          type="text"
          pattern="[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}"
          required
        />
        <button type="submit">Cari</button>
      </form>
      <button id="back-btn" type="button">Kembali</button>
    </div>
  `;

  const ticketInfo = root.querySelector("#ticket-info");
  const ticketForm = root.querySelector("#ticket-form");
  const ticketIdInput = root.querySelector("#ticket-id");
  const backBtn = root.querySelector("#back-btn");

  function renderTicket(ticket) {
    if (!ticket) {
      ticketInfo.innerHTML = "";
      return;
    }

    ticketInfo.innerHTML = `
      <p><strong>NIK:</strong> ${ticket.nik}</p>
      <p><strong>Pesan:</strong> ${ticket.message}</p>
      <p><strong>Status:</strong> ${ticket.status}</p>
      <p><strong>Tanggal:</strong> ${ticket.created_at}</p>
    `;
  }

  renderTicket(null);

  ticketForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    try {
      const response = await getTicket(ticketIdInput.value.trim());
      const data = await response.json();

      if (!response.ok) {
        alert(getErrorMessage(data));
        return;
      }

      renderTicket(data);
    } catch (error) {
      alert(error.message);
    }
  });

  backBtn.addEventListener("click", () => {
    navigate("landing");
  });

  return { root };
}
