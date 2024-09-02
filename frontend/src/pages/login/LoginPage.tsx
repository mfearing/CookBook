import React from "react";
import { Box, Container, TextField, Button, Grid } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import useAuthContext from "../../hooks/use-auth-context";
import { useState } from "react";
import { AuthContextType } from "../../context/auth";


export default function LoginPage(){
    const navigate = useNavigate();
    const [login, setFirstName] = useState('');
    const [password, setPassword] = useState('');

    const {getAuthByLogin} = useAuthContext() as AuthContextType;

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        //TODO: change the below to use the component state, not the event data
        getAuthByLogin({
            login: login,
            password: password
        });
        //Setting multiple pieces of state, so should probably use useReducer
        setFirstName('');
        setPassword('');
        navigate('/');
    };

    return (
      <Container component="main" maxWidth="xs">
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