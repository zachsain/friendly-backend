import React,{ useState, useContext, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import { Avatar } from '@mui/material'
import AppContext from './AppContext';
import "./ChatScreen.css"

function ChatScreen() {

    const [messageContent, setMessageContent] = useState("")
    const {user, setUser, matches, setMatches, isLoaded} = useContext(AppContext);
    const [profile, setProfile] = useState([])
    const [matchId, setMatchId] = useState(0)
    const { id } = useParams()
    // console.log(id)
    // console.log(matches)

    useEffect(() => {
        if (isLoaded && matches) {
          // Perform any necessary operations with matches data
          let userProfile = matches.find((m) => m.id === parseInt(id));
          let match_id = user && user.matches.find(
            (m) =>
              (m.user1_id === parseInt(id) || m.user1_id === user.id) &&
              (m.user2_id === parseInt(id) || m.user2_id === user.id)
          );

          setMatchId(match_id.id)
        //   console.log(match_id.id);
        //   console.log(userProfile);
          setProfile(userProfile)
        }
      }, [isLoaded, matches, id, user]);

      console.log(matchId)
      console.log(id)
      console.log(user)
      console.log(profile)
 
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

        fetch("/messages", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              sender_id: user.id,
              receiver_id: parseInt(id),
              match_id: matchId,
              content: messageContent 
            }),
          }).then((r) => {
            if (r.ok) {
              r.json().then((obj) =>{
                console.log(obj)
              })   
            } else {
              r.json().then((err) => (console.log(err)));
            }
          });
     
    }

      if (!isLoaded || !matches) return <h1>Loading...</h1>;

  return (
    <div className="chatScreen">
        <p className="chatScreen__timestamp"> YOU MATCHED WITH ELLEN ON 10/20/88 </p>
        {/* {messages.map((m) => (
            m.name ? (  
                <div className="chatScreen__message"> 
                    <Avatar 
                        className="chat__image" 
                        alt={m.name} 
                        src={profile.profile.featured_image.url} 
                    />
                    <p className="chatScreen__text">{m.message}</p>
                </div>) 
            : 
            ( 
                <div className="chatScreen__message"> 
                    <p className="chatScreen__textUser">{m.message}</p>
                </div>
            )
          
        ))} */}
    
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