import React, { useState, useContext } from 'react';
import AppContext from './AppContext';
import {useHistory} from "react-router-dom";
import './ProfileEditForm.css'

function ProfileEditForm({fn, ln, b, imageUrl}) {

  const [firstName, setFirstName] = useState(fn);
  const [lastName, setLastName] = useState(ln);
  const [errors, setErrors] = useState('');
  const [bio, setBio] = useState(b);
  const [image, setImage] = useState(imageUrl);
  const history = useHistory();
  const {user, setUser} = useContext(AppContext);

  function handleEdit(e){
    e.preventDefault();
    setErrors([]);

    const formData = new FormData();
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("bio", bio);
    formData.append("featured_image", image);

    fetch(`/users/${user.id}/profile`, {
      method: 'PATCH',
      body: formData
    }).then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          setUser(user);
          console.log(user);
          // history.push('/')
        });
      } else {
        r.json().then((error) => {
          setErrors(error.error);
        });
      }
    });

  }

  function onImageChange(e){
    setImage(e.target.files[0]);
}

  return (
    <div className="edit-form-container">
        <form className="edit-form" >
        <h2 className="edit-heading">Edit</h2>
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
          className="edit-input"
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
          className="edit-input"
        />
          <input
          type="bio"
          placeholder="Bio"
          value={bio}
          onChange={(event) => setBio(event.target.value)}
          className="edit-input"
        />

        <input className="image-field" type="file" accept="image/*" multiple={false} onChange={onImageChange} />

        <button type="submit" className="edit-submit-button" onClick={handleEdit}>
          Update
        </button>
        {errors && <p className="signup-error">{errors}</p>}
      </form>
    </div>
  )
}

export default ProfileEditForm