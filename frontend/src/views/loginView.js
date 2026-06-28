export function createLoginView(props) {
  const root = document.createElement("section");

  root.innerHTML = `
    <div class="card">
      <h2>Login</h2>
      <p>Masukkan NIK Anda.</p>
      <form id="login-form">
        <input type="text" id="nik" pattern="[0-9]{16}" required>
        <button type="submit">Masuk</button>
      </form>
      <button id="login-back-btn" type="button">Kembali</button>
    </div>
  `;

  root.querySelector("#login-form").addEventListener("submit", (e) => {
    e.preventDefault();
    props.onSubmit({ nik: root.querySelector("#nik").value });
  });

  root.querySelector("#login-back-btn").addEventListener("click", props.onBack);

  return { root };
}
