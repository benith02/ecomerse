import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Style.css";
import "./LoginEffects.css";


function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const userExists = users.find((user) => user.username === username);

    if (userExists) {
      alert("Username already exists");
      return;
    }

    users.push({ username, password });

    localStorage.setItem("users", JSON.stringify(users));

    alert("Registered Successfully");

    navigate("/login");
  };

  return (
    <div className="login-bg">
      <div className="login-box">
        <h3>Register</h3>

        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Create Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Create Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Register</button>
        </form>

        {/* ⭐ Back To Login */}
        <p style={{ marginTop: "15px", textAlign: "center" }}>
          Already have account?{" "}
          <Link to="/login" style={{ color: "#0a84ff", fontWeight: "bold" }}>
            Login Here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
