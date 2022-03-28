import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { login } from '../../../store/session';
import './LoginForm.css';
import SignUpForm from '../SignupForm/SignUpForm';
import { Modal } from '../../../context/Modal';
import Footer from '../../Footer/Footer';
import blueLogo from '../../../images/jambook-logo-blue.png'

const LoginForm = () => {
  const [ errors, setErrors ] = useState([]);
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const demoUser = { email: 'demo@aa.io', password: 'password' };

  const [ showModal, setShowModal ] = useState(false);


  useEffect(() => {
    const errors = [];
    const emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    if (!email) errors.push('Please provide a valid email');
    // if (username.length > 40) errors.push('Please provide a shorter username (40 chars or less).');
    // if (username.length < 4) errors.push('Please provide a longer username (between 4 and 40 chars).')
    if (emailRegex.exec(email) === null) errors.push('Please provide a valid email.');
    if (password.length < 8) errors.push('Please provide a password with 8 characters or more.');


    setErrors(errors);
  }, [ email, password ])

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
    <>
      {/* //! Left side *****************  */}
      <div className="main_container">
        <div className="outer__container">

          <div className="inner__left-container col">

            <img src={blueLogo} alt="logo" id="login__logo"
              style={{ width: '150px', height: '60px' }}
            />
            <p>Connect with musicians and the world around you on Jambook.</p>
          </div>


          {/* //! Right side *************************/}
          <div className="inner__right-container col">
            <div className="form__box">

              <form onSubmit={onLogin}>

                {/* //! *********  ERROR HANDLING DIV ******************** */}
                <div className='display__errorsL'>
                  {/* {errors.map((error, ind) => (
                    <ul key={ind}><li>{error}</li></ul>
                  ))} */}
                </div>

                <div className='email__input-wrapper'>
                  <input className='email__inputL'
                    maxLength="255"
                    required
                    name='email'
                    type='email'
                    placeholder='Email'
                    value={email}
                    onChange={updateEmail}
                  />
                </div>

                <div className='password__input-wrapper'>
                  <input className='password__inputL'
                    maxLength="255"
                    required
                    name='password'
                    type='password'
                    placeholder='Password'
                    value={password}
                    onChange={updatePassword}
                  />
                </div>

                <div className="login__btnL">
                  <button className='btn__loginL' x
                    type='submit'>
                    Log In
                  </button>
                </div>

                <div className="demouser-btnL">
                  <button className='btn__demo__loginL'
                    onClick={() => handleDemo(demoUser)}>
                    Demo User Login
                  </button>
                </div>
              </form>

              <hr className="login__hr" />

              {/***********  TAKE USER TO SIGNUP PAGE  ****************/}

              {/* <a href="/sign-up" exact={true} className="btn-create-new">
                Create new account
              </a> */}
              <button className="signup__btnL"
                onClick={() => setShowModal(true)}>
                Create new account
              </button>
              {
                showModal && (
                  <Modal onClose={() => setShowModal(false)}>
                    <SignUpForm setShowModal={setShowModal} />
                  </Modal>
                )
              }
              {/* </div> */}
            </div >
            <p>Create account for celebrity, brand or business </p>
          </div >
        </div>
      </div>
      {/* //!  Footer ************************* */}
      <Footer />
    </>
  );
};

export default LoginForm;
