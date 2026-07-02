import { getTicket } from "../api/ticket.js";
import { navigate } from "../app.js";

export function ticketPage() {
  const root = document.createElement("div");

  root.innerHTML = `
    <div id="loading-overlay" hidden>
      <div class="spinner"></div>
    </div>
    <h2>Cek Tiket</h2>
    <div id="ticket-info" class="info-box"></div>
    <form id="ticket-form">
      <input
        id="ticket-id"
        type="text"
        pattern="[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}"
        placeholder="Masukkan ID tiket Anda..."
        required
      />
      <button type="submit">Cari</button>
    </form>
    <button id="back-btn" type="button">Kembali</button>
  `;

  const ticketInfo = root.querySelector("#ticket-info");
  const ticketForm = root.querySelector("#ticket-form");
  const ticketIdInput = root.querySelector("#ticket-id");
  const backBtn = root.querySelector("#back-btn");
  const overlay = root.querySelector("#loading-overlay");

  function showTicket(ticket) {
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

  let isLoading = false;

  showTicket(null);

  ticketForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (isLoading) return;
    isLoading = true;
    overlay.hidden = false;

    try {
      const data = await getTicket(ticketIdInput.value.trim());

      showTicket(data);
    } catch (error) {
      alert(error.message);
    } finally {
      overlay.hidden = true;
      isLoading = false;
    }
  });

  backBtn.addEventListener("click", () => {
    navigate("landing");
  });

  return { root };
}
