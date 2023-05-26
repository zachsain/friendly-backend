import React, { useState, useContext } from 'react'
import AppContext from './AppContext';
import TinderCard from 'react-tinder-card';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { IconButton } from '@mui/material';
import Modal from 'react-modal';
import ProfileEditForm from './ProfileEditForm';
import './UserProfile.css';


function UserProfile() {
    const { user } = useContext(AppContext);
    const [isEditFormVisible, setIsEditFormVisible] = useState(false);
    console.log(user);

    function calculateAge(dateOfBirth) {
        const dob = new Date(dateOfBirth);
        const diffInMs = Date.now() - dob.getTime();
        const ageDate = new Date(diffInMs);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
      }
      
      const age = calculateAge(user.profile.dob);

    function handleEditClick(){
        setIsEditFormVisible(!isEditFormVisible)
    }

  return (
    <div className="userProfile">
       <img className="userProfile__image" src={user.profile.featured_image.url} alt="profile-photo" />
       <h1 className="userProfile__h1">{user.profile.first_name} {age}</h1>
       <p className="userProfile__p">{user.profile.bio}</p>
       <IconButton className="edit-icon-container">
        <BorderColorIcon onClick={handleEditClick} className="edit-icon" />
       </IconButton>
       <Modal isOpen={isEditFormVisible} onRequestClose={handleEditClick} appElement={document.getElementById('root')}>
            <ProfileEditForm
                fn={user.profile.first_name}
                ln={user.profile.last_name}
                b={user.profile.bio}
                imageUrl={user.profile.featured_image}
            />
        </Modal>
    </div>
  )
}

export default UserProfile
