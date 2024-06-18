import { Typography } from "@mui/material";
import Link from "@mui/material/Link";

export default function Copyright() {
    return (
      <Typography variant="body2" color="text.secondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://mui.com/">
          Mr. Fearing's Totally Real Copyright
        </Link>{' '}
        {new Date().getFullYear()}.
      </Typography>
    );
  }