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
        r.json().then((user) => setUser(user));
   
      }
    });
  } , []);

  if (!user) return (
    <div>
        <Login setUser={setUser} />
    </div>)

  return (
    <div className="App">
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


      {/* <Switch>
      <Route path = "/chat/:person">
          <Header backButton="/chat" /> 
          <ChatScreen />
        </Route>
        <Route path = "/chat">
          <Header backButton="/" /> 
          <Chats />
        </Route>
        <Route exact path = "/">
          <Header />
          <Card />
          <SwipeButtons />
        </Route>
      </Switch>  */}
      
    </div>
  );
}


export default App;

