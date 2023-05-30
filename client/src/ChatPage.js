import React, { useState, useContext } from 'react';
import "./ChatPage.css";
import AppContext from './AppContext';
import ChatBox from './ChatBox';

function ChatPage() {
  const {user, setUser, matches, setMatches} = useContext(AppContext);

  console.log(matches)

  const box = matches
  ? matches.reverse().map((p) => (
      <ChatBox
        name={p.profile.first_name}
        message="Hey! How are you?"
        timestamp="35 minutes ago"
        profilePic={p.profile.featured_image.url}
        id={p.id}
      />
    ))
  : null;

  

  return (
    <div className="chats">
        {box}
    </div>
  )
}

export default ChatPage