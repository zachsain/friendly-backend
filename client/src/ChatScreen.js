import React,{ useState, useContext, useEffect, useRef} from 'react'
import { useParams } from 'react-router-dom';
import { Avatar } from '@mui/material'
import AppContext from './AppContext';
import "./ChatScreen.css"

function ChatScreen() {

    const [messageContent, setMessageContent] = useState("")
    const {user, setUser, matches, setMatches, isLoaded} = useContext(AppContext);
    const [profile, setProfile] = useState(null)
    const [matchId, setMatchId] = useState(0)
    const [matchObj, setMatchObj] = useState([])
    const [msgObj, setMsgObj] = useState(null)
    const [firstName, setFirstName] = useState("")
    const { id } = useParams()
    const chatBoxRef = useRef(null);
    // console.log(id)
    // console.log(matches)

    useEffect(() => {
        if (isLoaded && matches) {

          let userProfile = matches.find((m) => m.id === parseInt(id));
          let match = user && user.matches.find(
            (m) =>
              (m.user1_id === parseInt(id) || m.user1_id === user.id) &&
              (m.user2_id === parseInt(id) || m.user2_id === user.id)
          );
        
          let messages = user && user.messages.filter((m) => m.match_id === match.id)
          setMsgObj(messages)
          setMatchObj(match)
          setMatchId(match.id)
          setProfile(userProfile)
          setFirstName(userProfile.profile.first_name.toUpperCase())
        }
      }, [isLoaded, matches, id, user]);

    
      function scrollToBottom(){
        if (chatBoxRef.current) {
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
          }
      }

      useEffect(() => {
        scrollToBottom();
      }, [msgObj]);
    
   
      console.log(msgObj)
 
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
                setMsgObj(obj.messages)
                setMessageContent("")
              })   
            } else {
              r.json().then((err) => (console.log(err)));
            }
          });
     
    }
    const createdDate = new Date(matchObj.created_at);
    const formattedDate = `${createdDate.getMonth() + 1}/${createdDate.getDate()}/${createdDate.getFullYear()}`;

      if (!isLoaded || !matches) return <h1>Loading...</h1>;

  return (
    <div className="chatScreen" ref={chatBoxRef}>
        <div className="chatScreen--chatContainer" >
        <p className="chatScreen__timestamp"> YOU MATCHED WITH {firstName} ON {formattedDate}</p>
        { profile && msgObj.map((m) => (
            m.sender_id === parseInt(id) ? (  
                <div className="chatScreen__message"> 
                    <Avatar 
                        className="chat__image" 
                        alt={m.name} 
                        src={profile.profile.featured_image.url} 
                    />
                    <p className="chatScreen__text">{m.content}</p>
                </div>) 
            : 
            ( 
                <div className="chatScreen__message"> 
                    <p className="chatScreen__textUser">{m.content}</p>
                </div>
            )
          
        ))}
        </div>
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