import { pageLoader } from "./lib/pageLoader.js";

import { landingPage } from "./pages/landingPage.js";
import { loginPage } from "./pages/loginPage.js";
import { messagePage } from "./pages/messagePage.js";
import { successPage } from "./pages/successPage.js";
import { ticketPage } from "./pages/ticketPage.js";

const loadPage = pageLoader();

export function navigate(page) {
  const routes = {
    landing: landingPage,
    login: loginPage,
    message: messagePage,
    success: successPage,
    ticket: ticketPage,
  };

  loadPage(routes[page]);
}

export function loadApp() {
  navigate("landing");
}
