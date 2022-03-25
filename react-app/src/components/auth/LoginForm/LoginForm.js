import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { login } from '../../../store/session';
import './LoginForm.css';
import SignUpForm from '../SignupForm/SignUpForm';
import { Modal } from '../../../context/Modal';


const LoginForm = () => {
  const [ errors, setErrors ] = useState([]);
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const demoUser = { email: 'demo@aa.io', password: 'password' };

  const [ showModal, setShowModal ] = useState(false);

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
    <div className="login_container">

      <div className="form_container">
        <form className="login__form" onSubmit={onLogin}>

          {/*********  ERROR HANDLING DIV *********************/}
          <div className='display_errors'>
            {errors.map((error, ind) => (
              <ul key={ind}><li>{error}</li></ul>
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
          </div>
          <div className="login__btn">
            <button className='btn__login'
              type='submit'>
              Log In
            </button>
          </div>

          <div className="demouser-btn">
            <button className='demo__login'
              onClick={() => handleDemo(demoUser)}>
              Demo User Login
            </button>
          </div>
          <hr />
          {/***********  TAKE USER TO SIGNUP PAGE  ****************/}
          <div className="signup-btn-container">
            {/* <a href="/sign-up" exact={true} className="btn-create-new">
                Create new account
              </a> */}
            <button className="signup__btn" 
              onClick={() => setShowModal(true)}>Create new account</button>
            {
              showModal && (
                <Modal onClose={() => setShowModal(false)}>
                  <SignUpForm setShowModal={setShowModal} />
                </Modal>
              )
            }

          </div>

          {/* </div> */}
        </form>
      </div >
    </div >
  );
};

export default LoginForm;
