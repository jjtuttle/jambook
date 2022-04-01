import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';
import Avatar from '@mui/material/Avatar';
import { stringAvatar} from '../../utils/avatarColorPicker';


function ProfileButton({ user }) {
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
      <i><Avatar onClick={openMenu} className="more-avatar" {...stringAvatar(sessionUser.first.concat(' ', sessionUser.last))} /></i>
      {/* </button> */}
      {showMenu && (
        <ul className="profile-dropdown">
          <li style={{ color:'#1877f2'}}>{user.username}</li>
          {/* <li>{user.email}</li> */}
          <li>Switch Mode</li>
          <li>
            <button onClick={logout}
              style={{
                position: 'absolute',
                backgroundColor: 'transparent',
                // color: '#808080',
                border: '1px solid #808080',
                borderRadius: '5px',
                fontWeight: '700',
                fontSize: '14px',
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
