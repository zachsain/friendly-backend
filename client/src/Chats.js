import React from 'react';
import "./Chats.css";
import Chat from './Chat';

function Chats() {
  return (
    <div className="chats">
        <Chat 
            name="Steve"
            message="Hey! How are you?"
            timestamp="35 minutes ago"
            profilePic="https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Steve_Jobs_Headshot_2010-CROP_%28cropped_2%29.jpg/800px-Steve_Jobs_Headshot_2010-CROP_%28cropped_2%29.jpg"
        />
        <Chat 
            name="Jon Robinson"
            message="Hey! How are you?"
            timestamp="25 minutes ago"
            // profilePic="https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Steve_Jobs_Headshot_2010-CROP_%28cropped_2%29.jpg/800px-Steve_Jobs_Headshot_2010-CROP_%28cropped_2%29.jpg"
        />
 
    </div>
  )
}

export default Chats