import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import styles from './Home.module.scss';

function Home() {

  return (
    <Container maxWidth="lg">
      <Box sx={{ padding: '16px', height: '100vh' }}>
        <div className={styles.homeContainer}>
          <div className={styles.homeContent}>
            <h2>Welcome!</h2>
          </div>
        </div>
      </Box>
    </Container>
  );
}

export default Home;