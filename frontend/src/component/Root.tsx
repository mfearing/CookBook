import { Container } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

export default function Root() {

  return (
    <Container maxWidth="lg" >
      <Header />    
      <Container sx={{marginTop: 10}} >
        <Outlet />
      </Container>
      <Footer />
    </Container>
  );
}