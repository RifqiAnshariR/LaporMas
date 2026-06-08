import { createSuccessView } from "../views/successView.js";
import { navigate } from "../app.js";

export function SuccessPage() {
  const ticketId = sessionStorage.getItem("ticketId");

  const onCopy = async () => {
    await navigator.clipboard.writeText(ticketId);
  };

  const onBack = () => {
    sessionStorage.removeItem("ticketId");
    navigate("landing");
  };

  return createSuccessView({ ticketId, onCopy, onBack });
}
