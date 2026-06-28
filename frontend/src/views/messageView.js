export function createMessageView(props) {
  const root = document.createElement("section");

  root.innerHTML = `
    <div class="card">
      <h2>Form Laporan</h2>
      <p>Tuliskan laporan Anda.</p>
      <form id="message-form">
        <textarea id="message" rows="8" required></textarea>
        <button type="submit">Kirim</button>
      </form>
      <button id="message-back-btn" type="button">Kembali</button>
    </div>
  `;

  root.querySelector("#message-form").addEventListener("submit", (e) => {
    e.preventDefault();
    props.onSubmit({ message: root.querySelector("#message").value });
  });

  root
    .querySelector("#message-back-btn")
    .addEventListener("click", props.onBack);

  return { root };
}
