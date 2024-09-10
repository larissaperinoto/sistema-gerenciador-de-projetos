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
        if ((e as Error).message === "Unauthorized") {
          navigate("/");
        } else {
          showToast((e as Error).message, {
            duration: 3000,
          });
        }
      }
    }
    requestLoggedInUser();
  }, []);

  return (
    <header>
      <p>{`Olá, ${loggedInUser?.name}`}</p>
      <button className="button">Sair</button>
      <Toast message={message} onClose={() => showToast(null)} />
    </header>
  );
}
