import { Refresh } from "@mui/icons-material";
import { Box, Button, FormControl, Grid, IconButton, TextField, Tooltip } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useState } from "react";

export interface DataGridRow {
    id: number | undefined;
    [key: string]: string | number | boolean | Date | undefined;
}

export interface DataTableDetails<T extends DataGridRow>{
    rows: T[],
    columns: GridColDef[],
    handleRefresh: () => void,
    handleSubmit: (item: string) => void,
    label: string
}

export default function DataTable<T extends DataGridRow>({rows, columns, handleRefresh, handleSubmit, label}: DataTableDetails<T>){
    const [newItem, setNewItem] = useState('');
    
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewItem(event.target.value);
    }

    const handleCreateSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        handleSubmit(newItem);
        setNewItem('');
    }

    return (
        <div style={{height:400, width: '100%'}}>
            <Grid container justifyContent="flex-end">
                <Tooltip title="Refresh">
                    <IconButton onClick={handleRefresh} aria-label="refresh" size="small" >
                        <Refresh />
                    </IconButton>
                </Tooltip>
            </Grid>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {page: 0, pageSize: 10 },
                    },
                }}
                pageSizeOptions={[5, 10, 25]}
            />
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
                        onChange={handleInputChange}
                        variant="outlined"
                        fullWidth
                        required
                    />
                </FormControl>
                <Button type="submit" variant="contained" color="primary">
                    Create
                </Button>
            </Box>

        </div>
    )
}