import { pageLoader } from "./lib/pageLoader.js";

import { LandingPage } from "./pages/landingPage.js";
import { LoginPage } from "./pages/loginPage.js";
import { MessagePage } from "./pages/messagePage.js";
import { SuccessPage } from "./pages/successPage.js";
import { TicketPage } from "./pages/ticketPage.js";

const loadPage = pageLoader();

export function navigate(page) {
  const routes = {
    landing: LandingPage,
    login: LoginPage,
    message: MessagePage,
    success: SuccessPage,
    ticket: TicketPage,
  };

  loadPage(routes[page]);
}

export function loadApp() {
  navigate("landing");
}
