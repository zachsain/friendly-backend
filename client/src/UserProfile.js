import React, { useContext } from 'react'
import AppContext from './AppContext';
import TinderCard from 'react-tinder-card'


function UserProfile() {
    const user = useContext(AppContext);
    console.log(user);
  return (
    <div className="userProfile">
        profile page 
    </div>
  )
}

export default UserProfile