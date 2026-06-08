import logoJakarta from "../assets/logo_jakarta.png";

export function createLandingView(props) {
  const root = document.createElement("section");

  root.innerHTML = `
    <div class="container">
      <img src="${logoJakarta}" alt="Logo DKI Jakarta">
      <h1>LaporMas</h1>
      <p>Sampaikan aspirasi atau keluhan Anda dengan mudah.</p>
      <button id="start-btn" type="button">Buat Laporan</button>
      <button id="check-ticket-btn" type="button">Cek Tiket</button>
    </div>
  `;

  root.querySelector("#start-btn").addEventListener("click", props.onStart);
  root
    .querySelector("#check-ticket-btn")
    .addEventListener("click", props.onCheckTicket);

  return { root };
}
