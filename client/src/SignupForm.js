import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './SignupForm.css';

function SignupForm({ setLoginOrSignup, setUser }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [errors, setErrors] = useState('');
  const [showErrors, setShowErrors] = useState('');
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [image, setImage] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState(null);
  const genderOptions = ['Male', 'Female', 'Non-binary', 'Other'];

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
        first_name: firstName,
        last_name: lastName,
        bio,
        gender,
        dob,
        featured_image: image
      
      }),
    }).then((r) => {
      if (r.ok) {
        // history.push('/activities');
        r.json().then((user) => (setUser(user), console.log(user)));
      } else {
        r.json().then((err) => setErrors(err.error), setShowErrors(true));
      }
    });
  }

  function onImageChange(e){
    setImage(e.target.files[0]);
}

  function handleGenderChange(e){
    setGender(e.target.value);
  }

  function handleDobChange(date) {
    setDob(date);
  }
 
  return (
    <div className="signup-container">
      <form className="signup-form" >
        <h2 className="signup-heading">Sign up</h2>
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
        <input
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
        />
          <input
          type="bio"
          placeholder="Bio"
          value={bio}
          onChange={(event) => setBio(event.target.value)}
          className="signup-input"
        />
        <label htmlFor="gender">Gender:</label>
          <select id="gender" name="gender" value={gender} onChange={handleGenderChange}>
          <option value="">Select Gender</option>
          {genderOptions.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        <div className="dob">
          <label className='dob-label' htmlFor="dob">DOB:</label>
              <DatePicker
              id="dob"
              selected={dob}
              onChange={handleDobChange}
              dateFormat="MM/dd/yyyy"
              showYearDropdown
              scrollableYearDropdown
              yearDropdownItemNumber={100}
              />
        </div>
        
        <input className="image-field" type="file" accept="image/*" multiple={false} onChange={onImageChange} />

        <button type="submit" className="signup-button" onClick={handleSignup}>
          Sign up
        </button>
        <h4>Already have an account?</h4>
        <button onClick={() => setLoginOrSignup(true)} type="submit" className="signup-button">
          Login
        </button>
        {errors && <p className="signup-error">{errors}</p>}
      </form>
    </div>
  );
};

export default SignupForm;
