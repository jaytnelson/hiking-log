import React from 'react';
import PropTypes from 'prop-types';
import { 
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet
} from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import HikeNew from './components/HikeNew';
import HikeList from './components/HikeList';
import Home from './components/Home';
import LogIn from './components/LogIn';
import NavBar from './components/NavBar';

function Redirect({component, path, auth}) {
  if (auth) {
    <Route path={path} element={component} />
  } else {
    return <Navigate to='/' />
  }
}

const PrivateRoute = ({ children, auth }) => {
  return auth ? children : <Navigate to="/login" />;
}

function App() {
  const { user, isAuthenticated } = useAuth0();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout user={user} />}>
          <Route index element={<Home />} />
          <Route
            path="hikes"
            element={
              <PrivateRoute auth={isAuthenticated}>
                <HikeList />
              </PrivateRoute>
            }
          />
          <Route
            path="hikes/new"
            element={
              <PrivateRoute auth={isAuthenticated}>
                <HikeNew />
              </PrivateRoute>
            }
          />
          <Route path="login" element={<LogIn isAuthenticated={isAuthenticated} />} />
        </Route>
      </Routes>
    </Router>
  );
}

function Layout({user = null}) {
  return (
    <div>
      <NavBar user={user} />
      <Outlet />
    </div>
  );
}

export default App;

Layout.propTypes = {
  user: PropTypes.object
};

LogIn.propTypes = {
  isAuthenticated: PropTypes.bool
};

PrivateRoute.propTypes = {
  children: PropTypes.object,
  auth: PropTypes.bool
};

Redirect.propTypes = {
  auth: PropTypes.bool,
  component: PropTypes.object,
  path: PropTypes.string,
};