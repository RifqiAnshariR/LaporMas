/**
 * This file is provided ready-made for use in your application by HackYourFuture.
 * Retrieved from https://github.com/remarcmij/vanilla-starter.
 */
export function pageLoader() {
  let currentPage = {};

  return (createPageFn) => {
    // Mount the new page, replacing any previous page.
    const appRoot = document.getElementById("app-root");

    const card = document.createElement("div");
    const footer = document.createElement("footer");

    // Call optional pageWillUnload lifecycle method.
    currentPage.pageWillUnload?.();

    // Create the new page.
    currentPage = createPageFn();

    card.className = "card";
    card.appendChild(currentPage.root);

    footer.textContent = "© 2026 lapormas";

    card.appendChild(footer);

    // appRoot.innerHTML = "";
    // appRoot.appendChild(currentPage.root);
    appRoot.replaceChildren(card);

    // Reset scroll position to top of page
    window.scrollTo(0, 0);

    // Call optional pagDidLoad lifecycle method.
    currentPage.pageDidLoad?.();
  };
}
