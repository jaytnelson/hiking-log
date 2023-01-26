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

import HikeDetails from './components/HikeDetails';
import HikeList from './components/HikeList';
import HikeNew from './components/HikeNew';
import LogIn from './components/LogIn';
import NavBar from './components/NavBar';

const PrivateRoute = ({ children, auth }) => {
  return auth ? children : <Navigate to="/" />;
}

function App() {
  const { user, isAuthenticated } = useAuth0();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout user={user} />}>
          <Route index element={<LogIn isAuthenticated={isAuthenticated} />} />
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
          <Route
            path="hikes/:hikeid"
            element={
              <PrivateRoute auth={isAuthenticated}>
                <HikeDetails />
              </PrivateRoute>
            }
          />
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
