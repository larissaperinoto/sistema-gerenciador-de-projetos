import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useToast } from "../../hooks/useToast";
import { Toast } from "../Toast/Toast";
import { AuthService } from "../../services/auth.service";
import "./Login.css";

export function Login() {
  const navigate = useNavigate();
  const { message, showToast } = useToast();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  async function handleLogin(e: any) {
    e.preventDefault();

    if (!email) {
      showToast("Insira um e-mail para prosseguir.", {
        duration: 3000,
      });
    }

    if (!password) {
      showToast("Insira um password para prosseguir.", {
        duration: 3000,
      });
    }

    try {
      if (email && password) {
        await AuthService.getInstance().login({ email, password });
        navigate("/dashboard");
      }
    } catch (e) {
      showToast((e as Error).message, {
        duration: 3000,
      });
    }
  }

  return (
    <div className="login-container">
      <h1>Gerenciador de Projetos</h1>
      <form className="login-form">
        <input
          type="email"
          placeholder="Email"
          className="login-input"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <input
          type="password"
          placeholder="Senha"
          className="login-input"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <button
          type="button"
          className="login-register-button"
          onClick={(e) => handleLogin(e)}
        >
          Entrar
        </button>
        <button
          type="button"
          className="login-register-button"
          onClick={() => navigate("/register")}
        >
          Cria conta
        </button>
      </form>
      <Toast message={message} onClose={() => showToast(null)} />
    </div>
  );
}
