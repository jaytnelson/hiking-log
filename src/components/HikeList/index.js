import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';

function HikeList() {
  const [hikes, setHikes] = useState([]);

  const getHikes = () => fetch(process.env.REACT_APP_HIKE_API_URL)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    setHikes(data);
  });

  useEffect(() => {
    getHikes();
  }, []);

  return (
    <Container maxWidth="sm">
      <Box>
        <Paper>
        <ul>
            {hikes.length > 0 && hikes.map((h) => <li key={h.hikeid}>{h.name}</li>)}
        </ul>
        </Paper>
      </Box>
    </Container>
  );
}

export default HikeList;
