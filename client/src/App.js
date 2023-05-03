import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Login from './components/Login';
import Logout from './components/Logout'
import Profile from "./components/Profile";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser } from "./redux/userSlice";
import Brands from "./components/Brands";
import Styles from "./components/Styles";
import { fetchBrands } from "./redux/brandsSlice";
import DisplaySinglePiece from "./components/DisplaySinglePiece";
import DisplaySingleStyle from "./components/DisplaySingleStyle";
import { fetchStyles } from "./redux/stylesSlice";
import Home from "./components/Home";
import './App.css';

function App() {

  const [user, setUser] = useState(null)
  const [loggedIn, setLoggedIn] = useState(false)
  const dispatch = useDispatch();
  const [test, setTest] = useState("")
  const [loaded, setLoaded] = useState(false)
  const userData = useSelector((state) => state.user.entities);



  useEffect(() => {
    dispatch(fetchUser());
    setLoaded(true)
  }, [dispatch]); 

  useEffect(() => {
    dispatch(fetchBrands());
    setLoaded(true)
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchStyles());
  }, [dispatch]);

  useEffect(() => {
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  } , []);


  if (!user) return (
    <div style={{
        display:'flex',
        flexFlow: 'row wrap',
        textAlign: 'center',
        justifyContent:'space-around',
        minHeight: '100vh',
        backgroundSize: 'cover',  
        padding: "100px"}}>
        <Login setUser={setUser}/>
    </div>)

  return (
    <div className="App">
    <NavBar user={user} setUser={setUser} />
     <Switch>
       <Route exact path="/logout">
         <Logout setUser={setUser} />
       </Route>
       <Route exact path="/styles">
         <Styles />
       </Route>
       <Route exact path="/brands">
         <Brands />
       </Route>
       <Route exact path="/pieces/:id">
        <DisplaySinglePiece />
       </Route>
       <Route  exact path="/styles/:id">
        <DisplaySingleStyle />
       </Route>
       <Route exact path="/instructions">
          <Home />
       </Route> 
       <Route exact path="/">
          <Profile loaded={loaded}/>
       </Route>  
     </Switch>
   </div>
  );
}

export default App;











// let u;


  // if (userData === null) {
  //   u = null
  // } else if ('errors' in userData){
  //   u = null
  // } else if (userData === undefined){
  //   u = null
  // } else {
  //   u = true
  // }
