import React, { useState, useEffect, useContext, useRef } from 'react';
import TinderCard from 'react-tinder-card';
import AppContext from './AppContext';
import CloseIcon from '@mui/icons-material/Close';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SwipeButtons from './SwipeButtons';
import { Link } from 'react-router-dom'
import './Cards.css';
import './DisplayCard.css';
import './SwipeButtons.css'
import {InfinitySpin, Rings} from 'react-loader-spinner';

function Card() {
  const [profiles, setProfiles] = useState([]);
  const [errors, setErrors] = useState("")
  const [swipeeId, setSwipeeId] = useState(0)
  const {user, setUser, matches, setMatches, setChatPageRender, chatPageRender} = useContext(AppContext);
  const tinderCardRef = useRef(null);
  const [imageDimensions, setImageDimensions] = useState({});
  const [isEndOfProfiles, setIsEndOfProfiles] = useState(false);
  let isLandscape;

  async function fetchImageDimensions(url) {
    try {
      isLandscape = await isLandscapeImage(url);
      const dimensions = isLandscape ? { width: '100%', height: 'auto' } : { width: 'auto', height: '100%' };
      setImageDimensions(dimensions);
    } catch (error) {
      console.error('Error determining image dimensions:', error);
      setImageDimensions({ width: '100%', height: 'auto' });
    }
  }

  async function isLandscapeImage(url) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = url;
      img.onload = () => {
        const { width, height } = img;
        const isLandscape = width > height;
        resolve(isLandscape);
      };
      img.onerror = () => reject();
    });
  }


  useEffect(() => {
    fetch('/profiles')
      .then((r) => r.json())
      .then((p) => (setProfiles(p), setIsEndOfProfiles(p.length === 0)));
      
  }, []);


  function calculateAge(dateOfBirth) {
    const dob = new Date(dateOfBirth);
    const diffInMs = Date.now() - dob.getTime();
    const ageDate = new Date(diffInMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }
  
  
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
        direction: "right",
      
      }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((obj) =>{
          console.log(obj)
          if (obj.match) {
            let previous = matches 
            let updatedMatches = [...previous, obj.user]
            setMatches(updatedMatches)
            setChatPageRender(!chatPageRender)
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
                  <img 
                    // className={`tinder--card-img ${isLandscape ? 'tinder--card-img-landscape' : 'tinder--card-img-portrait'}`}
                    className='tinder--card-img'
                    src={p.featured_image.url} 
                    alt="profile-photo" 
                  />
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

      {isEndOfProfiles && (
        <div className="tinder--cards">
          <div className="tinder--card">
            <div className="loading-spinner-container">
              <div className="loading-spinner">
              <h3 className="loading-spinner-h1">Thanks for joining Friendly</h3>
                <div>
                  <Rings
                    height="300"
                    width="250"
                    color="#0071BC"
                    radius="6"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                    ariaLabel="rings-loading"
                    speed={.05}
                  />
                </div>
                <h2 className="loading-spinner-h1">we're looking for more people...</h2>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Card;
