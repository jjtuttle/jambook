import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [ showMenu, setShowMenu ] = useState(false);

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
      <button onClick={openMenu} className="more-btn"
        style={{
          backgroundColor: 'transparent',
          color: '#808080',
          border: '1px solid white',
          borderRadius: '8px',
          fontWeight: '700',
          fontSize: '14px',
          height: '20px',
          width: '80px',
          cursor: 'pointer',
          border: '1px solid #808080',
          
        }}
      > More...
        <i className="fas fa-user-circle"  style={{color:'grey'}}/>
      </button>
      {showMenu && (
        <ul className="profile-dropdown">
          <li>{user.username}</li>
          <li>{user.email}</li>
          <li>
            <button onClick={logout}
              style={{
                position: 'absolute',
                backgroundColor: 'transparent',
                color: '#808080',
                border: '1px solid #808080',
                borderRadius: '5px',
                fontWeight: '700',
                fontSize: '14px',
                
              }}

            >Log Out</button>
          </li>
        </ul>
      )}
    </>
  );
}

export default ProfileButton;
