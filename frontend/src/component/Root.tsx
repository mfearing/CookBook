import { Grid } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

export default function Root() {


  return (
    <Grid container spacing={2}>
      <Grid item xs={2} />
      <Grid item xs={8}>
          <Header />
          <div style={{marginTop: 3}}>
            <Outlet />
          </div>
          <Footer />
      </Grid>
      <Grid item xs={2} />
    </Grid>
  );

}