import React, { useState } from 'react'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'
import './Login.css'

function Login({setUser}) {
    const [loginOrSignup, setLoginOrSignup] = useState(true)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

  return (
    <div className="login">
        {loginOrSignup ? 
            ( 
            <div>
                <LoginForm setUser={setUser} setLoginOrSignup={setLoginOrSignup} />
                <br />
            </div>
            ) 
            : 
            (
            <div>
                <SignupForm setUser={setUser} setLoginOrSignup={setLoginOrSignup}  />
                <br />
                {/* <div>
                <h3 className="new-account-header">Or...</h3>
                <button id="signup-btn" className='btn' onClick={() => setLoginOrSignup(true)}>Login</button>
                </div> */}
            </div>
            )}
    </div>
  )
}

export default Login