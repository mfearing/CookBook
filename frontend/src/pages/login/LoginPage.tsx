import React from "react";
import { Box, Container, TextField, Button, Grid, CssBaseline } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import useAuthContext from "../../hooks/use-auth-context";
import { useState } from "react";


export default function LoginPage(){
    const navigate = useNavigate();
    const [login, setFirstName] = useState('');
    const [password, setPassword] = useState('');

    const authContext = useAuthContext();
    if(authContext === null){
        throw new Error('uh oh! Auth Context undefiend!');
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        authContext.getAuthByLogin({
            login: data.get('login') as string,
            password: data.get('password') as string
        });
        //Setting multiple pieces of state, so should probably use useReducer
        setFirstName('');
        setPassword('');
        navigate('/');
    };

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', }} >
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField margin="normal" value={login} onChange={(e) => setFirstName(e.target.value)}  required fullWidth id="login" label="Login"name="login" autoComplete="login" autoFocus />
            <TextField margin="normal" value={password} onChange={(e) => setPassword(e.target.value)} required fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password" />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} >
              Log Me In!
            </Button>
            <Grid container>
              <Grid item>
                <Link to='/register' >
                  {"Register New Login"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    );
}