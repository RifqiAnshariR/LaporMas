import { createLandingView } from "../views/landingView.js";
import { navigate } from "../app.js";

export function LandingPage() {
  return createLandingView({
    onStart: () => navigate("login"),
    onCheckTicket: () => navigate("ticket"),
  });
}
