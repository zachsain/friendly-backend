import React from 'react'
import { Avatar } from '@mui/material'
import { Link } from 'react-router-dom'
import "./ChatBox.css"

function Chat({name, message, profilePic, timestamp, id, matchId, matchOpened, messageId, messageRead, mostRecentMessage}) {

  console.log(messageId)
  let opened = false 
  
  if(matchOpened){
    opened = messageRead
  }

  function handleProfileClick(e){
    console.log('click')
  }

  console.log(messageRead)

  const chatBoxClassName = opened ? "chat-read" : "chat-unread";

  function handleOpen(e) {

     if (!matchOpened) {
      fetch(`/match/${matchId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
        }),
      })
        .catch((error) => {
          console.error("Error opening chat:", error);
      });
    } else if (!messageRead){
        fetch(`/messages/${messageId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
          }),
        })
          .catch((error) => {
            console.error("Error opening chat:", error);
        });
    } else {

      return null

    }
  }


  return (
    <Link to={`/chat/${id}`}>
    {/* <div className="chat"> */}
    <div onClick={handleOpen} className={chatBoxClassName}>
        <Avatar onClick={handleProfileClick} className="chat__image" alt={name} src={profilePic} />
        <div className="chat__details">
            <h2>{name}</h2>
            {message ? (
             <p>{message}</p>
          ) : (
            <p id="chat__noMessage" > Say Hello 👋  </p>
            // <span className="handshake-emoji">🤝</span>
          )}
        </div>
        <p className="chat__timestamp"> {timestamp} </p>
    </div>
    </Link>
  )
}


export default Chat