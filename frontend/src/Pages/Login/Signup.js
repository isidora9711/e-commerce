import React, { useState, useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const { signup, isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();
    const success = signup(email, password);
    if (success) {
      setError("");
      navigate("/login");
    } else {
      setError("User already exists or invalid data");
    }
  };

  if (isLoggedIn) {
    navigate("/"); // αν είναι ήδη logged in
    return null;
  }

  return (
    <div className="auth-container">
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
