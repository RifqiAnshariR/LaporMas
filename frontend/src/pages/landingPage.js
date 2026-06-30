import jakartaLogo from "../assets/logo_jakarta.png";
import { navigate } from "../app.js";

export function landingPage() {
  const root = document.createElement("section");

  root.innerHTML = `
    <div class="container">
      <img src="${jakartaLogo}" alt="Logo DKI Jakarta"/>
      <h1>LaporMas</h1>
      <p>Sampaikan aspirasi atau keluhan Anda dengan mudah.</p>
      <button id="start-btn" type="button">Buat Laporan</button>
      <button id="check-ticket-btn" type="button">Cek Tiket</button>
    </div>
  `;

  const startBtn = root.querySelector("#start-btn");
  const checkTicketBtn = root.querySelector("#check-ticket-btn");

  startBtn.addEventListener("click", () => {
    navigate("login");
  });

  checkTicketBtn.addEventListener("click", () => {
    navigate("ticket");
  });

  return { root };
}
