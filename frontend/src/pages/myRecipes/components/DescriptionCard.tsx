import { Card, CardContent, CardHeader, IconButton, Typography } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save'
import CancelIcon from '@mui/icons-material/Cancel';
import { useEffect, useState } from "react";

export interface DescriptionCardProps {
    name: string,
    author: string,
    description: string,
    instructions: string
}

export default function DescriptionCard({name, author, description, instructions}: DescriptionCardProps) {
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        console.log(editMode);
    }, [editMode]);

    const handleEditModeClick = () => {
        setEditMode(!editMode);
    };

    const handleSaveClick = () => {
        //save recipe here
        setEditMode(!editMode);
    }

    let icon;
    if(!editMode){
        icon = <IconButton aria-label="edit" onClick={handleEditModeClick}>
                <EditIcon />
            </IconButton>
    } else {
        icon = <><IconButton aria-label="save" onClick={handleSaveClick}>
                    <SaveIcon />
                </IconButton>
                    <IconButton aria-label="cancel" onClick={handleEditModeClick}>
                    <CancelIcon />
                </IconButton>
            </>;
    }

    return (
        <Card>
            <CardHeader
                title={name}
                subheader={`Author: ${author}`}
                action={icon}
            />
            <CardContent>
                <Typography>Description: </Typography>
                <Typography>{description}</Typography>
            </CardContent>
            <CardContent>
                <Typography>Instructions: </Typography>
                <Typography>{instructions}</Typography>
            </CardContent>
        </Card>
    )

}