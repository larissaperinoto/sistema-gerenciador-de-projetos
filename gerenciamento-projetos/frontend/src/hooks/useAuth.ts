import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../services/auth.service";

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = AuthService.getInstance().getToken();
        if (token) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          console.log(`oi3`);
          navigate("/");
        }
      } catch (error) {
        setIsAuthenticated(false);
        console.log(`oi4`);
        navigate("/");
      }
    };

    checkAuth();
  }, []);

  return { isAuthenticated };
}
