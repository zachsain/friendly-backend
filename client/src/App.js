import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './Header';
// import ReactDOM from "react-dom/client";
import { Switch, Route } from "react-router-dom";
import Card from './Card';
import SwipeButtons from './SwipeButtons';
import Chats from './ChatPage';
import ChatScreen from './ChatScreen';
import UserProfile from './UserProfile';
import Login from './Login';
import AppContext from './AppContext';
import ProfilePage from './ProfilePage';
// import {Blocks} from "react-loader-spinner";
// import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import {InfinitySpin} from 'react-loader-spinner';

// import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

function App() {
  const [user, setUser] = useState(null)
  const [matches, setMatches] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [chatPageRender, setChatPageRender] = useState(false)
  const [logout, setLogout] = useState(false)
  const [render, setRender] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // useEffect(() => {
  //   fetch("/me").then((r) => {
  //     if (r.ok) {
  //       r.json().then((user) => (
  //         setUser(user.user), 
  //         setMatches(user.matched_with), 
  //         console.log(user), 
  //         setIsLoaded(true),
  //         setIsLoggedIn(true)
  //         ));
  //     }
  //   });
  // } , [chatPageRender]);

  useEffect(() => {
    fetch("/me")
      .then((r) => {
        if (r.ok) {
          r.json().then((user) => {
            setUser(user.user);
            setMatches(user.matched_with);
            setIsLoaded(true);
            setIsLoggedIn(true); // Set isLoggedIn to true if the user is logged in
          });
        } else {
          setIsLoaded(true); // Set isLoaded to true even if the request fails
        }
      })
      .catch((error) => {
        setIsLoaded(true); // Set isLoaded to true in case of any error
      });
  }, [chatPageRender]);

  function handleLogout(e){
    e.preventDefault();        
    fetch("/logout", { method: "DELETE" }).then((r) => {
        if (r.ok) {
          console.log("good bye")
          setUser(null)
          setMatches(null)
          setChatPageRender(false)
          setIsLoaded(false)
          setIsLoggedIn(false)
          setLogout(true)
        }
      });
  }

  console.log(user)
  console.log(matches)

  // if (!isLoaded) {
  //   return (
  //     <div className="loading-spinner">
  //      <InfinitySpin 
  //       width='200'
  //       color="#4fa94d"
  //     />
  //     </div>
  //   );
  // }

  if (!user) return (
    <div>
        <Login setIsLoggedIn={setIsLoggedIn} setChatPageRender={setChatPageRender} setUser={setUser} />
    </div>)

  
  return (
    <div className="App">
    <AppContext.Provider 
      value={{
        user, 
        setUser, 
        matches, 
        setMatches, 
        isLoaded, 
        setIsLoaded,
        chatPageRender,
        setChatPageRender
      }}>
    <Header /> 
      <Switch>
      <Route path = "/chat/:id">
          <ChatScreen />
        </Route>
        <Route path = "/chat">
          <Chats />
        </Route>
        <Route path = "/userprofile">
          <UserProfile />
        </Route>
        <Route path = "/profile/:id">
          <ProfilePage />
        </Route>
        <Route exact path="/">
            {user ? (
              <div>
                <Card />
              </div>
            ) : (
              <Login setUser={setUser} />
            )}
          </Route>
      </Switch>
      <button onClick={handleLogout}>LogOut</button> 
      </AppContext.Provider>
    </div>
  );
}


export default App;

