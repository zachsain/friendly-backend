import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './Header';
// import ReactDOM from "react-dom/client";
import { Switch, Route } from "react-router-dom";
import Card from './Card';
import SwipeButtons from './SwipeButtons';
import Chats from './Chats';
import ChatScreen from './ChatScreen';
import SignupForm from './SignupForm';
import CreateProfile from './CreateProfile';
import UserProfile from './UserProfile';
import Login from './Login';
import AppContext from './AppContext';


function App() {
  const [user, setUser] = useState(null)

  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged((user) => {
  //     setUser(user);
  //   });
  //   return unsubscribe;
  // }, []);

  useEffect(() => {
    // auto-login
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => (setUser(user), console.log(user)));
   
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
          }
        });

    }

  return (
    <div className="App">
    <AppContext.Provider value={user}>
    <Header /> 
      <Switch>
      <Route path = "/chat/:person">
          <ChatScreen />
        </Route>
        <Route path = "/chat">
          <Chats />
        </Route>
        <Route path = "/userprofile">
          <UserProfile />
        </Route>
        <Route exact path = "/">
          <Card />
          <SwipeButtons />
        </Route>
      </Switch>
      <button onClick={handleLogout}>LogOut</button> 
      </AppContext.Provider>
    </div>
  );
}


export default App;

