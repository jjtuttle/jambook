import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';
import Avatar from '@mui/material/Avatar';
import { stringAvatar} from '../../utils/avatarColorPicker';

import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme, GlobalStyles } from "../../utils/theme";




function ProfileButton({ user, theme }) {

  const [ profTheme, profSetTheme ] = useState("light");
  const isDarkTheme = theme === "dark";

  const toggleTheme = () => {
    const updatedTheme = isDarkTheme ? "light" : "dark";
    profSetTheme(updatedTheme);
    localStorage.setItem("theme", updatedTheme);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (savedTheme && [ "dark", "light" ].includes(savedTheme)) {
      profSetTheme(savedTheme);
    } else if (prefersDark) {
      profSetTheme("dark");
    }
  }, []);
  
  const dispatch = useDispatch();
  const [ showMenu, setShowMenu ] = useState(false);

  const sessionUser = useSelector(state => state?.session?.user);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [ showMenu ]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  

  return (
    <>
      {/* <button onClick={openMenu} className="more-btn"
        style={{
          position:"fixed",
          paddingRight:'10px',
          backgroundColor: 'transparent',
          color: '#1877f2',
          // border: '1px solid white',
          borderRadius: '5px',
          fontWeight: '700',
          fontSize: '14px',
          height: '20px',
          width: '80px',
          cursor: 'pointer',
          border: '1px solid #808080',
          
        }}
      > More... */}
        {/* <i className="fas fa-user-circle"  style={{color:'grey'}}/> */}
      <i><Avatar onClick={openMenu} className="profile_avatar" {...stringAvatar(sessionUser.first.concat(' ', sessionUser.last))} style={{marginTop:'15PX', width:'30px', height:'30px', fontSize:'15px'}} /></i>
      {/* </button> */}
      {showMenu && (
        <ul className="profile__dropdown">
          <li className='profile__username' style={{ color:'#1877f2'}}>{user.username}</li>
          {/* <li>{user.email}</li> */}
          <li>    <button onClick={toggleTheme}>
            {isDarkTheme ? (
              <span aria-label="Light mode" role="img">
                🌞
              </span>
            ) : (
              <span aria-label="Dark mode" role="img">
                🌜
              </span>
            )}
          </button></li>
          <li>
            <button onClick={logout}
              className='profile__logoutBtn'
              style={{
                position: 'absolute',
                backgroundColor: 'transparent',
                // color: '#808080',
                border: '1px solid #808080',
                borderRadius: '5px',
                fontWeight: '700',
                fontSize: '12px',
                color:'#1877f2'
              }}

            >Log Out</button>
          </li>
        </ul>
      )}
    </>
  );
}

export default ProfileButton;
