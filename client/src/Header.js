import React from 'react'
import Person2Icon from '@mui/icons-material/Person2';
import ForumIcon from '@mui/icons-material/Forum';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { IconButton } from '@mui/material';
import {Link, useHistory } from "react-router-dom";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import "./Header.css"


function Header( { backButton }) {
  const history = useHistory()

  return (
    <div className="header">
      {backButton ? 
        (
        <IconButton onClick={() => history.replace(backButton)}>
          <ArrowBackIosIcon fontSize="large" className="header__icon"/>
        </IconButton>
        ) 
        : 
        (<IconButton> 
          <Person2Icon className="header__icon" fontSize="large"/>
        </IconButton>
        )}
        
        <Link to="/">
          <img 
              className="header__logo"
              src="https://w7.pngwing.com/pngs/698/493/png-transparent-tinder-hd-logo-thumbnail.png" 
              alt="tinder-logo"
          />
        </Link>
        
        <Link to="/chat">
          <IconButton>
              <ForumIcon className="header__icon" fontSize="large" />
          </IconButton>
        </Link>
    </div>
  )
}

export default Header