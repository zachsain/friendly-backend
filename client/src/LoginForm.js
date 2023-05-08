import React, { useState } from 'react'
import './LoginForm.css'

function LoginForm({ setUser, setLoginOrSignup}) {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    function handleLogin(e){
      e.preventDefaul()
      console.log(e)
    }

  return (
  <div className="login-container">
    <form className="login-form">
        <h2 className="login-heading">Login</h2>
        <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        className="login-input"
        />
        <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        className="login-input"
        />
        <button onClick={handleLogin} type="submit" className="login-button">
        Log in
        </button>
        <h4>Already have an account?</h4>
        <button onClick={() => setLoginOrSignup(false)} type="submit" className="signup-button">
          Signup
        </button>
    </form>
</div>

  )
}

export default LoginForm