import { Box, Button, FormControl, TextField, Typography } from "@mui/material";
import UserDetails from "../../types/login/userDetails";
import { useState } from "react";

export interface UserDetailsProps {
    userLogin: UserDetails
    handleSubmit: (newDetails: UserDetails) => void
}

export default function UserAccountForm({userLogin, handleSubmit}: UserDetailsProps){
    const [fName, setfName] = useState(userLogin.firstName);
    const [lName, setlName] = useState(userLogin.lastName);

    const handleSubmitClick = (event: React.FormEvent) => {
        event.preventDefault();
        const newUserDetails: UserDetails = {
            ...userLogin,
            firstName: fName,
            lastName: lName
        };
        
        handleSubmit(newUserDetails);
    }

    return (
        <Box component="form" onSubmit={handleSubmitClick}>
            <Typography variant="h4">{userLogin.login} Details</Typography>
            <FormControl fullWidth>
                <TextField id="firstName" label="First Name" value={fName} onChange={(event) => setfName(event.target.value)} />
                <TextField id="lastName" label="Last Name" value={lName} onChange={(event) => setlName(event.target.value)} />
                    {/* PreferencesComponent here */}
            </FormControl>
            <Button type="submit" variant="contained" color="primary">
                Save
            </Button>
        </Box>
    )
}