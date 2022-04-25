import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// import DefaultUserImage from '../images/default-user-image.png';
import Avatar from '@mui/material/Avatar';




function User({ closeModal, sessionUser }) {
  const [ user, setUser ] = useState({});
  const { userId } = useParams();

  useEffect(() => {
    if (!userId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);

    })();
  }, [ userId ]);

  if (!user) {
    return null;
  }


  // function ucfirst(str) {
  //   let firstLetter = str.substr(0, 1);
  //   return firstLetter.toUpperCase() + str.substr(1);
  // }

  return (
    <>
      <strong> Welcome back, {user.first} {user.last} </strong>
      <ul>
        <li>
          <Avatar />
        </li>
        <li>
          <strong>Username</strong> {user.username}
        </li>
        <li>
          <strong>First Name</strong> {user.first}
        </li>
        <li>
          <strong>Last Name</strong> {user.last}
        </li>
        <li>
          <strong>Email</strong> {user.email}
        </li>
        <li>
          <strong>Theme</strong> dark/light
        </li>
      </ul>
    </>
  );
}
export default User;























