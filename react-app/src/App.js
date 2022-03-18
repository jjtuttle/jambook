import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm/LoginForm';
import SignUpForm from './components/auth/SignupForm/SignUpForm';
import NavBar from './components/NavBar/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import Homepage from './components/Homepage/Homepage';
import Post from './components/Posts/Posts';


function App() {


  
  const [ loaded, setLoaded ] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [ dispatch ]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      {/* <NavBar /> */}
      <Switch>

        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>

        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>

        <ProtectedRoute path='/users' exact={true} >
          <UsersList />
        </ProtectedRoute>

        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>

        <Route path='posts/:postId'>
          <Post  />
        </Route>

        <ProtectedRoute path='/' exact={true} >
          {/* <h1>My Home Page</h1> */}
          {/* <NavBar> */}
          <Homepage />
          {/* </NavBar> */}
        </ProtectedRoute>

      </Switch>
    </BrowserRouter>
  );
}

export default App;
