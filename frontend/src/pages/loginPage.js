import { createLoginView } from "../views/loginView.js";
import { login } from "../api/auth.js";
import { navigate } from "../app.js";
import { getErrorMessage } from "../lib/errorMessage.js";

export function LoginPage() {
  const onSubmit = async ({ nik }) => {
    try {
      const response = await login({ nik });
      const data = await response.json();

      if (!response.ok) {
        alert(getErrorMessage(data));
        return;
      }

      navigate("message");
    } catch {
      alert("Could not reach the server");
    }
  };

  const onBack = () => {
    navigate("landing");
  };

  return createLoginView({ onSubmit, onBack });
}
