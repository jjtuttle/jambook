import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory, Link } from 'react-router-dom';
import { login } from '../../../store/session';
import './LoginForm.css';

const LoginForm = () => {
  const [ errors, setErrors ] = useState([]);
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const demoUser = { email: 'demo@aa.io', password: 'password' };

  const handleDemo = (demo) => {
    const { email, password } = demo;
    dispatch(login(email, password));
    history.push('/');
  }

  const onLogin = async (e) => {
    e.preventDefault();

    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }

    e.target.reset();
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className="login-container">
      <h1>LOGIN</h1>
      <div className="form-container">
        <form className="login-form" onSubmit={onLogin}>

          {/*********  ERROR HANDLING DIV *********************/}
          <div className='display-errors'>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>

          <div className='email-input-wrapper'>
            <input className='email-input'
              name='email'
              type='text'
              placeholder='Email'
              value={email}
              onChange={updateEmail}
            />
          </div>

          <div className='password-input-wrapper'>
            <input className='password-input'
              name='password'
              type='password'
              placeholder='Password'
              value={password}
              onChange={updatePassword}
            />

            <div className="login-btn">
              <button type='submit'>Log In</button>
            </div>

            <div className="demouser-btn">
              <button className='btn btn-demo-login'
                onClick={() => handleDemo(demoUser)}>
                Demo User Login
              </button>
            </div>
            {/***********  TAKE USER TO SIGNUP PAGE  ****************/}
            <div className="signup-btn">
              <Link to="/signup" exact={true}>
                <button type="submit">Create new account</button>
              </Link>
            </div>

          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
