import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';
import Avatar from '@mui/material/Avatar';
import { stringAvatar} from '../../utils/avatarColorPicker';
import UserModal from '../Users/UserModal';
import { NavLink } from 'react-router-dom';

function ProfileButton({ user, theme }) {


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
          <li className='profile__username' style={{ color:'#003f96'}}>Welcome, {user.username}</li>
          {/* <li>{user.email}</li> */}
          <hr />
          <li><UserModal /> </li>
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
                color:'#1877f2',
                marginTop:'20px'
              }}

            >Log Out</button>
          </li>
        </ul>
      )}
    </>
  );
}

export default ProfileButton;
