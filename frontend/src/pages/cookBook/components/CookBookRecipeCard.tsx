import { Card, CardContent, CardHeader, IconButton, Tooltip, Typography } from "@mui/material";
import useAuthContext from "../../../hooks/use-auth-context";
import { Article, Delete } from "@mui/icons-material";
import { AuthContextType } from "../../../context/auth";

export interface CookBookRecipeCardProps {
    id: number,
    author: string,
    name: string,
    description: string,
    handleClick: (id: number) => void
    handleDelete: (id: number) => void
}


export default function CookBookRecipeCard({id, author, name, description, handleClick, handleDelete}: CookBookRecipeCardProps) {
    const {userLogin} = useAuthContext() as AuthContextType;
    
    const isAdmin = userLogin?.role === 'ADMIN';

    const prButtons = (    
        <>
            <Tooltip title="View Recipe">
                <IconButton onClick={() => handleClick(id)} color='info' >
                    <Article />
                </IconButton>
            </Tooltip>
            {isAdmin &&
                <Tooltip title="Delete Recipe">
                    <IconButton onClick={() => handleDelete(id)} color='warning' disabled={!isAdmin} >
                        <Delete />
                    </IconButton>
                </Tooltip>
            }
        </>
    );

    return (
        <Card variant="outlined" style={{height: '11vw'}}>
            <CardHeader
                    id={id}
                    title={name}
                    subheader={`Author: ${author}`}
                    action = {prButtons}
                />
            <CardContent>
                <Typography>Description: </Typography>
                <Typography>{description}</Typography>
            </CardContent>
        </Card>
    )
}