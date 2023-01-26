import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { useAuth0 } from "@auth0/auth0-react";

import styles from './LogIn.module.scss';

function LogIn({isAuthenticated}) {
  const { loginWithRedirect, logout } = useAuth0();
  return (
    <Container maxWidth="lg">
      <Box sx={{ padding: '16px', height: '100vh' }}>
        <div className={styles.loginContainer}>
          <div className={styles.loginContent}>
            {isAuthenticated ? (
              <Button variant="contained" onClick={() => logout({ returnTo: process.env.REACT_APP_REDIRECT })}>Log Out</Button>
            ) : (
              <Button variant="contained" onClick={() => loginWithRedirect()}>Log In</Button>
            )}
          </div>
        </div>
      </Box>
    </Container>
  );
}

export default LogIn;

LogIn.propTypes = {
  isAuthenticated: PropTypes.bool
};
