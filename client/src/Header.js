import React from 'react'
import Person2Icon from '@mui/icons-material/Person2';
import ForumIcon from '@mui/icons-material/Forum';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { IconButton } from '@mui/material';
import {Link, useHistory } from "react-router-dom";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import "./Header.css"


function Header( ) {
  const history = useHistory()

  return (
    <div className="header">
  
        
        {/* <IconButton onClick={() => history.replace(backButton)}>
          <ArrowBackIosIcon fontSize="large" className="header__icon"/>
        </IconButton> */}
        <Link to="/userprofile">
          <IconButton> 
            <Person2Icon className="header__icon" fontSize="large"/>
          </IconButton>
        </Link>
       
        <Link to="/">
          <img 
              className="header__logo"
              src="https://i.imgur.com/8H6MxYS.png"
              // src="https://www.canva.com/design/DAFkhcTlSoU/UXZyJ7Cpy0cDVjYYAUf3_Q/view?utm_content=DAFkhcTlSoU&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink" 
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