import React from "react";
import { Box, Container, TextField, Button, CssBaseline } from "@mui/material";
import useAuthContext from "../../hooks/use-auth-context";


export default function RegisterPage(){

    const authContext = useAuthContext();
    if(authContext === null){
        throw new Error('uh oh! Auth Context undefiend!');
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log(data);
        authContext.registerNewLogin({
            firstName: data.get('firstName') as string,
            lastName: data.get('lastName') as string,
            login: data.get('login') as string,
            password: data.get('password') as string
        });
    };

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', }} >
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField margin="normal"  required fullWidth id="firstName" label="First Name" name="firstName" autoComplete="First Name" autoFocus />
            <TextField margin="normal"  required fullWidth id="lastName" label="Last Name" name="lastName" autoComplete="Last Name" />
            <TextField margin="normal"  required fullWidth id="login" label="Login"name="login" autoComplete="login" />
            <TextField margin="normal" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password" />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} >
              Register Me!
            </Button>
          </Box>
        </Box>
      </Container>
    );
}