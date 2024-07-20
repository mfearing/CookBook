import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { AppBar, Box, Toolbar } from '@mui/material';

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
        <AppBar position="fixed" color='primary' sx={{ top: 'auto', bottom: 0 }}>
            <Toolbar sx={{alignSelf: 'center'}}>
                <Copyright />        
            </Toolbar>
        </AppBar>
    )
}