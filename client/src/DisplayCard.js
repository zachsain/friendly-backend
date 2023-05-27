import React, { useState, useContext } from 'react'
import AppContext from './AppContext';
import TinderCard from 'react-tinder-card';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { IconButton } from '@mui/material';
import Modal from 'react-modal';
import ProfileEditForm from './ProfileEditForm';
import './DisplayCard.css';
// import './Cards.css';


function DisplayCard({name, dob, image}) {
    const { user } = useContext(AppContext);


    function calculateAge(dateOfBirth) {
        const dob = new Date(dateOfBirth);
        const diffInMs = Date.now() - dob.getTime();
        const ageDate = new Date(diffInMs);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
      }
      
      const age = calculateAge(dob);

    function handleEditClick(){
     
    }

    return (
        <div className="tinder--card">
          <div onClick={handleEditClick} className="displayCard">
            <div className="displayCard__image-container">
              <img className="tinder--card-img" src={image} alt="profile-photo" />
              <h1 className="dislpayCard__h1">
                {name}, {age}
              </h1>
            </div>
          </div>
        </div>
      );
    
}

export default DisplayCard