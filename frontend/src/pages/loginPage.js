import { login } from "../api/auth.js";
import { getErrorMessage } from "../lib/errorMessage.js";
import { navigate } from "../app.js";

export function loginPage() {
  const root = document.createElement("div");

  root.innerHTML = `
    <h2>Login</h2>
    <p>Masukkan NIK Anda.</p>
    <form id="login-form">
      <input id="nik" type="text" pattern="[0-9]{16}" required/>
      <button type="submit">Masuk</button>
    </form>
    <button id="back-btn" type="button">Kembali</button>
  `;

  const form = root.querySelector("#login-form");
  const nikInput = root.querySelector("#nik");
  const backBtn = root.querySelector("#back-btn");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    try {
      const response = await login({ nik: nikInput.value });
      const data = await response.json();

      if (!response.ok) {
        alert(getErrorMessage(data));
        return;
      }

      navigate("message");
    } catch (error) {
      alert(error.message);
    }
  });

  backBtn.addEventListener("click", () => {
    navigate("landing");
  });

  return { root };
}
