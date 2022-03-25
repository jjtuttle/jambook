import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../../store/session';
import './SignupForm.css';

const SignUpForm = () => {
  const [ errors, setErrors ] = useState([]);
  const [ username, setUsername ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ repeatPassword, setRepeatPassword ] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();


  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data)
      }
    }
  };

  // Error handling

  useEffect(() => {
    const errors = [];
    const emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    if (!username) errors.push('Please provide a username');
    if (username.length > 40) errors.push('Please provide a shorter username (40 chars or less).');
    if (username.length < 3) errors.push('Please provide a longer username (between 5 and 255 chars).')
    if (emailRegex.exec(email) === null) errors.push('Please provide a valid email.');
    if (password.length < 8) errors.push('Please provide a password with 8 characters or more.');
    // PASSWORD MAX IS 255 <------------
    if (password !== repeatPassword) errors.push('Passwords do not match');

    setErrors(errors);
  }, [ username, email, password, repeatPassword ])




  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className="signup_container">
      <div className="header__wrap">
        <img className="x-img" src="https://static.xx.fbcdn.net/rsrc.php/v3/yX/r/TdCEremeWv5.png"
          alt="x"
          style={{ width: "24px", height: "24px" }}
        />
        <div className="signup__header">
          <div className="signup__title">Sign Up</div>
          <div className="signup__text">It's quick and easy</div>

        </div>
      </div>
      <div className="signup_form">
        <form className="signup__form" onSubmit={onSignUp}>

          <div className="display__errors">
            {errors.map((error, ind) => (
              <ul key={ind}><li>{error}</li></ul>
            ))}
          </div>

          <div>
            <input className="username__input"
              type='text'
              name='username'
              placeholder="Username"
              onChange={updateUsername}
              value={username}
            ></input>
          </div>

          <div>
            <input className="email__input"
              type='text'
              name='email'
              placeholder="Email"
              onChange={updateEmail}
              value={email}
            ></input>
          </div>

          <div>
            <input className="password__input"
              type='password'
              name='password'
              placeholder="Password"
              onChange={updatePassword}
              value={password}
            ></input>
          </div>

          <div>
            <input className="confirm__password__input"
              type='password'
              name='repeat_password'
              placeholder="Confirm Password"
              onChange={updateRepeatPassword}
              value={repeatPassword}
              required={true}
            ></input>
          </div>
          <div className="terms__container">
            <span className="signup-terms-text">
              By clicking Sign Up, you agree to our Terms, Data Policy and Cookies Policy. You may receive SMS Notifications from us and can opt out any time.
            </span>
          </div>

          <div className="signup__bottom">
            <button className="signup__btn"
              type='submit'>
              Sign Up
            </button>
          </div>

        </form>
      </div>
    </div>

  );
};

export default SignUpForm;
