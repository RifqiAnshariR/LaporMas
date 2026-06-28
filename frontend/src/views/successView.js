export function createSuccessView(props) {
  const root = document.createElement("section");

  root.innerHTML = `
    <div class="card">
      <h2>Laporan Berhasil Dikirim</h2>
      <p>Simpan id tiket Anda.</p>
      <div class="info-box copy-box">
        <span id="ticket-result"></span>
        <button id="copy-btn" type="button">Copy</button>
      </div>
      <button id="success-back-btn" type="button">Kembali ke Beranda</button>
    </div>
  `;

  root.querySelector("#ticket-result").innerHTML = `<p>${props.ticketId}</p>`;
  root.querySelector("#copy-btn").addEventListener("click", props.onCopy);
  root
    .querySelector("#success-back-btn")
    .addEventListener("click", props.onBack);

  return { root };
}
