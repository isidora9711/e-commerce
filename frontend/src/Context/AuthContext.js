import React, { createContext, useState } from "react";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Hardcoded user για δοκιμή
  const usersDB = [
    { email: "test@example.com", password: "123456" },
    { email: "admin@example.com", password: "admin123" },
  ];

  const login = (email, password) => {
    const foundUser = usersDB.find(
      (u) => u.email === email && u.password === password
    );
    if (foundUser) {
      setUser({ email: foundUser.email });
      return true;
    } else {
      return false;
    }
  };
  const signup = (email, password) => {
    // Έλεγχος αν υπάρχει ήδη ο χρήστης
    const existingUser = usersDB.find((u) => u.email === email);
    if (existingUser) return false;

    // Προσθήκη νέου χρήστη
    usersDB.push({ email, password });
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoggedIn: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
