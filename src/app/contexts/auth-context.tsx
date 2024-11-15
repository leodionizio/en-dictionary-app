"use client";
import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  FC,
} from "react";

interface AuthContextType {
  token: string | null;
  storeToken: (token: string) => void;
  clearToken: () => void;
}

const defaultContext: AuthContextType = {
  token: null,
  storeToken: () => {},
  clearToken: () => {},
};

export const AuthContext = createContext<AuthContextType>(defaultContext);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const storeToken = (token: string) => {
    setToken(token);
    localStorage.setItem("accessToken", token);
  };

  const clearToken = () => {
    setToken(null);
    localStorage.removeItem("accessToken");
  };

  return (
    <AuthContext.Provider value={{ token, storeToken, clearToken }}>
      {children}
    </AuthContext.Provider>
  );
};
