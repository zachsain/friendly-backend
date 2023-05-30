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
import SwipeDeck from './SwipeDeck';

function App() {
  const [user, setUser] = useState(null)
  const [matches, setMatches] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // auto-login
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => (
          setUser(user.user), 
          setMatches(user.matched_with), 
          console.log(user), 
          setIsLoaded(true)
          ));
   
      }
    });
  } , []);

  if (!user) return (
    <div>
        <Login setUser={setUser} />
    </div>)

    function handleLogout(e){
      e.preventDefault();        
      fetch("/logout", { method: "DELETE" }).then((r) => {
          if (r.ok) {
            console.log("good bye")
            setUser(null)
            setMatches(null)
          }
        });

    }

  return (
    <div className="App">
    <AppContext.Provider value={{user, setUser, matches, setMatches, isLoaded, setIsLoaded}}>
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
        <Route exact path="/">
            {user ? (
              <div>
                <Card />
                {/* <SwipeDeck /> */}

                {/* <SwipeButtons /> */}
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

