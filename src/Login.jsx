import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Style.css";
import "./LoginEffects.css";

function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const validUser = users.find(
      user => user.username === username && user.password === password
    );

    if(validUser){
      localStorage.setItem("loggedUser", JSON.stringify(validUser));
      alert("Login Successful");
      navigate("/");
    } else {
      alert("Invalid Username or Password");
    }
  };

  return (
    <div className="login-bg">
      <div className="login-box">
        <h3>Login</h3>

        <form onSubmit={handleLogin}>

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            required
          />

          {/* Password with toggle */}
          <div style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              required
            />

            <span
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: "15px",
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer"
              }}
            >
              👁
            </span>
          </div>

          <button type="submit">Login</button>

        </form>

        <p style={{ marginTop: "15px", textAlign: "center" }}>
          New User? <Link to="/register">Register Here</Link>
        </p>

      </div>
    </div>
  );
}

export default Login;
