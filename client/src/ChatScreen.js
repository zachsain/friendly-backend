import React,{ useState } from 'react'
import { Avatar } from '@mui/material'
import "./ChatScreen.css"

function ChatScreen() {
    const [messages, setMessages] = useState([{
        name: "Ellen",
        image: 
            "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Steve_Jobs_Headshot_2010-CROP_%28cropped_2%29.jpg/800px-Steve_Jobs_Headshot_2010-CROP_%28cropped_2%29.jpg",
        message: "whats up"
    }, 
    {
        name: "Ellen",
        image: 
            "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Steve_Jobs_Headshot_2010-CROP_%28cropped_2%29.jpg/800px-Steve_Jobs_Headshot_2010-CROP_%28cropped_2%29.jpg",
        message: "how are you"
    }, 
    {
        message: "going good"
    }, 
])
  return (
    <div className="chatScreen">
        <p className="chatScreen__timestamp"> YOU MATCHED WITH ELLEN ON 10/20/88 </p>
        {messages.map((m) => (
            m.name ? (  
                <div className="chatScreen__message"> 
                    <Avatar className="chat__image" alt={m.name} src={m.image} />
                    <p className="chatScreen__text">{m.message}</p>
                </div>) 
            : 
            ( 
                <div className="chatScreen__message"> 
                    <p className="chatScreen__textUser">{m.message}</p>
                </div>
            )
          
        ))}
    
        <form className="chatScreen__input">
            <input className="chatScreen__inputField" type="text" placeholder="Type a message"/>
            <button className="chatSreen__inputButton">SEND</button>
        </form>
    </div>
  )

}

export default ChatScreen