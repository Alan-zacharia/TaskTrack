import { useState, useEffect } from "react";

interface AuthState {
  isAuthenticated: boolean;
  Login: () => void;
  logout: () => void;
}

const useAuth = (): AuthState => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      const data = localStorage.getItem("authToken");
      return !!data;
    } catch (error) {
      console.error(error);
      return false;
    }
  });

  const Login = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
  };
  useEffect(() => {
    try {
      const token = localStorage.getItem("authToken");
      setIsAuthenticated(!!token);
    } catch (error) {
      console.error("Error accessing localStorage", error);
    }
  }, []);

  return { isAuthenticated, Login, logout };
};

export default useAuth;
