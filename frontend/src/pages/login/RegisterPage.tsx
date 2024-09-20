import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Container, TextField, Button, CssBaseline } from "@mui/material";
import useAuthContext from "../../hooks/use-auth-context";
import { AuthContextType } from "../../context/auth";
import { UnitType } from "../../types/enums/unitType";

export default function RegisterPage(){
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  //need useState for all fields, here.

    const {registerNewLogin} = useAuthContext() as AuthContextType;

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if(login !== '' && password !== '' && firstName !== '' && lastName !== ''){
          registerNewLogin({
              firstName: firstName,
              lastName: lastName,
              login: login,
              password: password,
              preferences: {
                unitType: UnitType.standard
              }
          });
          navigate('/');
        } else {
          window.alert("One or more fields is missing a value.");
        }
    };

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', }} >
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField margin="normal"  required fullWidth id="firstName" onChange={(e) => setFirstName(e.target.value)} label="First Name" name="firstName" autoComplete="First Name" autoFocus />
            <TextField margin="normal"  required fullWidth id="lastName" onChange={(e) => setLastName(e.target.value)} label="Last Name" name="lastName" autoComplete="Last Name" />
            <TextField margin="normal"  required fullWidth id="login" onChange={(e) => setLogin(e.target.value)} label="Login"name="login" autoComplete="login" />
            <TextField margin="normal" required fullWidth name="password" onChange={(e) => setPassword(e.target.value)} label="Password" type="password" id="password" autoComplete="current-password" />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} >
              Register Me!
            </Button>
          </Box>
        </Box>
      </Container>
    );
}