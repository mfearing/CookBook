import useAuthContext from "../../hooks/use-auth-context"
import type { AuthContextType } from "../../context/auth";
import UserDetails from "../../types/login/userDetails";
import UserAccountForm from "./UserAccountForm";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, IconButton, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

export default function UserAccountPage(){
    const {userLogin, patchUserLogin} = useAuthContext() as AuthContextType;
    const [isEdit, setIsEdit] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if(!userLogin){
            navigate('/login');
        }
    },[navigate, userLogin]);

    const handleSubmit = (newDetails: UserDetails) => {
        console.log(newDetails);
        patchUserLogin(newDetails);
        setIsEdit(false);
    };

    const preferences = <>
        <Typography variant="h6">Unit Type: {userLogin?.preferences.unitType}</Typography>
    </>;

    let content;
    let icon;
    if(isEdit){
        content = <>
            {userLogin ? <UserAccountForm userLogin={userLogin} handleSubmit={handleSubmit} handleCancel={() => setIsEdit(false)} /> : <></>}
        </>;
    } else {
        icon = <IconButton aria-label="edit" onClick={() => {setIsEdit(true)}}>
                <EditIcon />
            </IconButton>;
        content = <>
            <CardHeader
                title={"User Account: " + userLogin?.login}
                action={icon}
            />
            <CardContent>
                <Typography variant="h6">First Name: {userLogin?.firstName}</Typography>
                <Typography variant="h6">Last Name: {userLogin?.lastName}</Typography>
            </CardContent>
            <CardContent>
            <Typography variant="h6">Preferences </Typography>
                {preferences}
            </CardContent>
        </>;
    }

    return (
        <Card sx={{mt:2}}>
            {content}
        </Card>
    )
}