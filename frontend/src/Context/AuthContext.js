import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Όταν φορτώνει η εφαρμογή, βλέπουμε αν υπάρχει token
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      const userData = JSON.parse(atob(token.split(".")[1]));
      setUser({ email: userData.email });
    }
  }, []);

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
        setUser({ email: data.user.email });
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.error("Login error:", err);
      return false;
    }
  };

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
        setUser({ email: data.user.email });
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.error("Signup error:", err);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, login, signup, logout, isLoggedIn: !!user }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
