import { Avatar, Card, CardContent, CardHeader, Typography } from "@mui/material";
import { red } from "@mui/material/colors";

export interface DescriptionCardProps {
    name: string,
    author: string,
    description: string
}

export default function DescriptionCard({name, author, description}: DescriptionCardProps) {

    return (
        <Card>
            <CardHeader
                avatar={
                    <Avatar sx={{bgColor: red}} aria-label="recipe">
                        
                    </Avatar>
                }
                title={name}
                subheader={`Author: ${author}`}
            />
            <CardContent>
                <Typography>{description}</Typography>
            </CardContent>
        </Card>
    )

}