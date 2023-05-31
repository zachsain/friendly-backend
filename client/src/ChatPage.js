import React, { useState, useContext } from 'react';
import "./ChatPage.css";
import AppContext from './AppContext';
import ChatBox from './ChatBox';

function ChatPage() {
  const { user, matches } = useContext(AppContext);

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

  const box = matches
    ? matches.map((p) => {
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
        // const formattedTime = new Date(p.matches[0].created_at).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
        const formattedTime = getTimeDifference(p.matches[0].created_at)
        // const formattedTime = `${matchTime.getHours()}:${matchTime.getMinutes()}`;

        return (
          <ChatBox
            userName={user.profile.first_name}
            name={p.profile.first_name}
            message={mostRecentMessage.content}
            timestamp={mostRecentMessage ? timestamp : formattedTime}
            profilePic={p.profile.featured_image.url}
            id={p.id}
          />
        );
      })
    : null;

  return <div className="chats">{box}</div>;
}

export default ChatPage;



