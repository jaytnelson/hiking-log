import React from 'react';
import { 
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet
} from "react-router-dom";

import HikeList from './components/HikeList'
import NavBar from './components/NavBar'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="hikes" element={<HikeList />} />
        </Route>
      </Routes>
    </Router>
  );
}

function Layout() {
  return (
    <div>
      {/* A "layout route" is a good place to put markup you want to
          share across all the pages on your site, like navigation. */}
      <NavBar />

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
