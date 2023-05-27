import React, { useState, useEffect, useContext} from 'react'
import TinderCard from 'react-tinder-card'
import AppContext from './AppContext'
// import { Spring } from 'react-spring/web'
import './Cards.css'

function Card() {
    const [profiles, setProfiles] = useState([])
    const user = useContext(AppContext);

    useEffect(() => {
      fetch('/profiles')
      .then(r => r.json())
      .then((p) => setProfiles(p))
    }, []);

    console.log(profiles)

    // if (!Array.isArray(user) || user === null) {
    //   return null; 
    // }
   
  return (
    <div className="card-container"> 
        <div className="tinderCards__cardContainer">
          {profiles.map(p => {
            return <TinderCard
                    className="swipe"
                    key= {p.name}
                    preventSwipe={['up', 'down']}
                  >
                  <div 
                      style={{ backgroundImage: `url(${p.featured_image.url})`}}
                      className="card"
                  >
                  <h3>{p.first_name}</h3>
                  </div>
            </TinderCard>
          })}
        </div>
    </div>
  )
}

export default Card