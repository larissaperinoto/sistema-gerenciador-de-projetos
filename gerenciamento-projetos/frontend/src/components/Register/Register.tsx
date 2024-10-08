import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../hooks/useToast";
import { Toast } from "../Toast/Toast";
import { AuthService, UserRole, UserType } from "../../services/auth.service";
import "./Register.css";
import { isEmailValid, isStrongPassword } from "../../utils/validators";

export function Register() {
  const navigate = useNavigate();
  const { message, showToast } = useToast();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [name, setName] = useState<string>();
  const [role, setRole] = useState<UserRole>(UserRole.GERENTE);

  async function handleRegister({ email, password, name, role }: UserType) {
    if (!isEmailValid(email)) {
      showToast("Insira um e-mail válido para prosseguir.", {
        duration: 3000,
      });
      return;
    }

    if (!isStrongPassword(password)) {
      showToast(
        "Insira uma senha com no mínimo 8 caracteres, incluindo uma letra maiúscula, uma letra minúscula, um número e um caracter especial.",
        {
          duration: 3000,
        }
      );
      return;
    }

    if (!name) {
      showToast("Insira o nome para prosseguir.", {
        duration: 3000,
      });
      return;
    }

    if (!role) {
      showToast("Insira o papel para prosseguir.", {
        duration: 3000,
      });
      return;
    }

    try {
      await AuthService.getInstance().register({
        email,
        password,
        name,
        role,
      });
      navigate("/dashboard");
    } catch (e) {
      showToast((e as Error).message, {
        duration: 3000,
      });
    }
  }

  return (
    <div className="register-container">
      <h1 className="title-h1">Cadastro de usuário</h1>
      <form className="register-form">
        <input
          type="email"
          placeholder="Email"
          className="input"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <input
          type="password"
          placeholder="Password"
          className="input"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <input
          type="text"
          placeholder="Nome"
          className="input"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <select
          onChange={(e) => setRole(e.target.value as UserRole)}
          value={role}
          className="input"
        >
          <option value={UserRole.GERENTE}>{UserRole.GERENTE}</option>
          <option value={UserRole.DESENVOLVEDOR}>
            {UserRole.DESENVOLVEDOR}
          </option>
          <option value={UserRole.DESIGNER}>{UserRole.DESIGNER}</option>
        </select>
        <button
          type="button"
          onClick={() =>
            handleRegister({ name, email, password, role } as UserType)
          }
          className="button button-blue width-total"
        >
          Cadastrar
        </button>
        <button
          type="button"
          onClick={() => {
            console.log(`oi`);
            navigate("/");
          }}
          className="button button-gray width-total"
        >
          Voltar
        </button>
      </form>
      <Toast message={message} onClose={() => showToast(null)} />
    </div>
  );
}
