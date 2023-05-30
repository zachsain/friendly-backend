import React,{ useState, useContext } from 'react'
import { Avatar } from '@mui/material'
import AppContext from './AppContext';
import "./ChatScreen.css"

function ChatScreen() {

    const [messageContent, setMessageContent] = useState("")
    const {user, setUser, matches, setMatches} = useContext(AppContext);
    

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
    function handleSendMessage(e){
        e.preventDefault()
        console.log(e.target.value)
        console.log(messageContent)

        // fetch("/messages", {
        //     method: "POST",
        //     headers: {
        //       "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify({
        //       sender_id: id,
        //       receiver_id: user.id,
        //       match_id: "right",
        //       content: ""
            
        //     }),
        //   }).then((r) => {
        //     if (r.ok) {
        //       r.json().then((obj) =>{
        //         console.log(obj)
        //         if (obj.match) {
        //           let previous = matches 
        //           let updatedMatches = [...previous, obj.user]
        //           setMatches(updatedMatches)
        //         }
        //       })   
        //     } else {
        //       r.json().then((err) => (console.log(err)));
        //     }
        //   });
     
    }

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
            <input 
                className="chatScreen__inputField" 
                value={messageContent}  
                onChange={(event) => setMessageContent(event.target.value)}
                type="text" 
                placeholder="Type a message"
            />
            <button onClick={handleSendMessage} className="chatSreen__inputButton">SEND</button>
        </form>
    </div>
  )

}

export default ChatScreen