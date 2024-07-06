import { Container, Typography, Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

export default function Root() {

  return (
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
            <Header />
          </Typography>
        </Box>
        <Box>
          <Outlet />
        </Box>
        <Footer />
      </Container>
  );
}