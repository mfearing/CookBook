import { Card, CardActionArea, CardActions, CardContent, CardHeader, IconButton, Tooltip, Typography } from "@mui/material";
import useAuthContext from "../../../hooks/use-auth-context";
import { Delete } from "@mui/icons-material";
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

    const deleteButton = (    
        <CardActions>
            <Tooltip title="Delete Recipe">
                <IconButton onClick={() => handleDelete(id)} color='warning' disabled={!isAdmin} >
                    <Delete />
                </IconButton>
            </Tooltip>
        </CardActions>
    );

    return (
        <Card variant="outlined" style={{height: '11vw'}}>
            <CardActionArea onClick={() => handleClick(id)}>
                <CardHeader
                    id={id}
                    title={name}
                    subheader={`Author: ${author}`}
                />
                <CardContent>
                    <Typography>Description: </Typography>
                    <Typography>{description}</Typography>
                </CardContent>
            </CardActionArea>
            {isAdmin && deleteButton}
        </Card>
    )
}