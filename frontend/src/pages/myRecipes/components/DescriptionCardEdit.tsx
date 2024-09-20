import { Box, FormControl, TextField } from "@mui/material";
import { ReactNode, useState } from "react";

interface DescriptionCardEditProps{
    name: string,
    description: string,
    instructions: string,
    handleSubmitRecipe: (name: string, description: string, instructions: string) => void,
    children?: ReactNode
}

export default function DescriptionCardEdit({name, description, instructions, handleSubmitRecipe, children}: DescriptionCardEditProps) {
    const [nameField, setNameField] = useState(name);
    const [descriptionField, setDescriptionField] = useState(description);
    const [instructionsField, setInstructionsField] = useState(instructions);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        handleSubmitRecipe(nameField, descriptionField, instructionsField);
    }

    return (
        <>
            <Box 
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '95%' },
                    m: 1
                }}
                noValidate
                autoComplete="off"
            >
                {children ? children : <></>}
                <FormControl fullWidth>
                    <TextField id="name" label="Name" value={nameField} onChange={(event) => setNameField(event.target.value)} />
                    <TextField multiline id="description" label="Description" rows={4} value={descriptionField} onChange={(event) => setDescriptionField(event.target.value)} />        
                    <TextField multiline id="instructions" label="Instructions"  rows={4} value={instructionsField} onChange={(event) => setInstructionsField(event.target.value)} />
                </FormControl>
            </Box>
        </>
    );
}