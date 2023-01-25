import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { DateTime } from 'luxon';

function HikeList() {
  const { getAccessTokenSilently } = useAuth0();
  const [hikes, setHikes] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const token = await getAccessTokenSilently();
        const response = await fetch(`${process.env.REACT_APP_HIKE_API_URL}hikes`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setHikes(await response.json());
      } catch (e) {
        console.error(e);
      }
    })();
  }, [getAccessTokenSilently]);

  return (
    <Container maxWidth="lg">
      <Box sx={{ padding: '16px' }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Date</TableCell>
                <TableCell align="right">Distance</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {hikes.length > 0 && hikes.map((row) => (
                <TableRow
                  key={row.title}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{DateTime.fromISO(row.date).toLocaleString()}</TableCell>
                  <TableCell align="right">{row.distance}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
}

export default HikeList;
