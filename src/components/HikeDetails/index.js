import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import { DateTime } from 'luxon';

import styles from './HikeDetails.module.scss';

function HikeDetails() {
  const { hikeid } = useParams()
  const { getAccessTokenSilently } = useAuth0();
  const [hike, setHike] = useState(null);
  console.log('HIKE: ', hike);

  useEffect(() => {
    (async () => {
      try {
        const token = await getAccessTokenSilently();
        const response = await fetch(`${process.env.REACT_APP_HIKE_API_URL}hikes/${hikeid}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setHike(await response.json());
      } catch (e) {
        if (e) {
          console.error(e);
        }
      }
    })();
  }, [getAccessTokenSilently]);

  return (
    <Container maxWidth="lg">
      <Box sx={{ padding: '16px' }}>
        {hike && hike.length > 0 ? (
          <>
            <h2>{hike[0]?.name}</h2>
            <TableContainer component={Paper}>
              <Table aria-label="hike table">
                <TableBody>
                  <TableRow>
                    <TableCell align="left">Date</TableCell>
                    <TableCell align="right">{DateTime.fromISO(hike[0]?.date).toLocaleString()}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left">Distance</TableCell>
                    <TableCell align="right">
                      {hike[0]?.distance && (
                        <span>{hike[0].distance} miles</span>
                      )}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left">Gallery</TableCell>
                    <TableCell align="right">{hike[0]?.gallery && (<a href={hike[0].gallery} target='_blank' rel='noreferrer'>{hike[0].gallery}</a>)}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </>
        ) : (
          <div className={styles.progressContainer}>
            <div className={styles.progressContent}>
              <CircularProgress />
            </div>
          </div>
        )}
      </Box>
    </Container>
  );
}

export default HikeDetails;
