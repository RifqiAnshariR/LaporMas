import { createMessageView } from "../views/messageView.js";
import { sendMessage } from "../api/message.js";
import { logout } from "../api/auth.js";
import { navigate } from "../app.js";
import { getErrorMessage } from "../lib/errorMessage.js";

export function MessagePage() {
  const onSubmit = async ({ message }) => {
    try {
      const response = await sendMessage({ message });
      const data = await response.json();

      if (response.status === 401) {
        alert("Please log in first");
        navigate("login");
        return;
      }

      if (!response.ok) {
        alert(getErrorMessage(data));
        return;
      }

      sessionStorage.setItem("ticketId", data.ticket_id);
      await logout();
      navigate("success");
    } catch {
      alert("Could not reach the server");
    }
  };

  const onBack = async () => {
    try {
      await logout();
    } catch {
      alert("Could not reach the server");
    }

    navigate("landing");
  };

  return createMessageView({ onSubmit, onBack });
}
