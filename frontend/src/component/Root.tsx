import { Container } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

export default function Root() {

  return (
    <Container>
      <Header />    
      <Container maxWidth="lg" >
        <Outlet />
      </Container>
      <Footer />
    </Container>
  );
}