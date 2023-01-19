import React from 'react';
import PropTypes from 'prop-types';
import { 
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet
} from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import HikeList from './components/HikeList'
import NavBar from './components/NavBar'

function App() {
  const { user } = useAuth0();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout user={user} />}>
          <Route index element={<Home />} />
          <Route path="hikes" element={<HikeList />} />
        </Route>
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

export default App;

Layout.propTypes = {
  user: PropTypes.shape
};