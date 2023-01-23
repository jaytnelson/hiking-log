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

import HikeList from './components/HikeList'
import NavBar from './components/NavBar'

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
  console.log('user: ', isAuthenticated);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout user={user} />}>
          <Route index element={<Home />} />
          {/* <Redirect auth={isAuthenticated} component={<HikeList />} path="hikes" /> */}
          <Route
            path="hikes"
            element={
              <PrivateRoute auth={isAuthenticated}>
                <HikeList />
              </PrivateRoute>
            }
          />
        </Route>
        <Route path="login" element={<Login />} />
      </Routes>
    </Router>
  );
}

function Layout({user = null}) {
  return (
    <div>
      {/* A "layout route" is a good place to put markup you want to
          share across all the pages on your site, like navigation. */}
      <NavBar user={user} />

      {/* An <Outlet> renders whatever child route is currently active,
          so you can think about this <Outlet> as a placeholder for
          the child routes we defined above. */}
      <Outlet />
    </div>
  );
}


function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

function Login({user = null}) {
  return (
    <div>
      <NavBar user={user} />
      <h2>Login</h2>
    </div>
  );
}

export default App;

Layout.propTypes = {
  user: PropTypes.object
};
Login.propTypes = {
  user: PropTypes.object
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