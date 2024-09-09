import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../hooks/useToast";
import { Toast } from "../Toast/Toast";
import { AuthService, UserRole } from "../../services/auth.service";
import "./Register.css";

export function Register() {
  const navigate = useNavigate();
  const { message, showToast } = useToast();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [name, setName] = useState<string>();
  const [role, setRole] = useState<UserRole>();

  async function handleRegister(e: any) {
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

    if (!name) {
      showToast("Insira o nome para prosseguir.", {
        duration: 3000,
      });
    }

    if (!role) {
      showToast("Insira o papel para prosseguir.", {
        duration: 3000,
      });
    }

    try {
      if (email && password && name && role) {
        await AuthService.getInstance().register({
          email,
          password,
          name,
          role,
        });
        navigate("/dashboard");
      }
    } catch (e) {
      showToast((e as Error).message, {
        duration: 3000,
      });
    }
  }

  return (
    <div className="register-container">
      <h1>Cadastro de usuário</h1>
      <form className="register-form">
        <input
          type="email"
          placeholder="Email"
          className="register-input"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <input
          type="password"
          placeholder="Password"
          className="register-input"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <input
          type="text"
          placeholder="Nome"
          className="register-input"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <select
          onChange={(e) => setRole(e.target.value as UserRole)}
          value={role}
        >
          <option value="Gerente">Gerente</option>
          <option value="Desenvolvedor">Desenvolvedor</option>
          <option value="Designer">Designer</option>
        </select>
        <button
          type="button"
          onClick={(e) => handleRegister(e)}
          className="register-button"
        >
          Cadastrar
        </button>
      </form>
      <Toast message={message} onClose={() => showToast(null)} />
    </div>
  );
}
