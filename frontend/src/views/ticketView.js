export function createTicketView(props) {
  const root = document.createElement("section");

  root.innerHTML = `
    <div class="card">
      <h2>Cek Tiket</h2>
      <p>Masukkan id tiket Anda.</p>
      <div id="ticket-info" class="info-box"></div>
      <form id="ticket-form">
        <input type="text" id="ticket-id" required>
        <button type="submit">Cari</button>
      </form>
      <button id="ticket-back-btn" type="button">Kembali</button>
    </div>
  `;

  const ticketInfo = root.querySelector("#ticket-info");

  root.querySelector("#ticket-form").addEventListener("submit", (e) => {
    e.preventDefault();
    props.onSubmit(root.querySelector("#ticket-id").value.trim());
  });

  root
    .querySelector("#ticket-back-btn")
    .addEventListener("click", props.onBack);

  const update = (state) => {
    if (!state.ticket) {
      ticketInfo.innerHTML = "";
      return;
    }

    ticketInfo.innerHTML = `
      <p><strong>NIK:</strong> ${state.ticket.nik}</p>
      <p><strong>Pesan:</strong> ${state.ticket.message}</p>
      <p><strong>Status:</strong> ${state.ticket.status}</p>
      <p><strong>Tanggal:</strong> ${state.ticket.created_at}</p>
    `;
  };

  return { root, update };
}
