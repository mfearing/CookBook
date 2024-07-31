import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { Box, AppBar } from '@mui/material';

export default function Footer(){
    return (
        <AppBar position="sticky" color="primary" sx={{ marginTop: 5, bottom: 0 }} >
            <Box sx={{ margin: 3 }}>
                <Typography variant="body2" color="white" align="center" fontSize={18}>
                    {'Copyright © '}
                    <Link color="inherit" href="https://github.com/mfearing">
                    Mr. Fearing's Copyright
                    </Link>{' '}
                    {new Date().getFullYear()}.
                </Typography>
            </Box>  
        </AppBar>
    )
}