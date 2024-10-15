import { Grid } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import { useEffect } from 'react';
import { AuthContextType } from '../context/auth';
import useAuthContext from '../hooks/use-auth-context';

export default function Root() {
  const {getAuthByToken} = useAuthContext() as AuthContextType;

  useEffect(() => {
      const token = sessionStorage.getItem('token');
      if(token){
          getAuthByToken(token);
      }
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={2} />
      <Grid item xs={8}>
          <Header />
          <div style={{marginTop: 3}}>
            <Outlet />
          </div>
      </Grid>
      <Grid item xs={2} />
    </Grid>
  );

}