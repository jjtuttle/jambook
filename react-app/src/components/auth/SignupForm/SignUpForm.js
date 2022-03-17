import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, useHistory } from 'react-router-dom';
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
  const history = useHistory();


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
    // NEED MINIMUM LENGTH SET <---------------
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
    <div className="signup-container">
      <div className="signup-header">
        <h1 className="signup-title">Sign Up</h1>
        <span className="signup-text">It's quick and easy</span>
      </div>
      <hr className="signup-hr"></hr>
      <div className="signup-form-container">
        <form className="signup-form" onSubmit={onSignUp}>

          <div className="display-errors">
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>

          <div>
            <label>User Name</label>
            <input className="signup-username-input"
              type='text'
              name='username'
              onChange={updateUsername}
              value={username}
            ></input>
          </div>

          <div>
            <label>Email</label>
            <input className="signup-email-input"
              type='text'
              name='email'
              onChange={updateEmail}
              value={email}
            ></input>
          </div>

          <div>
            <label>Password</label>
            <input className="signup-password-input"
              type='password'
              name='password'
              onChange={updatePassword}
              value={password}
            ></input>
          </div>

          <div>
            <label>Repeat Password</label>
            <input className="signup-confirm-password-input"
              type='password'
              name='repeat_password'
              onChange={updateRepeatPassword}
              value={repeatPassword}
              required={true}
            ></input>
          </div>
          <div className="signup-terms-container">
            <span className="signup-terms-text">
              By clicking Sign Up, you agree to our Terms, Data Policy and Cookies Policy. You may receive SMS Notifications from us and can opt out any time.
            </span>
          </div>

          <div className="signup-btn">
            <button type='submit'>Sign Up</button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
