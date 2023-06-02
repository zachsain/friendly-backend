import React, { useState, useEffect, useContext, useRef } from 'react';
import TinderCard from 'react-tinder-card';
import AppContext from './AppContext';
import CloseIcon from '@mui/icons-material/Close';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SwipeButtons from './SwipeButtons';
import { Link } from 'react-router-dom'
import './Cards.css';
import './DisplayCard.css';

function Card() {
  const [profiles, setProfiles] = useState([]);
  const [errors, setErrors] = useState("")
  const [swipeeId, setSwipeeId] = useState(0)
  const {user, setUser, matches, setMatches, setChatPageRender} = useContext(AppContext);
  const tinderCardRef = useRef(null);

  useEffect(() => {
    fetch('/profiles')
      .then((r) => r.json())
      .then((p) => setProfiles(p));
  }, []);

  function handleSwipeRight(id) {
    console.log('right');
    tinderCardRef.current.swipe('right');
    console.log(id)

    fetch("/swipes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        swipee_id: id,
        swiper_id: user.id,
        direction: "right"
      
      }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((obj) =>{
          console.log(obj)
          if (obj.match) {
            let previous = matches 
            let updatedMatches = [...previous, obj.user]
            setMatches(updatedMatches)
            setChatPageRender(true)
          }
        })   
      } else {
        r.json().then((err) => (console.log(err), setErrors(err.errors)));
      }
    });

  }

  function handleSwipeLeft(id) {
    console.log('left');
    tinderCardRef.current.swipe('left');

    fetch("/swipes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        swipee_id: id,
        swiper_id: user.id,
        direction: "left"
      
      }),
    }).catch((err) => {
      setErrors(err.errors);
    });
  }


  function handleCardLeftScreen(id) {
    setSwipeeId(id)
    setProfiles((prevProfiles) => prevProfiles.filter((p) => p.user_id !== id));
    console.log(id)

  }

  console.log(profiles)

  return (
    <div className="tinderCards__cardContainer">
      {profiles.map((p) => (
        <TinderCard
          className="swipe"
          key={p.id}
          preventSwipe={['up', 'down']}
          ref={tinderCardRef}
          onCardLeftScreen={() => handleCardLeftScreen(p.user_id)}
        >
          <div className="tinder--cards">
          <Link to={`/profile/${p.id}`}>
            <div className="tinder--card">
              <div className="displayCard">
                <div className="displayCard__image-container">
                  <img className="tinder--card-img" src={p.featured_image.url} alt="profile-photo" />
                  <h1 className="dislpayCard__h1">
                    {p.first_name} 
                  </h1>
                </div>
              </div>
            </div>
            </Link>
          </div>

          <div className="swipeButtons-conatiner">
            <SwipeButtons
              onSwipeLeft={() => handleSwipeLeft(p.user_id)}
              onSwipeRight={() => handleSwipeRight(p.user_id)}
            />
          </div>

        </TinderCard>
        
      ))}   
    </div>
  );
}

export default Card;
