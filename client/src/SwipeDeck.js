import React, { useState, useEffect, useContext} from 'react'
import TinderCard from 'react-tinder-card'
import AppContext from './AppContext'
import DisplayCard from './DisplayCard'
// import { Spring } from 'react-spring/web'
import './DisplayCard.css'
import './SwipeDeck.css'
import './SwipeButtons.css'
import ReplayIcon from '@mui/icons-material/Replay';
import CloseIcon from '@mui/icons-material/Close';
import StarRateIcon from '@mui/icons-material/StarRate';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import { IconButton }  from '@mui/material';

function SwipeDeck() {
    const [profiles, setProfiles] = useState([])
    const {user} = useContext(AppContext);

    useEffect(() => {
      fetch('/profiles')
      .then(r => r.json())
      .then((p) => setProfiles(p))
    }, []);

    console.log(profiles)
    console.log(user)

    // if (!Array.isArray(user) || user === null) {
    //   return null; // Or display a loading message
    // }
    
    return (
      <div class="tinder">
        <div class="tinder--status">
        <i class="fa fa-remove"></i>
        <i class="fa fa-heart"></i>
        </div>
        <div className="tinder--cards">
          {profiles.map((p) => (
            <DisplayCard
              key={p.id}
              name={p.first_name}
              dob={p.dob}
              image={p.featured_image.url}
            />
          ))}
        </div>

      <div class="tinder--buttons">
      <div className="swipeButtons">

        <IconButton className="swipeButtons__repeat">
          <ReplayIcon fontSize="large" />
        </IconButton>
        <IconButton className="swipeButtons__left">
          <CloseIcon fontSize="large" />
        </IconButton>
        <IconButton className="swipeButtons__star">
          <StarRateIcon fontSize="large" />
        </IconButton>
        <IconButton className="swipeButtons__right">
          <FavoriteIcon fontSize="large" />
        </IconButton>
        <IconButton className="swipeButtons__star">
          <FlashOnIcon ontSize="large" />
        </IconButton>

        </div>
        {/* <button id="nope"><i class="fa fa-remove"></i></button>
        <button id="love"><i class="fa fa-heart"></i></button> */}
      </div>
      </div>
    );
}

export default SwipeDeck