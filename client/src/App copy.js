import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './Header';
import ReactDOM from "react-dom/client";
import { Switch, Route } from "react-router-dom";
import Card from './Card';
import SwipeButtons from './SwipeButtons';
import Chats from './Chats';
import ChatScreen from './ChatScreen';
import SignupForm from './SignupForm';
import CreateProfile from './CreateProfile';
import Login from './Login';


function App() {
  // const [user, setUser] = useState(auth.currentUser)

  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged((user) => {
  //     setUser(user);
  //   });
  //   return unsubscribe;
  // }, []);


  return (
    <div className="App">
      {/* <Header/> */}
     <Login/>
      {/* <CreateProfile /> */}
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
      </Switch> */}
      
    </div>
  );
}


export default App;

