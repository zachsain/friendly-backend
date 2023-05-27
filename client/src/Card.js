import React, { useState, useEffect, useContext, useRef } from 'react';
import TinderCard from 'react-tinder-card';
import AppContext from './AppContext';
import CloseIcon from '@mui/icons-material/Close';
import FavoriteIcon from '@mui/icons-material/Favorite';
import './Cards.css';
import './DisplayCard.css';

function Card() {
  const [profiles, setProfiles] = useState([]);
  const user = useContext(AppContext);
  const tinderCardRef = useRef(null);

  useEffect(() => {
    fetch('/profiles')
      .then((r) => r.json())
      .then((p) => setProfiles(p));
  }, []);

  function handleSwipeRight() {
    console.log('Swiped Right');
    tinderCardRef.current.swipe('right');
  }

  function handleSwipeLeft() {
    console.log('Disliked');
    tinderCardRef.current.swipe('left');
  }

  function handleCardLeftScreen(id) {
    setProfiles((prevProfiles) => prevProfiles.filter((p) => p.id !== id));
    console.log(id)
  }

  return (
    <div className="tinderCards__cardContainer">
      {profiles.map((p) => (
        <TinderCard
          className="swipe"
          key={p.name}
          preventSwipe={['up', 'down']}
          ref={tinderCardRef}
          onCardLeftScreen={() => handleCardLeftScreen(p.id)}
        >
          <div className="tinder--cards">
            <div className="tinder--card">
              <div className="displayCard">
                <div className="displayCard__image-container">
                  <img className="tinder--card-img" src={p.featured_image.url} alt="profile-photo" />
                  <h1 className="dislpayCard__h1">
                    {p.name}
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </TinderCard>
      ))}


        <div className="swipeButtons">
          <button
            id="nope"
            className="swipeButtons__left"
            onClick={handleSwipeLeft}
          >
            <CloseIcon fontSize="large" />
          </button>

          <button
            id="love"
            className="swipeButtons__right"
            onClick={handleSwipeRight}
          >
            <FavoriteIcon fontSize="large" />
          </button>
        </div>
   
    </div>
  );
}

export default Card;
