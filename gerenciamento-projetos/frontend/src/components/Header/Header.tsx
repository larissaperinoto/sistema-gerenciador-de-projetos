import { useEffect, useState } from "react";
import { AuthService, UserType } from "../../services/auth.service";
import { useToast } from "../../hooks/useToast";
import { useNavigate } from "react-router-dom";
import { Toast } from "../Toast/Toast";
import "./Header.css";

export function Header() {
  const { message, showToast } = useToast();
  const navigate = useNavigate();

  const [loggedInUser, setLoggedInUser] = useState<UserType>();

  useEffect(() => {
    async function requestLoggedInUser() {
      try {
        const user = await AuthService.getInstance().getLoggedInUser();
        setLoggedInUser(user);
      } catch (e) {
        showToast((e as Error).message, {
          duration: 3000,
        });
      }
    }
    requestLoggedInUser();
  }, []);

  return (
    <header>
      <div>
        <p>{`Olá, ${loggedInUser?.name}`}</p>
        <button
          className="button"
          onClick={() => {
            console.log(`oi`);
            navigate("/");
            localStorage.clear();
          }}
        >
          Sair
        </button>
      </div>
      <Toast message={message} onClose={() => showToast(null)} />
    </header>
  );
}
