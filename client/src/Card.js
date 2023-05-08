import React, { useState, useEffect} from 'react'
import TinderCard from 'react-tinder-card'
import db from './fb';
import './TinderCards.css'

function Card() {
    const [people, setPeople] = useState([])

    useEffect(() => {
      // const unsubscribe = db.collection('people').onSnapshot(snapshot => {
      //   const p = snapshot.docs.map(doc => doc.data());
      //   setPeople(p);
      // });

      // return () => {
      //   unsubscribe()
      // }
      // when component mounts this use effect creates a listener 
      // as the user swipes through the collection changes 
      // we need to unsubscribe after each swipe so we don't have 100's 
      // of listeners 
      // this is called a cleanup function ^^
    }, []);

  return (
    <div className="card-container"> 
        <div className="tinderCards__cardContainer">
          {people.map(person => {
            return  <TinderCard
                    className="swipe"
                    key= {person.name}
                    // preventSwipe={['up', 'down']}
                  >
                  <div 
                      style={{ backgroundImage: `url(${person.url})`}}
                      className="card"
                  >
                  <h3>{person.name}</h3>
                  </div>
            </TinderCard>
          })}
        </div>
    </div>
  )
}

export default Card