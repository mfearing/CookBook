import { Box, Button, FormControl, TextField } from "@mui/material";
import { useState } from "react";

export interface AddRowFormProps {
    handleSubmit: (item: string) => void,
    label: string
}

export default function AddRowForm({handleSubmit, label}: AddRowFormProps){
    const [newItem, setNewItem] = useState('');

    const handleCreateSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        handleSubmit(newItem);
        setNewItem('');
    }

    return (
        <Box
            component="form"
            onSubmit={handleCreateSubmit}
            justifyContent={"left"}
            sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: 2,
                width: '100%',
                maxWidth: 400,
                mt: 2,
            }}
        >
            <FormControl fullWidth>
                <TextField
                    label={`New ${label}`}
                    value={newItem}
                    onChange={(event) => {setNewItem(event.target.value)}}
                    variant="outlined"
                    fullWidth
                    required
                />
            </FormControl>
            <Button type="submit" variant="contained" color="primary">
                Create
            </Button>
        </Box>
    )
}