import React, { useState } from 'react';
import './SignupForm.css';

function SignupForm({ setLoginOrSignup, setUser }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [errors, setErrors] = useState('');
  const [showErrors, setShowErrors] = useState('')
  const [username, setUsername] = useState('')
  const [bio, setBio] = useState('')

  function handleSignup(e) {
    e.preventDefault();
    setErrors([]);
    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
        email,
      }),
    }).then((r) => {
      if (r.ok) {
        // history.push('/activities');
        r.json().then((user) => setUser(user));
      } else {
        r.json().then((err) => setErrors(err.error), setShowErrors(true));
      }
    });
  }
 
  return (
    <div className="signup-container">
      <form className="signup-form" >
        <h2 className="signup-heading">Sign up</h2>
        {/* <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
          className="signup-input"
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
          className="signup-input"
        /> */}

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          className="signup-input"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="signup-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="signup-input"
        />
         {/* <input
          type="bio"
          placeholder="Bio"
          value={bio}
          onChange={(event) => setBio(event.target.value)}
          className="signup-input"
        /> */}
        <button type="submit" className="signup-button" onClick={handleSignup}>
          Sign up
        </button>
        <h4>Already have an account?</h4>
        <button onClick={() => setLoginOrSignup(true)} type="submit" className="signup-button">
          Login
        </button>
        {errors && <p className="signup-error">{errors}</p>}
      </form>

        
      {/* <button onClick={logout}> Logout </button> */}
    </div>
  );
};

export default SignupForm;
