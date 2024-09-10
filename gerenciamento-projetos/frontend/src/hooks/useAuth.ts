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
          navigate("/");
        }
      } catch (error) {
        setIsAuthenticated(false);
        navigate("/");
      }
    };

    checkAuth();
  }, [navigate]);

  return { isAuthenticated };
}
