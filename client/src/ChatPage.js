import React, { useState, useEffect, useContext } from 'react';
import "./ChatPage.css";
import AppContext from './AppContext';
import ChatBox from './ChatBox';

function ChatPage() {
  const { user, matches, chatPageRender, setChatPageRender} = useContext(AppContext);

  function getTimeDifference(timestamp) {
    const currentTime = new Date();
    const messageTime = new Date(timestamp);
    const difference = Math.floor((currentTime - messageTime) / 1000); 
  
    if (difference < 60) {  
      return 'Just now';
    } else if (difference < 3600) {
      const minutes = Math.floor(difference / 60);
      return `${minutes} ${minutes === 1 ? 'min' : 'mins'} ago`;
    } else if (difference < 86400) {
      const hours = Math.floor(difference / 3600);
      return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    } else {
      const days = Math.floor(difference / 86400);
      return `${days} ${days === 1 ? 'day' : 'days'} ago`;
    }
  }

  const sortedMatches = matches 
    ? [...matches].sort((a, b) => {
        const aTimestamp = a.messages.length > 0 ? new Date(a.messages[a.messages.length - 1].created_at) : new Date(a.matches[0].created_at);
        const bTimestamp = b.messages.length > 0 ? new Date(b.messages[b.messages.length - 1].created_at) : new Date(b.matches[0].created_at);
        return bTimestamp - aTimestamp;
      })
    : [];

  const box = sortedMatches.map((p) => {
    let mostRecentMessage = "";
    p.matches.forEach((match) => {
      const messages = p.messages.filter((m) => m.match_id === match.id);
      if (messages.length > 0) {
        const latestMessage = messages[messages.length - 1];
        mostRecentMessage = latestMessage;
      }
    });

    const timestamp = mostRecentMessage ? getTimeDifference(mostRecentMessage.created_at) : null;
    const matchDate = new Date(p.matches[0].created_at);
    const formattedTime = getTimeDifference(p.matches[0].created_at);
    // ADD READ COLUMN TO MATCHES AND MESSAGES TABLES
    return (
      <ChatBox
        userName={user.profile.first_name}
        setChatPageRender={setChatPageRender}
        name={p.profile.first_name}
        message={mostRecentMessage.content}
        timestamp={mostRecentMessage ? timestamp : formattedTime}
        profilePic={p.profile.featured_image.url}
        id={p.id}
      />
    );
  });

  return <div className="chats">{box}</div>;
}

export default ChatPage;



