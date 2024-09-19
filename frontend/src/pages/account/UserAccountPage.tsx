import useAuthContext from "../../hooks/use-auth-context"
import type { AuthContextType } from "../../context/auth";
import { Box } from "@mui/material";
import UserDetails from "../../types/login/userDetails";
import UserAccountForm from "./UserAccountForm";

export default function UserAccountPage(){
    const {userLogin, patchUserLogin} = useAuthContext() as AuthContextType;

    const handleSubmit = (newDetails: UserDetails) => {
        console.log(newDetails);
        patchUserLogin(newDetails);
    }

    return (
        <div>
        {userLogin ? 
            <Box 
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '95%' },
                    m: 1
                }}
            >
                <UserAccountForm userLogin={userLogin} handleSubmit={handleSubmit} />
            </Box>
            : <></>
        }</div>
    )
}