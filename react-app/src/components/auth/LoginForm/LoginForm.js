import React, { useState } from 'react';
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
      <section className="login_container">

        <div className="left_side">
          <div className="login__logo-container">
            <img src={blueLogo} alt="logo" id="login__logo"
              style={{ width: '150px', height: '60px' }}
            />
          </div>
          <div className="left__text">
            <p>Connect with musicians and the world around you on Jambook.</p>
          </div>
        </div>

        {/* //! Right side *************************/}
        <div className="right_side">
          <div className="form__container">
            <form className="login__form" onSubmit={onLogin}>

              {/* //! *********  ERROR HANDLING DIV ******************** */}
              <div className='display_errors'>
                {errors.map((error, ind) => (
                  <ul key={ind}><li>{error}</li></ul>
                ))}
              </div>

              <div className='email-input-wrapper'>
                <input className='email__inputL' 
                  name='email'
                  type='email'
                  placeholder='Email'
                  value={email}
                  onChange={updateEmail}
                />
              </div>

              <div className='password-input-wrapper'>
                <input className='password__inputL' 
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

              <div className="demouser-btn">
                <button className='demo__loginL'
                  onClick={() => handleDemo(demoUser)}>
                  Demo User Login
                </button>
              </div>

              <hr className="login__hr" />

              {/***********  TAKE USER TO SIGNUP PAGE  ****************/}
              <div className="signup-btn-container">
                {/* <a href="/sign-up" exact={true} className="btn-create-new">
                Create new account
              </a> */}
                <button className="signup__btnL"
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

      </section>
      {/* //!  Footer ************************* */}
      <Footer />
    </>
  );
};

export default LoginForm;
