import { Card, CardActionArea, CardContent, CardHeader, Typography } from "@mui/material";

export interface CookBookRecipeCardProps {
    id: number,
    author: string,
    name: string,
    description: string,

}


export default function CookBookRecipeCard({id, author, name, description}: CookBookRecipeCardProps) {

    return (
        <Card variant="outlined" style={{height: '10vw'}}>
            <CardActionArea>
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
        </Card>
    )
}