import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        const userData = JSON.parse(atob(token.split(".")[1]));
        setUser({ email: userData.email });
      } catch {
        console.error("Invalid token");
      }
    }
  }, []);

  // --- SIGNUP ---
  const signup = async (name, email, password) => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("authToken", data.token);
        setUser(data.user);
        return true;
      } else {
        console.error(data.message);
        return false;
      }
    } catch (err) {
      console.error("Signup error:", err);
      return false;
    }
  };

  // --- LOGIN ---
  const login = async (email, password) => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("authToken", data.token);
        setUser(data.user);
        return true;
      } else {
        console.error(data.message);
        return false;
      }
    } catch (err) {
      console.error("Login error:", err);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, signup, login, logout, isLoggedIn: !!user }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
