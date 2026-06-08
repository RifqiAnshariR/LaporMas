import { createTicketView } from "../views/ticketView.js";
import { getTicket } from "../api/ticket.js";
import { navigate } from "../app.js";
import { getErrorMessage } from "../lib/errorMessage.js";

export function TicketPage() {
  let state = { ticket: null };

  const onSubmit = async (ticketId) => {
    try {
      const response = await getTicket(ticketId);
      const data = await response.json();

      if (!response.ok) {
        alert(getErrorMessage(data));
        return;
      }

      state = { ...state, ticket: data };
      view.update(state);
    } catch {
      alert("Could not reach the server");
    }
  };

  const onBack = () => {
    navigate("landing");
  };

  const view = createTicketView({ onSubmit, onBack });
  view.update(state);

  return view;
}
