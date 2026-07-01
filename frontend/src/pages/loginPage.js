import { login } from "../api/auth.js";
import { navigate } from "../app.js";

export function loginPage() {
  const root = document.createElement("div");

  root.innerHTML = `
    <h2>Login</h2>
    <form id="login-form">
      <input 
        id="nik" 
        type="text" 
        pattern="[0-9]{16}" 
        placeholder="Masukkan NIK Anda..." 
        required
      />
      <button type="submit">Masuk</button>
    </form>
    <button id="back-btn" type="button">Kembali</button>
  `;

  const loginForm = root.querySelector("#login-form");
  const nikInput = root.querySelector("#nik");
  const backBtn = root.querySelector("#back-btn");

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    try {
      await login({ nik: nikInput.value });

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
