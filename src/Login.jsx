import React from 'react'
import './Style.css'

function Login() {
  return (
    <div className="login-bg">
      <div className="login-box">
        <h3>Login</h3>
        <form>
          <input type="text" placeholder="Username" />
          <input type="password" placeholder="Password" />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  )
}

export default Login
