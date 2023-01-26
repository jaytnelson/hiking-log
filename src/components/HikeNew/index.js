import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import { useForm, Controller } from "react-hook-form";

import styles from './HikeNew.module.scss';

function HikeNew() {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: '',
      date: '',
      distance: '',
      gallery:'',
    }
  });

  const onSubmit = (data) => {
    console.log(data)
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ padding: '16px' }}>
        <h2>New Hike</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
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
