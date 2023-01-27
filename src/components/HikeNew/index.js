import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import { useForm, Controller } from "react-hook-form";

import styles from './HikeNew.module.scss';

function HikeNew() {
  const { getAccessTokenSilently } = useAuth0();
  const { control, handleSubmit } = useForm({
    defaultValues: {
      hikeid: '',
      title: '',
      name: '',
      date: '',
      distance: '',
      gallery:'',
    }
  });

  const onSubmit = (data) => {
    const formatted = {...data};
    formatted.hikeid = parseInt(formatted.hikeid, 10);
    formatted.distance = parseFloat(formatted.distance);
    console.log('FORMATTED DATA: ', formatted);
    (async () => {
      try {
        const token = await getAccessTokenSilently();
        const response = await fetch(`${process.env.REACT_APP_HIKE_API_URL}hikes`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formatted)
        });
        console.log('NEW HIKE: ', await response.json());
      } catch (e) {
        if (e) {
          console.error(e);
        }
      }
    })();
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ padding: '16px' }}>
        <h2>New Hike</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.formItem}>
            <Controller
              name="hikeid"
              control={control}
              render={({ field }) => <TextField {...field} label="Hike ID" variant="standard" />}
            />
          </div>
          <div className={styles.formItem}>
            <Controller
              name="title"
              control={control}
              render={({ field }) => <TextField {...field} label="Title" variant="standard" />}
            />
          </div>
          <div className={styles.formItem}>
            <Controller
              name="name"
              control={control}
              render={({ field }) => <TextField {...field} label="Name" variant="standard" />}
            />
          </div>
          <div className={styles.formItem}>
            <Controller
              name="date"
              control={control}
              render={({ field }) => <TextField {...field} label="Date" variant="standard" />}
            />
          </div>
          <div className={styles.formItem}>
            <Controller
              name="distance"
              control={control}
              render={({ field }) => <TextField {...field} label="Distance" variant="standard" />}
            />
          </div>
          <div className={styles.formItem}>
            <Controller
              name="gallery"
              control={control}
              render={({ field }) => <TextField {...field} label="Gallery URL" variant="standard" />}
            />
          </div>
          <div className={styles.formItem}>
            <Button variant="contained" type="submit">Submit</Button>
          </div>
        </form>
      </Box>
    </Container>
  );
}

export default HikeNew;
