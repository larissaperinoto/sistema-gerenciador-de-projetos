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

  async function handleLogin(
    email: string | undefined,
    password: string | undefined
  ) {
    if (!email) {
      showToast("Insira um e-mail para prosseguir.", {
        duration: 3000,
      });
      return;
    }

    if (!password) {
      showToast("Insira um password para prosseguir.", {
        duration: 3000,
      });
      return;
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
      <h1 className="title-h1">Gerenciador de Projetos</h1>
      <form className="login-form">
        <input
          type="email"
          placeholder="Email"
          className="input"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <input
          type="password"
          placeholder="Senha"
          className="input"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <button
          type="button"
          className="button button-blue width-total"
          onClick={() => handleLogin(email, password)}
        >
          Entrar
        </button>
        <button
          type="button"
          className="button button-green width-total"
          onClick={() => navigate("/register")}
        >
          Cadastrar
        </button>
      </form>
      <Toast message={message} onClose={() => showToast(null)} />
    </div>
  );
}
