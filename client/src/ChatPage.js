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
      const aMessages = a.messages && a.messages.filter(m => m.sender_id === user.id || m.receiver_id === user.id);
      const bMessages = b.messages && b.messages.filter(m => m.sender_id === user.id || m.receiver_id === user.id);

      const aTimestamp =
        aMessages && aMessages.length > 0
          ? new Date(aMessages[aMessages.length - 1].created_at)
          : a.matches && a.matches.length > 0
          ? new Date(a.matches[0].created_at)
          : null;
      const bTimestamp =
        bMessages && bMessages.length > 0
          ? new Date(bMessages[bMessages.length - 1].created_at)
          : b.matches && b.matches.length > 0
          ? new Date(b.matches[0].created_at)
          : null;
      return bTimestamp - aTimestamp;
    })
  : [];
    
    console.log(sortedMatches)
    
    const box = sortedMatches.map((p) => {
      let mostRecentMessage = null;
      if (p.matches && p.messages) {
        p.matches.forEach((match) => {
          const messages = p.messages.filter(
            (m) =>
              m.match_id === match.id &&
              (m.sender_id === user.id || m.receiver_id === user.id)
          );
          if (messages.length > 0) {
            const latestMessage = messages[messages.length - 1];
            if (!mostRecentMessage || latestMessage.created_at > mostRecentMessage.created_at) {
              mostRecentMessage = latestMessage;
            }
          }
        });
      }

    const timestamp = mostRecentMessage ? getTimeDifference(mostRecentMessage.created_at) : null;
    const matchDate = new Date(p.matches[0].created_at);
    const formattedTime = getTimeDifference(p.matches[0].created_at);
    // ADD READ COLUMN TO MATCHES AND MESSAGES TABLES
    return (
      <ChatBox
        userName={user.profile.first_name}
        setChatPageRender={setChatPageRender}
        name={p.profile.first_name}
        message={mostRecentMessage ? mostRecentMessage.content : null}
        timestamp={mostRecentMessage ? timestamp : formattedTime}
        profilePic={p.profile.featured_image.url}
        id={p.id}
      />
    );
  });

  return <div className="chats">{box}</div>;
}

export default ChatPage;



