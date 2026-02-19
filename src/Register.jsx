import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Style.css";
import "./LoginEffects.css";
import { registerUser } from "./api/auth";


function Register() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if(password !== confirmPassword){
      alert("Passwords do not match");
      return;
    }
    try {
      const data ={
        username,password
      }
      const res = await registerUser(data);
      console.log(res);
      alert("Registered Successfully");
    } catch (error) {
      console.log(error);
      alert("Registration Failed");
    }


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
            onChange={(e)=>setUsername(e.target.value)}
            required
          />

          {/* Password */}
          <div style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Create Password"
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

          {/* Confirm Password */}
          <div style={{ position: "relative" }}>
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e)=>setConfirmPassword(e.target.value)}
              required
            />

            <span
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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

          <button type="submit">Register</button>

        </form>

        <p style={{ marginTop: "15px", textAlign: "center" }}>
          Already have account? <Link to="/login">Login Here</Link>
        </p>

      </div>
    </div>
  );
}

export default Register;
