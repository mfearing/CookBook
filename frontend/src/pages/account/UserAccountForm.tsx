import { Box, CardContent, CardHeader, FormControl, IconButton, MenuItem, TextField, Typography } from "@mui/material";
import UserDetails from "../../types/login/userDetails";
import { useState } from "react";
import SaveIcon  from "@mui/icons-material/Save";
import CancelIcon  from "@mui/icons-material/Cancel";
import { UnitType } from "../../types/enums/unitType";

export interface UserDetailsProps {
    userLogin: UserDetails
    handleSubmit: (newDetails: UserDetails) => void,
    handleCancel: () => void
}

export default function UserAccountForm({userLogin, handleSubmit, handleCancel}: UserDetailsProps){
    const [fName, setfName] = useState(userLogin.firstName);
    const [lName, setlName] = useState(userLogin.lastName);
    const [unitType, setUnitType] = useState(userLogin.preferences.unitType);

    const handleSubmitClick = (event: React.FormEvent) => {
        event.preventDefault();
        const newUserDetails: UserDetails = {
            ...userLogin,
            firstName: fName,
            lastName: lName,
            preferences: {
                unitType
            }
        };
        
        handleSubmit(newUserDetails);
    };

    const icon = <>
        <IconButton aria-label="save" type="submit">
            <SaveIcon />
        </IconButton>
            <IconButton aria-label="cancel" onClick={handleCancel}>
            <CancelIcon />
        </IconButton>
    </>;

    return (
        <CardContent>
            <Box
                component="form"
                onSubmit={handleSubmitClick}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    width: '100%',
                    mt: 2,
                }}
            >
                <CardHeader
                    title={'Account for: ' + userLogin.login}
                    action={icon}
                />
                <FormControl fullWidth>
                        <CardContent>
                            <TextField id="firstName" sx={{minWidth: 300}}  label="First Name" value={fName} onChange={(event) => setfName(event.target.value)} />
                        </CardContent>
                        <CardContent>
                            <TextField id="lastName" sx={{minWidth: 300}} label="Last Name" value={lName} onChange={(event) => setlName(event.target.value)} />
                        </CardContent>
                        <CardContent>
                            <Typography variant='h5' sx={{mb:2}}>User Preferences: </Typography>
                            <TextField
                                label="Unit Type"
                                select
                                value={unitType}
                                onChange={(event) => setUnitType(event.target.value as UnitType)}
                                sx={{minWidth: 300}}
                            >
                                <MenuItem value={UnitType.standard}>Standard</MenuItem>
                                <MenuItem value={UnitType.metric}>Metric</MenuItem>
                            </TextField>
                        </CardContent>
                </FormControl>
            </Box>
        </CardContent>
    )
}