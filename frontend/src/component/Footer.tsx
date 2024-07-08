import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { AppBar, Box } from '@mui/material';

function Copyright(){
    return (
        <Box sx={{ margin: 3 }}>
            <Typography variant="body2" color="white" align="center" fontSize={18}>
                {'Copyright © '}
                <Link color="inherit" href="https://mui.com/">
                Mr. Fearing's Copyright
                </Link>{' '}
                {new Date().getFullYear()}.
            </Typography>
        </Box>
        
    )
}


export default function Footer(){

    return (
        <AppBar position="sticky" style={{ bottom: 10 }}>
            <Container maxWidth="xl">
                <Copyright />        
            </Container>
        </AppBar>
    )
}