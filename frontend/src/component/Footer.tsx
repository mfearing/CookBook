import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { Box, BottomNavigation } from '@mui/material';

export default function Footer(){
    return (
        <BottomNavigation showLabels>
            <Box sx={{ margin: 3 }}>
                <Typography variant="body2" color="gray" align="center" fontSize={18}>
                    {'Copyright © '}
                    <Link color="inherit" href="https://github.com/mfearing">
                    Mr. Fearing's Copyright
                    </Link>{' '}
                    {new Date().getFullYear()}.
                </Typography>
            </Box>  
        </BottomNavigation>
    )
}