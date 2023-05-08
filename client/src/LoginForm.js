import React, { useState } from 'react'
import { signInWithEmailAndPassword } from "firebase/auth";
import  { auth } from "./firebase"
import './LoginForm.css'

function LoginForm({ setLoginOrSignup}) {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
          const userCredential = await signInWithEmailAndPassword(auth, email, password);
          console.log("logged in")
        } catch (error) {
          const errorMessage = error.message;
          // Handle error
        }
      };
    
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