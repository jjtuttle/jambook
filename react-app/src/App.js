import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm/LoginForm';
import SignUpForm from './components/auth/SignupForm/SignUpForm';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import Homepage from './components/Homepage/Homepage';
import PageNotFound from './components/PageNotFound/PageNotFound';
import SearchResults from './components/SearchResults/SearchResults';




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

        {/* <Route path='posts/:postId'>
          <Post  />
        </Route> */}

        <ProtectedRoute path='/' exact={true} >


          <Homepage />
          {/* </NavBar> */}
        </ProtectedRoute>

        <Route path='/search/:keyword' exact={true}>
          <SearchResults />
        </Route>

        <Route path="*" component={PageNotFound} />

      </Switch>
    </BrowserRouter>
  );
}

export default App;
