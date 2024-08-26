import { Card, CardContent, CardHeader, IconButton, Typography } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save'
import CancelIcon from '@mui/icons-material/Cancel';
import { useState } from "react";
import DescriptionCardEdit from "./DescriptionCardEdit";

export interface DescriptionCardProps {
    name: string,
    author: string,
    description: string,
    instructions: string,
    handleRecipePatch: (name: string, description: string, instructions: string) => void
}

export default function DescriptionCard({name, author, description, instructions, handleRecipePatch}: DescriptionCardProps) {
    const [editMode, setEditMode] = useState(false);

    const handleEditModeClick = () => {
        setEditMode(!editMode);
    };

    const handleSaveClick = (name: string, description: string, instructions: string) => {
        handleRecipePatch(name, description, instructions);
        setEditMode(!editMode);
    }

    let icon;
    let contents;
    if(!editMode){
        icon = <IconButton aria-label="edit" onClick={handleEditModeClick}>
                <EditIcon />
            </IconButton>;
        contents = <>
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
            </>;
    } else {
        icon = <>
            <IconButton aria-label="save" type="submit">
                <SaveIcon />
            </IconButton>
                <IconButton aria-label="cancel" onClick={handleEditModeClick}>
                <CancelIcon />
            </IconButton>
        </>;

        contents = <>
            <DescriptionCardEdit name={name} description={description} instructions={instructions} handleSubmitRecipe={handleSaveClick} >
                <CardHeader
                    title={name}
                    action={icon}
                />
            </DescriptionCardEdit>
            
        </>;
    }

    return (
        <Card>
            {contents}
        </Card>
    )

}