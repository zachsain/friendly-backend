import React, { useState, useContext } from 'react';
import "./ChatPage.css";
import AppContext from './AppContext';
import ChatBox from './ChatBox';

function ChatPage() {
  const { user, matches } = useContext(AppContext);
  // console.log(matches);

  const box = matches
    ? matches.map((p) => {
        let mostRecentMessage = null;
        p.matches.forEach((match) => {
          const messages = p.messages.filter((m) => m.match_id === match.id);
          console.log(messages)
          if (messages.length > 0) {
            const latestMessage = messages[messages.length - 1];
            console.log(latestMessage)
            if (!mostRecentMessage || new Date(latestMessage.created_at) > new Date(mostRecentMessage.created_at)) {
              mostRecentMessage = latestMessage;
            }
          }
        });
        // const timestamp = new Date(mostRecentMessage.created_at).toLocaleTimeString();
        console.log(mostRecentMessage);
        // console.log(p);
        return (
          <ChatBox
            name={p.profile.first_name}
            // message={mostRecentMessage.content}
            // timestamp={timestamp}
            profilePic={p.profile.featured_image.url}
            id={p.id}
          />
        );
      })
    : null;

  return <div className="chats">{box}</div>;
}

export default ChatPage;


