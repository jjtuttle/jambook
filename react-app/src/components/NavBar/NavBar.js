import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import './NavBar.css';
import ProfileButton from './ProfileButton';
import circleLogoLightM from '../../images/circle-logo-lightmode.png';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';


const NavBar = () => {
  const sessionUser = useSelector((state) => state.session.user);








  // Sticky navbar ----
  const [ scrolled, setScrolled ] = React.useState(false);

  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 200) {
      setScrolled(true);
    }
    else {
      setScrolled(false);
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
  })
  let navbarClasses = [ 'navbar' ];
  if (scrolled) {
    navbarClasses.push('scrolled');
  }
  // ----- 



  let sessionLinks;

  if (sessionUser) {
    sessionLinks = (
      <div className="nav-container" >

        <div className="nav__left">
        <img className="nav-circle-logo" src={circleLogoLightM} alt="circle logo"
          style={{ marginTop: '3px', width: '30px', height: '30px', }}
          // onclick={alert('Welcome to jambook!')}
        />
        </div>

        <div className="nav__center">
        <a className='link-github' href='https://github.com/jjtuttle' target='_blank' rel='noreferrer'><GitHubIcon style={{fontSize:'30'}} /></a>
        <a className='link-linkedin' href='https://www.linkedin.com/in/jamesjtuttle/' target='_blank' rel='noreferrer'><LinkedInIcon style={{ fontSize: '30' }} /></a>
        </div>

        <div className="nav__right">
        {/* <LogoutButton className=" btn nav-logout-btn" /> */}
        <ProfileButton user={sessionUser} className="btn nav-profile-btn " />
        </div>

      </div>
    )


  } else {
    sessionLinks = (
      <div className="login-signup-links" >
        <div className="nav-login">
          <NavLink to="/login" exact={true} activeClassName="active">
            Login .....
          </NavLink>
        </div>
        <div className="nav-signup">
          <NavLink to="/signup" exact={true} activeClassName="active">
            Sign Up?????
          </NavLink>
        </div>
      </div>
    );
  }
  // todo ————————————————————————————————————————————————————————————————————————
  return (
    // className="nav-container"
    <nav >
      {/* <ul className="nav navbar"> */}
      {/* <li className="home">
          <NavLink to='/' exact={true} activeClassName='active'>
            Home
          </NavLink>
        </li> */}

      {/* <li className="session-links"> */}
      {sessionLinks}
      {/* <NavLink to='/login' exact={true} activeClassName='active'>
            Login
          </NavLink> */}
      {/* </li> */}

      {/* <li>
          <NavLink to='/sign-up' exact={true} activeClassName='active'>
            Sign Up
          </NavLink>
        </li> */}
      {/* <li>
          <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink>
        </li> */}
      {/* <li>
          <LogoutButton />
        </li> */}
      {/* </ul> */}
    </nav>
  );
}

export default NavBar;
